/*
 * client/StarView.js
 */
module.exports = Backbone.View.extend({
	template: _.template($('#datatabletemplate').html()),

	events: {
		'click td, click th': 'highlight'
	},

	initialize: function () {},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
	},

	highlight: function () {
		this.$el.find('table').toggleClass('highlight');
	}
});

