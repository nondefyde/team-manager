// Require the dev-dependencies
import supertest from 'supertest';
import app from '../../../../entry';
import {MEMBERS_URL, TEST_API_KEY} from '../../routes';
import {EmptyAuthCollections} from '../../../../util';
import {BAD_REQUEST, OK} from '../../../../../src/utils/constants';

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

	test('Should error without inputs or wrong input', async (done) => {
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

	describe('/GET resources/all', () => {
		it('Should return all resources', async () => {
			const response = await server
				.get(MEMBERS_URL)
				.set('x-api-key', TEST_API_KEY)
				.set('Accept', 'application/json')
				.send({});
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body.meta).toHaveProperty('success');
			expect(response.body).toHaveProperty('data');
			expect(response.body.data).toBeInstanceOf(Array);
		});

		it(`Should error out when resource doesn't exist`, async () => {
			const wrongObjectId = new ObjectId();
			let response = await server.get(`${RESOURCE_URL}/${wrongObjectId}`)
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-type', /json/)
				.expect(NOT_FOUND);
			response.body.should.be.an('object');
			response.body.should.have.property('meta').which.is.an('object').and.not.empty;
			response.body.meta.should.have.property('error').which.is.an.instanceOf(Object);
			response.body.meta.error.should.have.property('message').which.is.a('string');
			response.body.meta.error.should.not.have.property('messages');
		});
		it(`Should return a single resource if exist`, async () => {
			let response = await server.get(`${RESOURCE_URL}/${resource._id}`)
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.an('object');
			response.body.should.have.property('meta').which.is.an('object').and.not.empty;
			response.body.meta.should.have.property('success').which.is.true;
			response.body.should.have.property('data').which.is.an('object');
		});
	});
});
