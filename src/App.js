import { ChangeView } from "./actions/ChangeView.js";

export default class App {

    constructor() {
        this.changeView = new ChangeView;
    }

    mount() {
        try {
            this.changeView.showList();
        } catch (error) {
            console.error("エラー発生:", error);
        }
    }

}
