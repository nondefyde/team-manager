import 'core-js/stable';
import 'regenerator-runtime/runtime';
import config from 'config';
import http from 'http';
import loadRoutes from './index';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import intiDatabase from './database';
import {EmptyAuthCollections} from './util';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

export default intiDatabase()
	.then(async () => {
		const result = await EmptyAuthCollections();
		return Promise.resolve(result);
	})
	.then(() => loadRoutes(app))
	.then(async (app) => {
		const server = await http.createServer(app)
			.listen(9000);
		console.log(`\n
	\tTest Application listening on ${config.get('app.apiHost')}\n
	\tEnvironment => ${config.util.getEnv('NODE_ENV')} ${server}\n
	\tDate: ${new Date()}`);
		return Promise.resolve(app);
	}, err => {
		console.log('There was an un catch error : ');
		console.error(err);
	});

