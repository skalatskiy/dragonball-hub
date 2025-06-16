import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllCharacters } from "@/services/characters.service";
import type { Character } from "@/schemas/character.interface";


export default function MainPage() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
    setLoading(true);

    getAllCharacters()
        .then(setCharacters)
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }, [])

    if (loading) {
        return 'Loading...'
    }

    if (error) {
        return `There have been an error:  ${error}`
    }

    return (
        <div>
            <div>
                <Button variant="outline" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Search /> Search
                </Button>
            </div>

            {isSearchOpen && (
                <div>
                    Search form
                </div>
            )}

            <div>
                {characters?.map((character) => (
                    <div>
                        {character.name}
                    </div>
                ))}
            </div>
        </div>
    )
}