import type { Character } from "@/schemas/character.interface";
import api from "./api.service";
import type { CharactersResponse } from "@/schemas/characters-response.interface";
import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";

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

    // TODO: As api does not have the option to filter by Ki, should be done manually here

    return characters;
}