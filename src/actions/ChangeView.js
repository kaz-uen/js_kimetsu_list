import { CharacterList } from "../model/CharacterList.js";
import { CharacterView } from "../view/CharacterView.js";
import { CategoryView } from "../view/CategoryView.js";
import { showLoader } from "../utils/loader.js";


export class ChangeView {

    constructor() {
        this.characterView = new CharacterView;
        this.categoryView = new CategoryView;
    }

    async showList() {
        // キャラクター一覧を表示する
        this.characterView.showCharacters(await this.getCharacterData());

        // カテゴリーのラジオボタン一覧を表示する
        await this.categoryView.showCategories();

        // ラジオボタンを取得して値変更時の挙動をハンドルする
        document.querySelectorAll('input[name="category"]').forEach(radio => this.onRadioChange(radio))
    }

    async getCharacterData() {
        return await new CharacterList().getCharacterData();
    }

    onRadioChange(radio) {
        radio.addEventListener("change", async () => {
            // ローディングを表示する
            showLoader();
            // ラジオボタンのvalueに応じてハンドルする
            await this.handleChangeRadio(radio.value);
        })
    }

    handleChangeRadio(value) {
        this.getCharacterData().then(charactersData => {
            if(value === "全て") {
                this.characterView.showCharacters(charactersData);
            } else {
                const filterdCharacters = charactersData.filter(characterData => characterData.category === value);
                this.characterView.showCharacters(filterdCharacters);
            }
        })
    }

}
