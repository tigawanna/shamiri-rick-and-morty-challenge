import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { OneLocationRouteComponentQuery } from "./__generated__/OneLocationRouteComponentQuery.graphql";
import dayjs from "dayjs";
import { OneResidentCard } from "@/routes/components/shared/OneResidentCard";
import { OneItemCard } from "@/routes/components/shared/OneItemCard";
import { OneItemHeader } from "@/routes/components/shared/OneItemHeader";

interface OneLocationRouteComponentProps {
id:string
}

export function OneLocationRouteComponent({id}:OneLocationRouteComponentProps){
      const query = useLazyLoadQuery<OneLocationRouteComponentQuery>(
        oneLocationQuery,
        {
          id,
        },
      );
      const location = query?.location
      const characters = location?.residents
      if (!location) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">
              Location with id {id} was not found
            </h1>
          </div>
        );
      }
      const location_date = dayjs(location?.created).format("DD-MM-YYYY");
return (
  <div className="w-full h-full flex flex-col items-center justify-between gap-4">
    {/* <div className="flex flex-col p-3  gap-2  w-full sticky top-0 bg-base-200 rounded-lg">
      <span className="flex gap-2 underline">
        <h1 className="text-xl font-bold">{location.id}.</h1>
        <h1 className="text-xl ">{location.name}</h1>
        {location_date && <h1 className="text-xl">{location_date}</h1>}
      </span>
      <h2 className="text-2xl font-bold">Characters</h2>
    </div> */}
    <OneItemHeader
    date={location_date}
    id={location.id}
    name={location.name}
    list_title={"Characters"}
    
    />

    <div className="w-full h-full flex flex-col items-center justify-beteween">
      {characters && (
        <ul className="flex flex-wrap justify-center w-full gap-2">
          {characters.map((chr) => {
            if (!chr) return null;
            const key = `${chr?.id}${chr?.name}`;
            return (
              <OneResidentCard
                href={`/characters/${chr.id}`}
                key={key}
                id={chr.id}
                name={chr.name}
                img={chr.image}
                status={chr.status}
              />
            );
          })}
        </ul>
      )}
    O</div>
  </div>
);
}

export const oneLocationQuery = graphql`
  query OneLocationRouteComponentQuery($id: ID!) {
    # start of query
    location(id: $id) {
      name
      id
      created
      residents {
        id
        image
        name
        status
      }
    }
    # end of locations query

    #  end of query
  }
`;
