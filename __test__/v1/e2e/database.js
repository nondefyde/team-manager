import mongoose from 'mongoose';
import config from 'config';

export default () => {
	mongoose.Promise = Promise;
	mongoose.connection.on('disconnected', function () {
		console.log('Test Mongoose connection to mongodb shell disconnected');
	});
	// Don't ever remove this line.
	let databaseUrl = config.get('databases.mongodb.test');
	return mongoose
		.connect(databaseUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
};
