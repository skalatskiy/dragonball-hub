import type { Character } from "@/schemas/character.interface";
import api from "./api.service";
import type { CharactersResponse } from "@/schemas/charactersResponse.interface";

const CHARACTERS_URL = '/characters';

export async function getAllCharacters(): Promise<Character[]> {
    const params = {
        limit: 40
    };

    const response = await api.get<CharactersResponse>(CHARACTERS_URL, { params });

    console.log('getAllCharacters - response: ', response);

    return response.data?.items;
}