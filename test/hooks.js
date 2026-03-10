const hooks = require('hooks');

hooks.beforeEach((transaction, done) => {
	const expectedStatusCode = String(transaction.expected.statusCode);
	const headers = transaction.request.headers || {};
	const uri = transaction.request.uri || '';
	const request = transaction.request;

	if (uri.includes('/pitty/notty')) {
		delete headers['x-force-status'];
		request.uri = '/pitty/notty';

		if (expectedStatusCode === '400') {
			headers['x-force-status'] = '400';
		}

		if (expectedStatusCode === '401') {
			headers['x-force-status'] = '401';
		}

		if (expectedStatusCode === '422') {
			headers['x-force-status'] = '422';
		}

		if (expectedStatusCode === '500') {
			headers['x-force-status'] = '500';
		}

	}

	transaction.request.headers = headers;
	transaction.request = request;
	done();
});
