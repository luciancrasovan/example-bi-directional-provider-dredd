const StanRepository = require('./stan.repository');

const repository = new StanRepository();
const SUPPORTED_MEDIA_TYPES = [
    'application/json; x-api-version=2.0',
    'text/json; x-api-version=2.0',
    'text/plain; x-api-version=2.0'
];

const resolveResponseMediaType = (request) => {
    const acceptHeader = request.headers.accept || '';
    const matched = SUPPORTED_MEDIA_TYPES.find((mediaType) => acceptHeader.includes(mediaType));
    return matched || SUPPORTED_MEDIA_TYPES[0];
};

const hasAuthorization = (request) => {
    return Boolean(request.headers.authorization);
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
        title: 'Unauthorized',
        status: 401,
        detail: 'Missing authorization header.'
    };
    sendVersionedPayload(response, payload, mediaType, 401);
};

const sendNoContent = (response) => {
    response.writeHead(204);
    response.end();
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
    if (req.headers['x-force-status'] === '204') {
        return sendNoContent(res);
    }

    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    const kutty = await repository.getKuttyById(req.params.id);
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.getWitty = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    const witty = await repository.getAllWitty();
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, witty, mediaType);
};

exports.getWittyById = async (req, res) => {
    if (!hasAuthorization(req)) {
        return sendUnauthorized(req, res);
    }

    const witty = await repository.getWittyById(req.params.id);
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, witty, mediaType);
};

exports.health = async (req, res) => {
    res.status(200).end();
};

exports.repository = repository;
