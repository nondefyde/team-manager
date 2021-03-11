import mongoose, {Schema} from 'mongoose';

/**
 * EmployeeSchema
 */
const EmployeeSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	role: {
		required: true,
		type: String
	}
}, {
	autoCreate: true,
	timestamps: true
});

/**
 * @typedef EmployeeSchema
 */
export default mongoose.model('Employee', EmployeeSchema);
