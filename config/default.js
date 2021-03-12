require('dotenv').config();
const PORT = process.env.PORT || 8000;
module.exports = {
	app: {
		appName: process.env.APP_NAME || 'Team Manager',
		environment: process.env.NODE_ENV || 'development',
		apiHost: `http://localhost:${PORT}`,
		port: PORT
	},
	api: {
		url: process.env.SERVICE_URL || 'http://127.0.0.1:8000/api/v1',
		lang: 'en',
		prefix: '^/v[1-9]',
		versions: [1],
		pagination: {
			itemsPerPage: 10
		}
	},
	databases: {
		mongodb: {
			url: process.env.DB_URL
		}
	}
};
