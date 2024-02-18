import { forwardRef } from "react";

interface VirtuosoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

  // Ensure that this stays out of the component,
  // Otherwise the grid will remount with each render due to new component instances.
export const gridComponents = {
  List: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ style, children, ...props }, ref) => (
      <div
        ref={ref}
        {...props}
        style={{
          display: "flex",
          flexWrap: "wrap",
          ...style,
        }}
      >
        {children}
      </div>
    ),
  ),
  Item: ({ children, ...props }: VirtuosoItemProps) => (
    <div
      {...props}
      className="flex w-[90%] sm:w-[44%] md:w-[30%] lg:w-[26%] flex-grow p-1"
    >
      {children}
    </div>
  ),
};



export function ItemWrapper({ children, ...props }: VirtuosoItemProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flex: 1,

        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}


