interface OneItemHeaderProps {
id?: string|null;
name?: string|null;
date?:string
title:React.ReactNode
}

export function OneItemHeader({id,name,date,title}:OneItemHeaderProps){
return (
  <div className="flex flex-col p-3  gap-2   w-full sticky top-0 bg-base-200 rounded-lg">
    <span className="flex gap-2 text-secondary">
      <h1 className="text-xl font-bold">{id}.</h1>
      <h1 className="text-xl ">{name}</h1>
      {date && <h1 className="text-xl">{date}</h1>}
    </span>
    <div className="">{title}</div>
  </div>
);
}
