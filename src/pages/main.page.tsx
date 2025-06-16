import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    getAllCharacters as apiGetAllCharacters,
    searchCharacters as apiSearchCharacters
} from "@/services/characters.service";
import type { Character } from "@/schemas/character.interface";
import CharacterSearch from "@/components/character-search/character-search.component";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";


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

            <div>
                {characters?.map((character) => (
                    <div key={character.id}>
                        {character.name}
                    </div>
                ))}
            </div>
        </div>
    )
}