/**
 * User Schema
 */
import mongoose, {Schema} from 'mongoose';
import AppSchema from '../_core/app.model';
import MemberValidation from './member.validation';
import MemberProcessor from './member.processor';
import Contractor from './profiles/contractor.model';
import Employee from './profiles/employee.model';

const MemberSchema = new AppSchema({
	email: {
		type: String,
		lowercase: true,
		index: true
	},
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	profileType: {
		type: String,
		required: true,
		enum: ['Employee', 'Contractor']
	},
	profile: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: 'profileType'
	},
	tags: [{
		type: String,
		index: true
	}],
	deleted: {
		type: Boolean,
		default: false,
		select: false
	}
}, {
	autoCreate: true,
	timestamps: true,
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

MemberSchema.statics.uniques = ['email'];

MemberSchema.statics.fillables = [
	'email',
	'firstName',
	'lastName',
	'profileType',
	'tags'
];

MemberSchema.statics.updateFillables = [
	'email',
	'firstName',
	'lastName',
	'tags'
];

/**
 * @param {Object} doc document removed
 * @param Only document middleware
 */
MemberSchema.pre('remove', {document: true, query: false}, function (next) {
	const ProfileModel = (this.profileType === 'Contractor') ? Contractor : Employee;
	ProfileModel.remove({_id: this.profile}).exec();
	next();
});

/**
 * @return {Object} The validator object with the specified rules.
 */
MemberSchema.statics.getValidator = () => {
	return new MemberValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
MemberSchema.statics.getProcessor = (model) => {
	return new MemberProcessor(model);
};

/**
 * @param {String} q query string for filtering
 * @return {Object} The processor class instance object
 */
MemberSchema.statics.searchQuery = (q) => {
	const regex = new RegExp(q);
	return [
		{'email': {$regex: regex, $options: 'i'}},
		{'firstName': {$regex: regex, $options: 'i'}},
		{'lastName': {$regex: regex, $options: 'i'}},
		{'tags': {$regex: regex, $options: 'i'}},
		{'employeeObject.role': {$regex: regex, $options: 'i'}}
	];
};

/**
 * @typedef MemberSchema
 */
export default mongoose.model('Member', MemberSchema);
