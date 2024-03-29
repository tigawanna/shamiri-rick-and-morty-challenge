## Challenges

### 1. The GraphQL API
The GraphQL API was the most efficient way to accomplish the task as it minimizes the number of requests we have to make , `client-server` waterfalls waterfalls are can be one of the biggest performance issues in your average site , Dan Abramov had some claims on how react server components avoid this and a lively debate ensued on the topic , Ryan Carniato (SolidJS creator) dedicated his 
 [Friday stream](https://www.youtube.com/watch?v=hiYQC4XaUu4) to discuss the topic.

 One thing that kept coming up was that the GraphQL with Relay was peak frontend data fetching with it's ability to delegate fragments to components and compose them into a single optimized query with it's compiler.

 The issue was that the Rick and Morty GraphQL isn't relay friendly and causes relay to complain a lot
The main issues with it were
    
- lack of fragments : everything is just a scalar making us clever caching react relay does
- Lack of nested pagination :
  
```graphql
    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        created
        air_date
        characters {
          location {
            id
            name
            type
          }
        }
      }
    }

```

Because of the lack of fragments and relay friendly architecture retuning `edges` for paginatable data and `nodes` for non paginatable data it make it hard to deal with queries that return nested results for example 

```graphql
    locations(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        type
 
      }
    }
    #  end of locations query

    # start of characters query
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        location {
          id
          name
          type

        }
      }
    }
    # end of characters query

    # start of episodes query

    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        created
        air_date
        characters {
          location {
            id
            name
            type
          }
        }
      }
    }
``` 
This is the query that I used to achieve this objective
> Retrieve a list of locations (name and type), along with the residents of that location and their status.
Implement the ability to search or filter location results by location name, character name or episode name.
Display the data in a manner that allows you to view the location, its residents and see an image of the resident with a representation of their name & status.

it works but we'll have to unwrap 3 layers of nested data in the last one , 2 for the prior and the nested data is possibly unlimited since only the top level results are returned in pages form (am assuming) this wouldn't be staring forward to implement without returning cursors  for the next page .

so when consuming it in the frontend we need to use virtual lists with [Virtuoso](https://virtuoso.dev/) because we're not sure how big a response we'll get , the biggest I got was ( 500 episodes , which isn't that big but we have no guarantees on that , it could be bigger)  

```tsx
const episode_locations = React.useMemo(() => {
    return (
      episodes?.results
        ?.flatMap((e) => e?.characters)
        .flatMap((c) => c?.location) ?? []
    );
  }, [episodes]);

  return (
        <VirtuosoGrid
          style={{ height: "80vh", width: "100%" }}
          totalCount={episode_locations?.length}
          data={episode_locations}
          // @ts-expect-error
          components={gridComponents}
          itemContent={(index, one_episode) => {
            if (!one_episode) return null;
            const key = `${one_episode?.id}${one_episode?.name}`;
            return (
              <ItemWrapper>
                <OneItemCard
                  href={`/locations/${one_episode?.id}`}
                  key={key}
                  id={one_episode?.id}
                  name={one_episode?.name}
                  type={one_episode?.type}
                />
              </ItemWrapper>
            );
          }}
        />
  )
```

### 2 The phrasing of the requirement
 
 > Display the data in a manner that allows you to view the location, its residents and see an image of the resident with a representation of their name & status.
 
 This part had me trying to fit the residents as a nested list under the locations list.

I spent the first day of trying out approaches to see how many perfomance and UX challenges this would present and am glad that after reaching out to the team they determined that rendering the location results as links to the characters would be an acceptable solution and I went with  that as I did not have to worry about the virtualized nested data with images  

### 3. React relay and suspense
Relay is built around suspense data fetching , it doesn't have an `isLoading` or `isError` field from it's data fetching hooks `uselazyLoadQuery` and `useLFragment` so they need to be wrapped with a `<Suspense/>` component.

Having a search bar inside a suspense boundary would cause a lot of flickering while the data is loading.

To remedy this I tried hoisting out the search component and state into the parent component and passing down the current keyword into the data fetching component  

```tsx
export function SearchComponentParet() {
  const [keyword, setKeyword] = React.useState("");
  return (
      <div className="w-full">
      <input onChange={(e) => setKeyword(e.target.value)} value={keyword}/>
      <Suspense>
        <DataFetchingComponent keyword={keyword}/>
      </Suspense>
      </div>
  )

}
```

Even though the suspense boundary isn't covering our search bar ,the suspense boundary will still keep showing after every value change (even with debouncing) ,
Lucky for us React 18 came with some more stuff along `Suspense` that help in concurrent rendering in particular I used the `useTransition` hook that allows us to mark the input changes as more urgent hence forcing all other renders to the background , including the suspending component


```tsx
export function SearchComponentParet() {
  const [keyword, setKeyword] = React.useState("");
  const [isPending, startTransition] = useTransition();
  return (
      <div className="w-full">
      <input onChange={(e) => startTransition(setKeyword(e.target.value))} value={keyword}/>
      <Suspense>
        <DataFetchingComponent keyword={keyword}/>
      </Suspense>
      </div>
  )

}
```

This way , we'll maintain the view of the old results as the new ones are fetched in between typing giving us better UX overall

