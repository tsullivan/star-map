/*
 * client/StarModel.js
 */
module.exports = Backbone.Model.extend({
	initialize: function () {
		// https://github.com/astronexus/HYG-Database
		this.set('LightYearsAway', (this.get('Distance') * 3.262).toFixed(3));
	}
});
