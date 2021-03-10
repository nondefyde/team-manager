export default `
	extend type Query {
		getUser(userId: ID!): User
	}

	extend type Mutation {
		updateUser(userInput: UserInput!): User
	}

	type User {
		_id: ID!
		email: String
		firstName: String
		lastName: String
	}

	input UserInput {
		firstName: String
		lastName: String
	}
`;
