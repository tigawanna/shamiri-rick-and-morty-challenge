# Shamiri Rick & Morty API Challenge

### initial setup for the challenge

Tech stack will be

- [RakkasJS](https://rakkasjs.org/) : React + Vite SSR framework
  - My laptop isn't that powerful and Nextjs can get intense
  - Rakkasjs (server-only/client-only/common) middleware and hooks that let me setup server only and client only parts of the application much easier
    for example initializing React-Relay ,doing the fetching server side during SSR and populating the client cache on the client side

```tsx
    // entry-hattip (server side)
    function createRelayEnvironment(ctx: RequestContext) {
   return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token:undefined,
      }),
    ),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}

  createPageHooks(requestContext) {
    const serverRelayEnvironment = createRelayEnvironment(requestContext);
    return {
      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        const relay_data = serverRelayEnvironment
          ?.getStore()
          ?.getSource()
          ?.toJSON();
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     <script>__RELAY_DATA__=${JSON.stringify(relay_data)}</script>

  `;
      },

      wrapApp(app) {
        return (
          <RelayEnvironmentProvider environment={serverRelayEnvironment}>
            {app}
          </RelayEnvironmentProvider>
        );
      },

      }

      }
```

```tsx
// entry-client (client side)
const relay_data_from_server = (window as any)?.__RELAY_DATA__;

function createRelayEnvironment() {
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token: undefined,
      }),
    ),
    store: new Store(RecordSource.create(relay_data_from_server)),
    isServer: false,
  });
}
export const clientRelayEnvironment = createRelayEnvironment();

startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },

    wrapApp(app) {
      return (
        <RelayEnvironmentProvider environment={clientRelayEnvironment}>
          {app}
        </RelayEnvironmentProvider>
      );
    },
  },
});
```

- RakkasJs uses [Hattip](https://github.com/hattipjs/hattip) for it's server side stuff , which allows it to be hosted everywhere [Hattip](https://github.com/hattipjs/hattip) can , they have adapters for
  - Nodejs
  - Deno
  - bun
  - AWS lambda
  - Vercel
  - Netlify


- I'll be suing the `GraphQL` endpoint for the API , because of it's scalable and type safe nature with solid contracts between the backend and frontend and it's ability to avoid waterfalls using clients like [React-Relay](https://relay.dev/) 
- [React-Relay](https://relay.dev/) allows us to break the query down into a fragment per data fetching component and uses it's compiler to auto generates the types and create one optimized query that avoids client-server round trips in cases of nested components doing their independent data fetching .
I also picked this because I've been brushing up on it and having lots of fun with it [small writeup](https://dev.to/tigawanna/react-relay-2-years-later-its-still-awesome-jdg) 

- Tailwind for styling + shadcn for components 
- Pocketbase: The challenge seems to require some trivial database activity and going full postgres + drizzle feels overkill
  

> **Note**
I am abandoning this approach due to the GraphQL server not being relay friendly , switching to the REST API instead



