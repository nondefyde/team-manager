import mongoose from 'mongoose';

/**
 * Empty collections
 */
export const EmptyAuthCollections = async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.remove();
	}
};
