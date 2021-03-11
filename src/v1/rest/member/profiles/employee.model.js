import mongoose, {Schema} from 'mongoose';

/**
 * EmployeeSchema
 */
const EmployeeSchema = new Schema({
	member: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Member'
	},
	role: {
		required: true,
		type: String
	}
}, {
	autoCreate: true,
	timestamps: true
});

EmployeeSchema.statics.fillables = [
	'role'
];

/**
 * @typedef EmployeeSchema
 */
export default mongoose.model('Employee', EmployeeSchema);
