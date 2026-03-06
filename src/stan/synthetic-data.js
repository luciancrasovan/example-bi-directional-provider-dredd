const normalizedId = (id) => {
    const raw = String(id ?? '').trim();
    return raw || 'K-000';
};

const buildKutty = (id) => {
    const value = normalizedId(id);
    return {
        id: value,
        name: `Synthetic Kutty ${value}`
    };
};

const buildWittyItem = (seed, index) => {
    const safeSeed = Number.isFinite(seed) ? seed : 0;
    return {
        scope: {
            ref: `SCOPE-${safeSeed}-${index}`
        },
        metric: Number((safeSeed * 10 + index + 0.5).toFixed(2)),
        refId: `REF-${safeSeed}-${index}`
    };
};

const buildWitty = (id) => {
    const value = normalizedId(id);
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;
    return {
        id: value,
        items: [
            buildWittyItem(seed, 1),
            buildWittyItem(seed, 2),
            buildWittyItem(seed, 3)
        ]
    };
};

const defaultKuttyDataset = () => {
    return [
        buildKutty('K-101'),
        buildKutty('K-102'),
        buildKutty('K-103'),
        buildKutty('K-104'),
        buildKutty('K-105')
    ];
};

const defaultWittyDataset = () => {
    return [
        buildWitty('W-201'),
        buildWitty('W-202'),
        buildWitty('W-203')
    ];
};

module.exports = {
    buildKutty,
    buildWitty,
    defaultKuttyDataset,
    defaultWittyDataset,
    normalizedId
};
