interface GridSuspenseFallbackProps {

}

export function GridSuspenseFallback({}:GridSuspenseFallbackProps){
return (
    <div className="w-full h-full flex flex-col items-center  gap-4">
      <div className="flex w-full gap-5  rounded-xl *:p-4 bg-secondary/5 p-3">
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg"></div>
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg "></div>
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg "></div>
      </div>
      <ul className="flex flex-wrap gap-4 justify-center w-full p-3">
        {Array.from({ length:16 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-2 rounded-xl bg-base-300
            gap-2 px-3 py-2 h-44 w-[80%] sm:w-[40%] md:w-[30%]  min-w-[20%] flex-grow skeleton"
            ></div>
          );
        })}
      </ul>
    </div>
);
}

