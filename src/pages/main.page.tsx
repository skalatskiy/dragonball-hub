import { useEffect, useState } from "react";
import { BrushCleaning, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    getAllCharacters as apiGetAllCharacters,
    searchCharacters as apiSearchCharacters
} from "@/services/characters.service";
import type { Character } from "@/schemas/character.interface";
import CharacterSearch from "@/components/character-search/character-search.component";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";
import CharacterCard from "@/components/character-card/characted-card.component";


export default function MainPage() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<CharacterSearchQuery | undefined>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        console.log('useEffect - searchData: ', searchData);
        setLoading(true);

        if (searchData) {
            searchCharacters(searchData);
        } else {
            getAllCharacters();
        }
        
    }, [searchData]);

    const searchCharacters = async (searchData: CharacterSearchQuery) => {
        apiSearchCharacters(searchData)
            .then(setCharacters)
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }  

    const getAllCharacters = async () => {
        apiGetAllCharacters()
            .then(setCharacters)
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }      

    const onSearch = (searchData?: CharacterSearchQuery) => {
        setSearchData(searchData);
        setIsSearchOpen(false);
    }

    if (loading) {
        return 'Loading...'
    }

    if (error) {
        return `There has been an error:  ${error}`
    }

    return (
        <div>
            <div>
                <Button variant="outline" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Search /> Search
                </Button>
            </div>

            {isSearchOpen && (
                <CharacterSearch 
                    initialData={searchData}
                    onSearch={onSearch}
                    onCancel={() => setIsSearchOpen(false)}
                />
            )}

            <div className="flex-col p-4 gap-4">
                {searchData && (
                    <div className="flex pb-4 items-center justify-between">
                        <div className="flex-col text-justify">
                            Showing results for search: 
                            {searchData.name && <div className="font-thin">Name: {searchData.name}</div>}
                            {searchData.minBaseKi && <div className="font-thin">Min Base Ki: {searchData.minBaseKi}</div>}
                            {searchData.maxBaseKi && <div className="font-thin">Max Base Ki: {searchData.maxBaseKi}</div>}
                        </div>
                        <div>
                            <Button variant="ghost" onClick={() => setSearchData(undefined)}>
                                <BrushCleaning />
                                Reset
                            </Button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {characters?.map((character) => (
                        <CharacterCard 
                            key={character.id}
                            character={character}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}