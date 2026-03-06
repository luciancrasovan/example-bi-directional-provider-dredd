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

    async getKuttyById(id) {
        const idValue = normalizedId(id);
        const found = this.kutty.find((entry) => entry.id === idValue);
        return found || buildKutty(idValue);
    }

    async getAllWitty() {
        return this.witty;
    }

    async getWittyById(id) {
        const idValue = normalizedId(id);
        const found = this.witty.find((entry) => entry.id === idValue);
        return found || buildWitty(idValue);
    }
}

module.exports = StanRepository;
