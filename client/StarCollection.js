/*
 * Temporary API test
 */
module.exports = Backbone.Collection.extend({
	url: '/star-data',

	initialize: function () {
		this.on('sync', function () {
			// debug
			console.log('Hello, ' + this.at(0).get('ProperName')); // prints 'Hello, Sol'
		});
	}
});
