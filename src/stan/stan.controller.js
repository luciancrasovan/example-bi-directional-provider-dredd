const StanRepository = require('./stan.repository');

const repository = new StanRepository();
const SUPPORTED_MEDIA_TYPES = [
    'application/json; x-api-version=3.0',
    'text/json; x-api-version=3.0',
    'text/plain; x-api-version=3.0'
];

const resolveResponseMediaType = (request) => {
    const acceptHeader = request.headers.accept || '';
    const matched = SUPPORTED_MEDIA_TYPES.find((mediaType) => acceptHeader.includes(mediaType));
    return matched || SUPPORTED_MEDIA_TYPES[0];
};

const hasAuthorization = (request) => {
    return Boolean(request.headers.authorization);
};

const shouldIncludeDescription = (request) => {
    const raw = String(request.query.includeDescription ?? '').toLowerCase();
    return raw === 'true' || raw === '1';
};

const sendVersionedPayload = (response, payload, mediaType, statusCode = 200) => {
    const body = Buffer.from(JSON.stringify(payload), 'utf8');
    response.writeHead(statusCode, {
        'Content-Type': mediaType,
        'Content-Length': body.length
    });
    response.end(body);
};

const sendUnauthorized = (request, response) => {
    const mediaType = resolveResponseMediaType(request);
    const payload = {
        type: null,
        title: 'Unauthorized',
        status: 401,
        detail: 'Missing authorization header.',
        instance: null
    };
    sendVersionedPayload(response, payload, mediaType, 401);
};

const sendNotFound = (request, response) => {
    const mediaType = resolveResponseMediaType(request);
    const payload = {
        type: null,
        title: 'Not Found',
        status: 404,
        detail: 'Entity not found.',
        instance: null
    };
    sendVersionedPayload(response, payload, mediaType, 404);
};

exports.getKutty = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    const kutty = await repository.getAllKutty();
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.getKuttyById = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    if (req.headers['x-force-status'] === '404') {
        return sendNotFound(req, res);
    }

    const exists = await repository.hasKutty(req.params.id);
    if (!exists) {
        return sendNotFound(req, res);
    }

    const kutty = await repository.getKuttyById(req.params.id);
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.getWitty = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    const witty = await repository.getAllWitty(shouldIncludeDescription(req));
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, witty, mediaType);
};

exports.getWittyById = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    if (req.headers['x-force-status'] === '404') {
        return sendNotFound(req, res);
    }

    const exists = await repository.hasWitty(req.params.id);
    if (!exists) {
        return sendNotFound(req, res);
    }

    const witty = await repository.getWittyById(req.params.id, shouldIncludeDescription(req));
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, witty, mediaType);
};

exports.health = async (req, res) => {
    res.status(200).end();
};

exports.repository = repository;
