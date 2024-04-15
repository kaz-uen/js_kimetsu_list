import fetchCharacterData from "../api/CharacterData.js";

export class CategoryList {
    #categories;

    constructor(categories = []) {
        this.#categories = categories;
    }

    async getCategory() {
        const charactersData = await Promise.resolve(fetchCharacterData());
        charactersData.forEach(character => {
            if(!this.#categories.includes(character.category)) this.#categories.push(character.category);
        });
        return this.#categories;
    }
}
