import { escapeHTML, htmlToElement } from "../utils/htmlView.js";
import { hideLoader } from "../utils/loader.js";
import { BASE_PATH } from "../constants/index.js";


export class CharacterView {

    static resultElement = document.getElementById("characters");

    showCharacters(charactersData) {
        // キャラクター一覧表示を初期化する
        this.clearResultElement();

        // キャラクター一覧を描画する
        charactersData.forEach(data => {
            this.renderCharacterElement(data, this.constructor.resultElement)
        });

        // 画像の読み込み完了を待って処理する
        this.promiseAllImageLoad().then(() => {
            // ローディングを非表示にする
            hideLoader();
        });
    }

    createCharacterHtml(characterData) {
        const { name, image, category } = characterData;

        return escapeHTML`
        <h2 class="character-name">${name}</h2>
        <img src="${BASE_PATH + image}" class="character-thumbnail" alt="${name}" height="100">
        <p class="character-category">${category}</p>
        `;
    }

    renderCharacterElement(data, resultElement) {
        const listElement = htmlToElement`<li></li>`;
        const view = this.createCharacterHtml(data);
        listElement.innerHTML = view;
        resultElement.appendChild(listElement);
    }

    clearResultElement() {
        this.constructor.resultElement.innerHTML = '';
    }

    promiseAllImageLoad() {
        // 画像読み込み完了を監視するプロミスを格納する配列
        const loadPromises = [];

        //画像の読み込み完了を監視する
        const images = document.querySelectorAll("img");
        if(!images) return Promise.resolve();

        images.forEach(image => {
            loadPromises.push(new Promise(resolve => {
                image.onload = () => resolve(image);
                image.onerror = () => resolve(image);
            }))
        });

        //画像の読み込み完了を待ってfulfilledを返す
        return Promise.all(loadPromises);
    }

}
