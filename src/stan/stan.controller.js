const StanRepository = require('./stan.repository');

const repository = new StanRepository();
const SUPPORTED_MEDIA_TYPES = [
    'application/json; x-api-version=1.0',
    'text/json; x-api-version=1.0',
    'text/plain; x-api-version=1.0'
];

const resolveResponseMediaType = (request) => {
    const acceptHeader = request.headers.accept || '';
    const matched = SUPPORTED_MEDIA_TYPES.find((mediaType) => acceptHeader.includes(mediaType));
    return matched || SUPPORTED_MEDIA_TYPES[0];
};

const sendVersionedPayload = (response, payload, mediaType) => {
    const body = Buffer.from(JSON.stringify(payload), 'utf8');
    response.writeHead(200, {
        'Content-Type': mediaType,
        'Content-Length': body.length
    });
    response.end(body);
};

exports.getAlVkl = async (req, res) => {
    res.status(200).end();
};

exports.deleteAlVklByShortName = async (req, res) => {
    res.status(200).end();
};

exports.getKutty = async (req, res) => {
    const kutty = await repository.getAllKutty();
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.getKuttyById = async (req, res) => {
    const kutty = await repository.getKuttyById(req.params.id);
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.getKuttyByShortName = async (req, res) => {
    const kutty = await repository.getKuttyByShortName(req.params.shortName);
    const mediaType = resolveResponseMediaType(req);
    sendVersionedPayload(res, kutty, mediaType);
};

exports.health = async (req, res) => {
    res.status(200).end();
};

exports.repository = repository;
