/*
 * client/StarView.js
 */
module.exports = Backbone.View.extend({
	template: _.template($('#datatabletemplate').html()),

	initialize: function () {},

	render: function () {
		return this.template(this.model.toJSON());
	}
});

