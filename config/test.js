require('dotenv').config();
const PORT = 9000;
module.exports = {
	app: {
		appName: process.env.APP_NAME || 'Team Manager',
		environment: process.env.NODE_ENV || 'development',
		apiHost: `http://localhost:${PORT}`,
		port: PORT
	},
	databases: {
		mongodb: {
			url: process.env.DB_TEST_URL
		}
	}
};
