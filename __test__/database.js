import mongoose from 'mongoose';
import config from 'config';

export default () => {
	mongoose.Promise = Promise;
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose connection to mongodb shell disconnected');
	});
	// Connect to MongoDb
	const databaseUrl = config.get('databases.mongodb.url');
	return mongoose
		.connect(databaseUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
};
