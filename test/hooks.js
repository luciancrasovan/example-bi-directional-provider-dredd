const hooks = require('hooks');

hooks.beforeEach((transaction, done) => {
	const expectedStatusCode = String(transaction.expected.statusCode);
	const headers = transaction.request.headers || {};

	if (expectedStatusCode === '200') {
		headers.Authorization = 'Bearer synthetic-token';
		delete headers['x-force-status'];
	}

	if (expectedStatusCode === '404') {
		headers.Authorization = 'Bearer synthetic-token';
		headers['x-force-status'] = '404';
	}

	if (expectedStatusCode === '401') {
		delete headers.Authorization;
		delete headers.authorization;
		delete headers['x-force-status'];
	}

	transaction.request.headers = headers;
	done();
});
