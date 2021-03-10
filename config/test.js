require('dotenv').config();
const PORT = process.env.PORT || 3010;
module.exports = {
	app: {
		appName: process.env.APP_NAME || 'Team Manager',
		environment: process.env.NODE_ENV || 'development',
		superSecret: process.env.SERVER_SECRET || 'SecretKey',
		baseUrl: `http://localhost:${PORT}`,
		port: PORT
	},
	databases: {
		mongodb: {
			url: process.env.DB_TEST_URL,
		}
	}
};
