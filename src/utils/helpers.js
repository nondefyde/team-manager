/**
 * Generate random subarray
 * @param {Array} array
 * @param {Number} size
 * @return {Array} subarray
 */
export const getRandomSubarray = (array, size) => {
	let index;
	let temp;
	let shuffled = array.slice(0);
	let i = array.length;
	let min = i - size;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
};

/**
 * Get Random number from a range of number
 * @param {Number} min
 * @param {Number} max
 * @return {Number} size of subarray
 */
export const getRandomArbitrary = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
