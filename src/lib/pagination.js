import queryString from 'query-string';
import Url from 'url-parse';
import config from 'config';

/**
 * The Pagination class
 */
class Pagination {
	/**
	 * @constructor
	 * @param {String} requestUrl This is a query object
	 */
	constructor(requestUrl) {
		// Default pagination object
		this.pagination = {totalCount: 0};
		// Get the full request url
		this.urlObj = new Url(`${config.get('app.apiHost')}${requestUrl}`);
		const urlObj = this.urlObj;
		const search = urlObj.query;
		// Parse the query string into object
		this.query = queryString.parse(search);
		// Grab the pagination object from the query object

		// The Limit(count to be returned)
		this._perPage =
			this.query && this.query.perPage
				? parseInt(this.query.perPage, 10)
				: config.get('api.pagination.itemsPerPage');
		this.pagination.perPage = this._perPage;

		// The amount to be skipped
		this._skip = 0;

		const perPage = this.perPage;
		this._queryData = {perPage: perPage.toString()};
		urlObj.set('query', this._queryData);

		// Current page number
		this._current =
			this.query && this.query.page ? parseInt(this.query.page, 10) : 1;
		const page = this._current;
		if (page && page > 1) {
			const urlObj = this.urlObj;
			const previous = page - 1;
			this._skip = previous * perPage;
			this.pagination.previous = previous;
			urlObj.set('query', {...this._queryData, page: previous.toString()});
			this.pagination.previousPage = urlObj.href;
		}
		this.pagination.current = page;
		urlObj.set('query', {...this._queryData, page: page.toString()});
		this.pagination.currentPage = urlObj.href;
	}

	/**
	 * @param {Number} page The next page number
	 * @return {void}
	 */
	set next(page) {
		const urlObj = this.urlObj;
		this.pagination.next = page;
		urlObj.set('query', {...this._queryData, page: page.toString()});
		this.pagination.nextPage = urlObj.href;
	}

	/**
	 * @return {Number}
	 */
	get skip() {
		return this._skip;
	}

	/**
	 * @param {Number} count The amount of items to skip
	 * @return {void}
	 */
	set skip(count) {
		this._skip = count;
	}

	/**
	 * @return {Number}
	 */
	get perPage() {
		return this._perPage;
	}

	/**
	 * @param {Number} count The amount of items to skip
	 * @return {void}
	 */
	set perPage(count) {
		this._perPage = count;
	}

	/**
	 * @return {Number}
	 */
	get current() {
		return this._current;
	}

	/**
	 * @return {int} total count
	 */
	get totalCount() {
		return this.pagination.totalCount;
	}

	/**
	 * @param {Number} count The total count of items
	 * @return {void}
	 */
	set totalCount(count) {
		this.pagination.totalCount = count;
	}

	/**
	 * @param {Number} count The total count of items
	 * @return {Boolean}
	 */
	morePages(count) {
		return count > this._perPage * this._current;
	}

	/**
	 * @return {Object}
	 */
	done() {
		return this.pagination;
	}
}

/**
 * @typedef Pagination
 */

export default Pagination;
