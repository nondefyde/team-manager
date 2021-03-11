import mongoose, {Schema} from 'mongoose';
import AppSchema from '../../_core/app.model';

/**
 * ContractorSchema
 */
const ContractorSchema = new AppSchema({
	member: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Member'
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	}
}, {
	autoCreate: true,
	timestamps: true
});

ContractorSchema.statics.fillables = [
	'startDate',
	'endDate'
];

/**
 * @typedef ContractorSchema
 */
export default mongoose.model('Contractor', ContractorSchema);
