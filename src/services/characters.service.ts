import type { CharactersResponse } from "@/schemas/characters-response.interface";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";
import type { Character } from "@/schemas/character.interface";
import { dehumanize } from "@/utils/humanize.util";
import api from "./api.service";

const CHARACTERS_URL = '/characters';
const ITEMS_PER_PAGE = 40;

export async function getAllCharacters(): Promise<Character[]> {
    const params = {
        limit: ITEMS_PER_PAGE
    };

    const response = await api.get<CharactersResponse>(CHARACTERS_URL, { params });

    return response.data?.items;
}

export async function searchCharacters(searchQuery: CharacterSearchQuery): Promise<Character[]> {
     const params = {
        limit: ITEMS_PER_PAGE,
        name: searchQuery.name
    };

    const response = await api.get<CharactersResponse | Character[]>(CHARACTERS_URL, { params });

    // Required because on a filtered search it returns an array of characters directly 
    const characters: Character[] = Array.isArray(response.data) ? response.data : response.data.items;

    if (searchQuery.minBaseKi || searchQuery.maxBaseKi) {
        return filterByKi(searchQuery, characters);
    }

    return characters;
}

function filterByKi(searchQuery: CharacterSearchQuery, characters: Character[]): Character[] {
    const filteredCharacters = characters.filter((character) => {
        const kiNumber = dehumanize(character.ki);
        const minKi = searchQuery.minBaseKi || 0;

        if (searchQuery.maxBaseKi) {
            return kiNumber >= minKi && kiNumber <= searchQuery.maxBaseKi;
        }

        return kiNumber >= minKi;
    });

    return filteredCharacters;
}