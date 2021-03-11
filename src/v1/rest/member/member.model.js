/**
 * User Schema
 */
import mongoose, {Schema} from 'mongoose';
import AppSchema from '../_core/app.model';
import MemberValidation from './member.validation';
import MemberProcessor from './member.processor';

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
	lastLame: {
		type: String,
		trim: true
	},
	profileType: {
		type: String,
		required: true,
		enum: ['Employee', 'Contractor'],
		default: 'Employee'
	},
	profile: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: 'profileType'
	},
	skills: [String],
	deleted: {
		type: Boolean,
		default: false,
		select: false
	}
}, {
	autoCreate: true,
	timestamps: true,
	toJSON: {virtuals: true},
	toObject: {
		virtuals: true
	}
});

MemberSchema.statics.fillables = [
	'firstName',
	'lastName'
];


MemberSchema.virtual('auth', {
	ref: 'Auth',
	localField: '_id',
	justOne: true,
	foreignField: '_id',
	options: {match: {deleted: false}}
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
 * @typedef MemberSchema
 */
export default mongoose.model('Member', MemberSchema);
