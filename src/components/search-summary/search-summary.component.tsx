import { BrushCleaning } from "lucide-react";
import { Button } from "../ui/button";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface"

type SearchSummaryProps = {
    searchData?: CharacterSearchQuery
    onReset: () => void
}

export default function SearchSummary({ searchData, onReset }: SearchSummaryProps) {

    return (
        <div className="flex pb-4 items-center justify-between">
            <div className="flex-col text-justify">
                Showing results for search: 
                {searchData?.name && <div className="font-thin">Name: {searchData.name}</div>}
                {searchData?.minBaseKi && <div className="font-thin">Min Base Ki: {searchData.minBaseKi}</div>}
                {searchData?.maxBaseKi && <div className="font-thin">Max Base Ki: {searchData.maxBaseKi}</div>}
            </div>
            <div>
                <Button variant="ghost" onClick={() => onReset()}>
                    <BrushCleaning />
                    Reset
                </Button>
            </div>
        </div>
    );
}