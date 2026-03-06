const { buildKutty, defaultKuttyDataset, safeId } = require('./synthetic-data');

class StanRepository {
    constructor() {
        this.kutty = defaultKuttyDataset();
    }

    async getAllKutty() {
        return this.kutty;
    }

    async getKuttyById(id) {
        const normalizedId = safeId(id);
        const found = this.kutty.find((entry) => entry.id === normalizedId);
        return found || buildKutty({ id: normalizedId });
    }

    async getKuttyByShortName(shortName) {
        const normalizedShortName = (shortName || '').trim();
        const found = this.kutty.find((entry) => entry.code.toLowerCase() === normalizedShortName.toLowerCase());

        if (found) {
            return found;
        }

        const syntheticId = Math.max(1, normalizedShortName.length * 11);
        return buildKutty({ id: syntheticId, shortName: normalizedShortName || 'UNKNOWN' });
    }
}

module.exports = StanRepository;
