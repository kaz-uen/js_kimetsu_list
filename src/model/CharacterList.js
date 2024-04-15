import fetchCharacterData from "../api/CharacterData.js";

export class CharacterList {
    #characters;

    constructor(characters = []) {
        this.#characters = characters;
    }

    async getCharacterData() {
        this.#characters = await Promise.resolve(fetchCharacterData());
        return this.#characters;
    }
}
