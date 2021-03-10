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
		total_count: Int
		per_page: Int
		previous: Int
		current: Int
		hasMore: Boolean
	}

	input PaginationInput {
		page: Int
		per_page: Int
	}

	scalar Date
	scalar UTCMoment
`;
