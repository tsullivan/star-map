var StarView = require('./StarView');
var StarModel = require('./StarModel');

/*
 * client/StarCollectionView.js
 * Collection view for star data table
 */
module.exports = Backbone.View.extend({
	el: '#datatable',

	initialize: function () {
		this.listenTo(this.collection, 'sync', function (models) {
			models.each(function (model) {

				var starView = new StarView({
					model: new StarModel(model.attributes)
				});

				// render the star view into an element and append the rendered
				// element to this view
				starView.render();
				this.$el.append(starView.$el);

			}.bind(this));
		});
	}
});
