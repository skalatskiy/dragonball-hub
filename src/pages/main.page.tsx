import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    getAllCharacters as apiGetAllCharacters,
    searchCharacters as apiSearchCharacters
} from "@/services/characters.service";
import CharacterSearch from "@/components/character-search/character-search.component";
import CharacterCard from "@/components/character-card/characted-card.component";
import SearchSummary from "@/components/search-summary/search-summary.component";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";
import type { Character } from "@/schemas/character.interface";


export default function MainPage() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<CharacterSearchQuery | undefined>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
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
                    <SearchSummary 
                        searchData={searchData}
                        onReset={() => setSearchData(undefined) }
                    />
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