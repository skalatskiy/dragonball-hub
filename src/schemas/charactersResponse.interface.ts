import type { Character } from "./character.interface"

export interface CharactersResponse {
    items: Character[],
    meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    }
}