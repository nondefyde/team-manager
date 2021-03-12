import supertest from 'supertest';
import app from '../../../entry';
import {Types} from 'mongoose';
import seedData from '../../../../src/setup/seed';
import {MEMBERS_URL, TEST_API_KEY} from '../routes';
import {EmptyAuthCollections} from '../../../util';
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from '../../../../src/utils/constants';

describe('Suite: Member', () => {
	let server;

	beforeAll(async (done) => {
		await EmptyAuthCollections();
		done();
	});

	describe('Post Endpoint', () => {
		beforeAll(async (done) => {
			server = supertest(await app);
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

	describe('Find Endpoint', () => {
		jest.setTimeout(300000);
		beforeAll(async (done) => {
			server = supertest(await app);
			await EmptyAuthCollections();
			const result = await seedData(10);
			done();
		});

		afterAll(done => {
			server.close();
			done();
		});

		let oneMember;
		it('Should find members with default pagination params', async (done) => {
			const response = await server
				.get(MEMBERS_URL)
				.set('x-api-key', TEST_API_KEY);
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body.meta).toHaveProperty('pagination');
			expect(response.body).toHaveProperty('data');
			expect(Array.isArray(response.body.data)).toBe(true);
			expect(response.body.data.length).toBe(10);
			oneMember = response.body.data[0];
			done();
		});

		it('Should test members pagination with minimun perPage requirement', async (done) => {
			const response = await server
				.get(MEMBERS_URL)
				.query({perPage: 5})
				.set('x-api-key', TEST_API_KEY);
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body.meta).toHaveProperty('pagination');
			expect(response.body.meta.pagination).toHaveProperty('perPage');
			expect(response.body.meta.pagination.perPage).toBe(5);
			expect(response.body).toHaveProperty('data');
			expect(Array.isArray(response.body.data)).toBe(true);
			expect(response.body.data.length).toBe(5);
			done();
		});

		it('Should find member that does not exist', async (done) => {
			const response = await server
				.get(`${MEMBERS_URL}/${Types.ObjectId()}`)
				.set('x-api-key', TEST_API_KEY);
			expect(response.statusCode).toBe(NOT_FOUND);
			expect(response.body).toHaveProperty('meta');
			expect(response.body.meta).toHaveProperty('error');
			expect(response.body.meta.error).toHaveProperty('message');
			done();
		});

		it('Should find one members with id', async (done) => {
			const response = await server
				.get(`${MEMBERS_URL}/${oneMember._id}`)
				.set('x-api-key', TEST_API_KEY);
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body).toHaveProperty('data');
			expect(response.body.data._id).toBe(oneMember._id);
			done();
		});
	});


	describe('Update Endpoint', () => {
		jest.setTimeout(300000);
		beforeAll(async (done) => {
			server = supertest(await app);
			done();
		});

		afterAll(done => {
			server.close();
			done();
		});

		it('Should update employee', async (done) => {

			const res = await server
				.get(MEMBERS_URL)
				.query({profileType: 'Employee'})
				.set('x-api-key', TEST_API_KEY);
			expect(res.statusCode).toBe(OK);
			const employee = res.body.data[0];

			const response = await server
				.put(`${MEMBERS_URL}/${employee._id}`)
				.set('x-api-key', TEST_API_KEY)
				.query({population: [{path: 'profile'}]})
				.send({
					firstName: 'Emma',
					lastName: 'Jevizu',
					profile: {
						role: 'Updated Role'
					}
				});
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body).toHaveProperty('data');
			expect(response.body.data._id).toBe(employee._id);
			expect(response.body.data).toHaveProperty('profile');
			expect(response.body.data.profile.role).toBe('Updated Role');
			done();
		});

		it('Should update contractor', async (done) => {

			const res = await server
				.get(MEMBERS_URL)
				.query({profileType: 'Contractor'})
				.set('x-api-key', TEST_API_KEY);
			expect(res.statusCode).toBe(OK);
			const contractor = res.body.data[0];

			const response = await server
				.put(`${MEMBERS_URL}/${contractor._id}`)
				.set('x-api-key', TEST_API_KEY)
				.query({population: [{path: 'profile'}]})
				.send({
					firstName: 'Ade',
					lastName: 'Jevizu',
					profile: {
						startDate: '2021-10-10'
					}
				});
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body).toHaveProperty('data');
			expect(response.body.data._id).toBe(contractor._id);
			expect(response.body.data).toHaveProperty('profile');
			expect(response.body.data.firstName).toBe('Ade');
			// expect(response.body.data.profile.startDate).toBe('Updated Role');
			done();
		});
	});


	describe('Delete Endpoint', () => {
		jest.setTimeout(30000);
		beforeAll(async (done) => {
			server = supertest(await app);
			done();
		});

		afterAll(done => {
			server.close();
			done();
		});

		it('Should update employee', async (done) => {

			const res = await server
				.get(MEMBERS_URL)
				.set('x-api-key', TEST_API_KEY);
			expect(res.statusCode).toBe(OK);
			const employee = res.body.data[0];

			const response = await server
				.delete(`${MEMBERS_URL}/${employee._id}`)
				.set('x-api-key', TEST_API_KEY);
			expect(response.statusCode).toBe(OK);
			expect(response.body).toHaveProperty('meta');
			expect(response.body).toHaveProperty('data');
			expect(response.body.data._id).toBe(employee._id);
			done();
		});
	});
});
