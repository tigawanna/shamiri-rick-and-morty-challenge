import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Input } from "@/components/shadcn/ui/input";
import { Loader, Search } from "lucide-react";
import { Link, useLocation } from "rakkasjs";
import { navigate } from "rakkasjs";
import { SearchType } from "./types";
interface SearchInputSectionProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setDebouncedValue: React.Dispatch<React.SetStateAction<string>>;
  searchType?: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType|undefined>>;
}

export function SearchInputSection({
  isDebouncing,
  debouncedValue,
  startTransition,
  searchType,
  setDebouncedValue,
  setSearchType,
}: SearchInputSectionProps) {
    const {current}= useLocation()
    const navigate_to = new URL(current) 
    navigate_to.pathname = "/"


  return (
    <div
      className="w-full flex items-center justify-center sticky top-0"
      onKeyDownCapture={(e) => {
        //  naviaget on hit enter key
        if (e.key === "Enter"  && debouncedValue.length > 0) {
          navigate(navigate_to.toString());
        }
      }}
    >
      <div className="w-full flex items-center justify-center gap-2">
        <div className="w-full relative">
          <Input
            placeholder="Search"
            className="w-full"
            defaultValue={debouncedValue}
            onChange={(e) => {
              startTransition(() => {
                setDebouncedValue((prev) => {
                  return e.target.value;
                });
              });
            }}
  
          />
          {isDebouncing && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
        <Select
          value={searchType}
          onValueChange={(v: SearchType) => {
            startTransition(() => {
              setSearchType(v);
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="LOCATION">Location name</SelectItem>
              <SelectItem value="CHARACTER">Character name</SelectItem>
              <SelectItem value="EPISODE">Episode name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {current.pathname !== "/" && debouncedValue.length > 0 && (
          <div className="min-w-[40px]">
            <Link href={navigate_to.toString()}>
              <Search className="w-5 h-5 hover:text-secondary" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
