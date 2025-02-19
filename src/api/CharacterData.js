import { BASE_PATH } from "../constants/index.js";

export default async function fetchCharacterData() {
    const apiUrl = `${BASE_PATH}/kimetsu_api/api/all.json`;
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    } else {
        return response.json();
    }
}
