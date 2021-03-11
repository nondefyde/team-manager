import faker from 'faker';
import Member from '../v1/rest/member/member.model';
import Employee from '../v1/rest/member/profiles/employee.model';
import Contractor from '../v1/rest/member/profiles/contractor.model';

export default async () => {
	const getRandomSubarray = (array, size) => {
		let index;
		let temp;
		let shuffled = array.slice(0);
		let i = array.length;
		let min = i - size;
		while (i-- > min) {
			index = Math.floor((i + 1) * Math.random());
			temp = shuffled[index];
			shuffled[index] = shuffled[i];
			shuffled[i] = temp;
		}
		return shuffled.slice(min);
	};

	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	const tags = [
		'java',
		'php',
		'react',
		'angular'
	];

	const type = [
		'Employee',
		'Contractor'
	];

	const roles = [
		'Software Engineer',
		'Data Scientist'
	];
	for (let i = 0; i < 10; i++) {
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();
		let email = faker.internet.email();
		let tagSet = getRandomSubarray(tags);

		const profileType = getRandomArbitrary(0, 10) % 2 === 0 ? 'Contractor' : 'Employee';

		const ProfileModel = profileType === 'Contractor' ? Contractor : Employee;

		let member = new Member({
			firstName, lastName, email, tags: tagSet, profileType
		});

		let profilePayload = {
			role: getRandomArbitrary(0, roles.length)
		};
		if (i % 2 === 0) {
			profilePayload = {
				startDate: '',
				endDate: ''
			};
		}
		const profile = await ProfileModel.findOneAndUpdate({member: member._id},
			{
				...profile,
				$setOnInsert: {
					member: member._id
				}
			}, {upsert: true, new: true, setDefaultsOnInsert: true, session});
		member.profile = profile._id;
		await member.save();
	}
};
