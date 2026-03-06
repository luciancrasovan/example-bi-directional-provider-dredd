const {
    buildKutty,
    buildWitty,
    defaultKuttyDataset,
    defaultWittyDataset,
    normalizedId
} = require('./synthetic-data');

class StanRepository {
    constructor() {
        this.kutty = defaultKuttyDataset();
        this.witty = defaultWittyDataset();
    }

    async getAllKutty() {
        return this.kutty;
    }

    async hasKutty(id) {
        const idValue = normalizedId(id);
        return this.kutty.some((entry) => entry.id === idValue);
    }

    async getKuttyById(id) {
        const idValue = normalizedId(id);
        const found = this.kutty.find((entry) => entry.id === idValue);
        return found || buildKutty(idValue);
    }

    async getAllWitty(includeDescription = false) {
        return this.witty.map((entry) => ({
            ...entry,
            description: includeDescription ? `Synthetic Witty ${entry.id}` : null
        }));
    }

    async hasWitty(id) {
        const idValue = normalizedId(id);
        return this.witty.some((entry) => entry.id === idValue);
    }

    async getWittyById(id, includeDescription = false) {
        const idValue = normalizedId(id);
        const found = this.witty.find((entry) => entry.id === idValue);
        const witty = found || buildWitty(idValue);
        return {
            ...witty,
            description: includeDescription ? `Synthetic Witty ${witty.id}` : null
        };
    }
}

module.exports = StanRepository;
