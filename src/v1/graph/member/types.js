export default `
	extend type Query {
		getMembers(query: QueryInput): Members
		getMember(memberId: ID!): Member
	}

	extend type Mutation {
		createMember(createInput: MemberInput!): Member
		updateMember(memberId: ID!, updateInput: UpdateMemberInput!): Member
		deleteMember(memberId: ID!): ObjectId
	}

	type Members {
		pagination: Pagination
		data: [Member]
	}

	type Member {
		_id: ID!
		email: String
		firstName: String
		lastName: String
		profileType: String
		profile: Profile
	}

	interface Profile {
		_id: ID!
		profileType: String
		member: ID
	}

	type Employee implements Profile {
		_id: ID!
		member: ID
		profileType: String
		role: String
	}

	type Contractor implements Profile {
		_id: ID!
		member: ID
		profileType: String
		startDate: String
		endDate: String
	}

	input MemberInput {
		email: String!
		firstName: String!
		lastName: String!
		tags: [String]
		profileType: String!
		profile: ProfileInput!
	}

	input UpdateMemberInput {
		firstName: String
		lastName: String
		tags: [String]
		profile: ProfileInput
	}

	input ContractorInput {
		startDate: String
		endDate: String
	}

	input EmployeeInput {
		role: String
	}

	input ProfileInput {
		contractor: ContractorInput
		employee: EmployeeInput
	}

	input QueryInput {
		pagination: PaginationInput
		firstName: String
		lastName: String
		tags: [String]
	}
`;
