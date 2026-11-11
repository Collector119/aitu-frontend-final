class SavedList {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.items = this.load();
    }

    // localStorage keeps only strings, so the array is stored as JSON text
    load() {
        const savedText = localStorage.getItem(this.storageKey);
        if (savedText === null) {
            return [];
        }
        return JSON.parse(savedText);
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
