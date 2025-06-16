import type { Character } from "@/schemas/character.interface";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "../ui/badge";

type CharacterCardProps = {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const  [seeMore, setSeeMore] = useState<boolean>(false);
    const toggleSeeMore = () => { setSeeMore(!seeMore) };

    return (
         <Card className="flex flex-col p-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    {!seeMore && (
                        <div className="p-2">
                            <img className="h-12 aspect-square object-contain" src={character.image} alt={`@${character.name}`} />
                        </div>
                    )}
                    <div className="flex flex-col p-4 gap-2">
                        <h1 className="flex font-bold">
                            {character.name}
                        </h1>
                        <div className="flex flex-row font-light">
                            { character.ki } - {character.maxKi}
                        </div>
                        <div className="flex flex-row gap-2">
                            <Badge variant="default">
                                { character.race }
                            </Badge>
                            <Badge variant="secondary">
                                { character.gender }
                            </Badge>
                            <Badge variant="outline">
                                { character.affiliation }
                            </Badge>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="ghost" onClick={toggleSeeMore} className="font-thin">
                        {seeMore ? 'See less' : 'See more'} 
                        {seeMore ? <ChevronUp /> : <ChevronDown />} 
                    </Button>
                </div>
            </div>
            {seeMore && (
                <div className="flex flex-row p-4 items-center">
                    <div className="flex h-64 justify-center aspect-square">
                        <img className="h-full object-contain" src={character.image} alt={`@${character.name}`} />
                    </div>
                    <div className="text-left pl-8">
                        {character.description}
                    </div>
                </div>
            )}
         </Card>
    );
}