import mongoose from 'mongoose';
import config from 'config';
import log from '../utils/logging';

export default () => {
	mongoose.Promise = Promise;
	mongoose.connection.on('disconnected', function () {
		log.debug('Mongoose connection to mongodb shell disconnected');
	});
	// Don't ever remove this line.
	let databaseUrl = config.get('databases.mongodb.url');
	if (config.get('app.environment') === 'test') {
		databaseUrl = config.get('databases.mongodb.test');
	}
	return mongoose
		.connect(databaseUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
};
