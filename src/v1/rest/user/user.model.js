/**
 * User Schema
 */
import mongoose, {Schema} from 'mongoose';
import UserProcessor from './user.processor';
import UserValidation from './user.validation';
import AppSchema from '../_core/app.model';

const UserModel = new AppSchema({
	email: {
		type: String,
		lowercase: true,
		index: true
	},
	bvnVerified: {
		type: Boolean,
	},
	bvn: {
		type: Schema.Types.Mixed,
	},
	displayName: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	mobile: {
		type: String
	},
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	avatar: {
		type: String
	},
	address: {
		street: String,
		city: String,
		state: String,
		country: String
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	active: {
		type: Boolean,
		default: true
	},
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
		virtuals: true,
	}
});

UserModel.statics.fillables = [
	'firstName',
	'lastName',
	'displayName',
	'mobile',
	'gender',
	'avatar',
	'address'
];


UserModel.virtual('auth', {
	ref: 'Auth',
	localField: '_id',
	justOne: true,
	foreignField: '_id',
	options: { match: { deleted: false } },
});

/**
 * @return {Object} The validator object with the specified rules.
 */
UserModel.statics.getValidator = () => {
	return new UserValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
UserModel.statics.getProcessor = (model) => {
	return new UserProcessor(model);
};
/**
 * @typedef UserModel
 */
export default mongoose.model('User', UserModel);
