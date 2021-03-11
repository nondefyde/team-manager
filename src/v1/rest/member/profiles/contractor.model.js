import mongoose, {Schema} from 'mongoose';

/**
 * ContractorSchema
 */
const ContractorSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	duration: {
		startDate: Date,
		endDate: Date
	}
}, {
	autoCreate: true,
	timestamps: true
});
/**
 * @typedef ContractorSchema
 */
export default mongoose.model('Contractor', ContractorSchema);
