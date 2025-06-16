import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function MainPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        </div>
    )
}