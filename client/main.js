/*
 * Star Map
 * client/main.js
 */
var App = new (Backbone.View.extend({

	/*
	 * Organize objects
	 */
	Collections: {
		StarCollection: require('./StarCollection')
	},
	Models: {},
	Views: {},

	/*
	 * Run app
	 */
	initialize: function () {
		var stars = new this.Collections.StarCollection();
		stars.fetch();
	}
}))();
