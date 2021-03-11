// Require the dev-dependencies
import supertest from 'supertest';
import app from '../../../../entry';
import {MEMBERS_URL, TEST_API_KEY} from '../../routes';
import {EmptyAuthCollections} from '../../../../util';
import {BAD_REQUEST, CREATED} from '../../../../../src/utils/constants';

describe('Suite: Member Post Endpoint', () => {
	let server;
	beforeAll(async (done) => {
		server = supertest(await app);
		await EmptyAuthCollections();
		done();
	});

	afterAll(done => {
		server.close();
		done();
	});

	it('Should error without inputs or wrong input', async (done) => {
		const response = await server
			.post(MEMBERS_URL)
			.set('x-api-key', TEST_API_KEY)
			.set('Accept', 'application/json')
			.send({});
		expect(response.statusCode).toBe(BAD_REQUEST);
		expect(response.body).toHaveProperty('meta');
		expect(response.body.meta).toHaveProperty('error');
		expect(response.body.meta.error).toHaveProperty('message');
		expect(response.body.meta.error).toHaveProperty('messages');
		done();
	});

	it('Should create contractor with minimum inputs', async (done) => {
		let response = await server
			.post(MEMBERS_URL)
			.set('x-api-key', TEST_API_KEY)
			.set('Accept', 'application/json')
			.send({
				email: 'contractor2@test.com',
				firstName: 'John',
				lastName: 'Doe',
				profileType: 'Contractor',
				tags: ['vue', 'aws', 'gcp'],
				profile: {
					'startDate': '2021-06-04',
					'endDate': '2021-08-04'
				}
			});
		expect(response.statusCode).toBe(CREATED);
		expect(response.body).toHaveProperty('meta');
		expect(response.body.meta).toHaveProperty('success');
		expect(response.body).toHaveProperty('data');
		expect(response.body.data.profileType).toBe('Contractor');
		done();
	});

	it('Should create employee with minimum inputs', async (done) => {
		let response = await server
			.post(MEMBERS_URL)
			.set('x-api-key', TEST_API_KEY)
			.set('Accept', 'application/json')
			.send({
				email: 'employee2@test.com',
				firstName: 'Anayo',
				lastName: 'Oka',
				tags: ['java', 'php', 'devOps'],
				profileType: 'Employee',
				profile: {
					role: 'Software Architect'
				}
			});
		expect(response.statusCode).toBe(CREATED);
		expect(response.body).toHaveProperty('meta');
		expect(response.body.meta).toHaveProperty('success');
		expect(response.body).toHaveProperty('data');
		expect(response.body.data.profileType).toBe('Employee');
		done();
	});
});
