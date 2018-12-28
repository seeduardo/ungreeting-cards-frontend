class API {
    static init () {
        this.baseUrl = "http://localhost:3000";
        this.categoriesUrl = `${this.baseUrl}/api/v1/categories`;
        this.greeting_cardsUrl = `${this.baseUrl}/api/v1/greeting_cards`;

    }

    static getCategories () {
        return fetch(this.categoriesUrl)
        .then(resp => resp.json())
    }
}

API.init()