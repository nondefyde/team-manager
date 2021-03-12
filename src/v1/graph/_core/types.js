export default `
	schema {
	  	query: Query
	   	mutation: Mutation
	}
	type Query
	type Mutation

	type ObjectId {
		_id: String
	}

	type Pagination {
		totalCount: Int
		perPage: Int
		previous: Int
		current: Int
	}

	input PaginationInput {
		page: Int
		perPage: Int
	}

	scalar Date
	scalar UTCMoment
`;
