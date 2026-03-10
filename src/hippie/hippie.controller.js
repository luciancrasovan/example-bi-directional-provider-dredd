const SUPPORTED_MEDIA_TYPES = ['application/json', 'text/json', 'text/plain'];

const resolveResponseMediaType = (request) => {
    const acceptHeader = String(request.headers.accept || '').toLowerCase();
    const matched = SUPPORTED_MEDIA_TYPES.find((mediaType) => acceptHeader.includes(mediaType));
    return matched || SUPPORTED_MEDIA_TYPES[0];
};

const sendPayload = (response, payload, mediaType, statusCode = 200) => {
    const body = Buffer.from(JSON.stringify(payload), 'utf8');
    response.writeHead(statusCode, {
        'Content-Type': mediaType,
        'Content-Length': body.length
    });
    response.end(body);
};

const buildValidationResult = (topic, errorCode, warningCode) => ({
    topic,
    errors: errorCode
        ? [{
            errorCode,
            message: `${errorCode} validation failed`
        }]
        : [],
    warnings: warningCode
        ? [{
            warningCode,
            message: `${warningCode} warning detected`
        }]
        : []
});

const okResponse = () => ({
    status: 'Accepted',
    decision: 'P1',
    validationResults: [buildValidationResult('Pitty.Payload', null, 'W-001')]
});

const badRequestResponse = () => ({
    status: 'Rejected',
    decision: 'P4',
    validationResults: [buildValidationResult('Pitty.Payload', 'E-400', null)]
});

const unprocessableResponse = () => ({
    status: 'Rejected',
    decision: 'P3',
    validationResults: [buildValidationResult('Pitty.BusinessRule', 'E-422', 'W-422')]
});

const unauthorizedResponse = () => ({
    statusCode: 'Unauthorized',
    description: 'Missing festival pass.',
    exception: 'AuthorizationException'
});

const errorResponse = () => ({
    statusCode: 'InternalServerError',
    description: 'Unexpected processing failure.',
    exception: 'RuntimeException'
});

const forcedStatus = (request) => {
    const headerValue = Number.parseInt(String(request.headers['x-force-status'] || ''), 10);
    if ([400, 401, 422, 500].includes(headerValue)) {
        return headerValue;
    }

    const forceQuery = String(request.query.force ?? '').toLowerCase();
    if (forceQuery === 'true' || forceQuery === '1') {
        return 422;
    }

    return 200;
};

exports.notty = async (req, res) => {
    const mediaType = resolveResponseMediaType(req);

    const status = forcedStatus(req);

    if (status === 401) {
        return sendPayload(res, unauthorizedResponse(), mediaType, 401);
    }

    if (status === 400) {
        return sendPayload(res, badRequestResponse(), mediaType, 400);
    }

    if (status === 422) {
        return sendPayload(res, unprocessableResponse(), mediaType, 422);
    }

    if (status === 500) {
        return sendPayload(res, errorResponse(), mediaType, 500);
    }

    return sendPayload(res, okResponse(), mediaType, 200);
};
