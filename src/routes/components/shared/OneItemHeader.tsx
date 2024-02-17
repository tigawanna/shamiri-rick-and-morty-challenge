interface OneItemHeaderProps {
id?: string|null;
name?: string|null;
date?:string
list_title?:React.ReactNode
}

export function OneItemHeader({id,name,date,list_title}:OneItemHeaderProps){
return (
  <div className="flex flex-col p-3  gap-2   w-full sticky top-0 bg-base-200 rounded-lg">
    <div className="flex items-center gap-2 ">
      <h1 className="font-bold text-6xl text-secondary">{id}.</h1>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl ">{name}</h1>
        {date && <h1 className="text-xs">Created {date}</h1>}
      </div>
    </div>
    <div className="">{list_title}</div>
  </div>
);
}
