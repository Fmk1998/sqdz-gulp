class App {
    constructor(parent) {
        this.parent = parent;
    }

    async list() {
        const {err, data} = await $get({url: '/rest/app/list'});
        if (err) return $error(err);
        return data;
    }

    item(app) {
        const title = app.name;
        const name = app.name.length > 13 ? app.name.slice(0, 10) + '...' : app.name;
        return `
                <div class="app-item" key="${app.key}" title="${title}">
                    <img class="app-icon" src="img/app/${app.icon || 'icon'}.png">
                    <div class="app-name">${name}</div>
                </div>
                `;
    }
}

export default App;