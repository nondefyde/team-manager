import crypto from 'crypto';
import config from 'config';

/**
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const addHourToDate = (size) => {
	const date = new Date();
	let hours = date.getHours() + 1;
	date.setHours(hours);
	return date;
};

/**
 * Convert callback to promise;
 *  @param {String} string
 * @return {String} params date
 */
export const encrypt = (string) => {
	if (string === null || typeof string === 'undefined') {
		return string;
	}
	let key = config.get('app.superSecret');
	let cipher = crypto.createCipher('aes-256-cbc', key);
	return cipher.update(string, 'utf8', 'hex') + cipher.final('hex');
};

/**
 * Convert callback to promise;
 *  @param {String} encrypted
 * @return {String} params date
 */
export const decrypt = (encrypted) => {
	if (encrypted === null || typeof encrypted === 'undefined') {
		return encrypted;
	}
	let key = config.get('app.superSecret');
	let decipher = crypto.createDecipher('aes-256-cbc', key);
	try {
		const cip = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
		return cip;
	} catch (e) {
		return encrypted;
	}
};
