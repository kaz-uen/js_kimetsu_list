import { escapeHTML, htmlToElement } from "../utils/htmlView.js";
import { CategoryList } from "../model/CategoryList.js";

export class CategoryView {

    async showCategories() {
        const categoryList = await new CategoryList().getCategory();
        categoryList.forEach(category => {
            const view = this.createCategoryButtonHtml(category);
            this.renderCategoryElement(view);
        });
        return Promise.resolve();
    }

    createCategoryButtonHtml(categoryData) {
        return escapeHTML`
            <label><input type="radio" name="category" value="${categoryData}">${categoryData}</label>
        `;
    }

    renderCategoryElement(view) {
        const categories = document.getElementById("categories");
        const listElement = htmlToElement`<li></li>`;
        listElement.innerHTML = view;
        categories.appendChild(listElement);
    }

}
