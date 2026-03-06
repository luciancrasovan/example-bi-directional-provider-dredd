const DAY_MS = 24 * 60 * 60 * 1000;

const safeId = (id) => {
    const parsed = Number.parseInt(id, 10);
    if (!Number.isFinite(parsed)) {
        return 0;
    }
    return Math.abs(parsed);
};

const isoAtOffset = (daysAgo = 0) => {
    const now = Date.now();
    return new Date(now - (daysAgo * DAY_MS)).toISOString();
};

const buildKutty = ({ id, shortName }) => {
    const normalizedId = safeId(id);
    const code = shortName || `KTY-${String(normalizedId).padStart(4, '0')}`;

    return {
        id: normalizedId,
        name: `Synthetic Kutty ${normalizedId}`,
        code,
        metaA: `segment-${normalizedId % 5}`,
        metaB: isoAtOffset(normalizedId % 31),
        metaC: normalizedId % 2 === 0 ? `flag-${normalizedId % 3}` : null,
        metaD: normalizedId % 3 === 0 ? isoAtOffset((normalizedId % 14) + 1) : null,
        metaE: `batch-${Math.floor(normalizedId / 10)}`,
        metaF: normalizedId % 4 === 0 ? isoAtOffset((normalizedId % 20) + 2) : null,
        metaG: `trace-${normalizedId}`
    };
};

const defaultKuttyDataset = () => {
    return [
        buildKutty({ id: 101, shortName: 'ALPHA' }),
        buildKutty({ id: 102, shortName: 'BETA' }),
        buildKutty({ id: 103, shortName: 'GAMMA' }),
        buildKutty({ id: 104, shortName: 'DELTA' }),
        buildKutty({ id: 105, shortName: 'EPSILON' })
    ];
};

module.exports = {
    buildKutty,
    defaultKuttyDataset,
    safeId
};
