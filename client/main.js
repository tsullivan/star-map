/*
 * Star Map
 * client/main.js
 */

var App = new (Backbone.View.extend({

	// Classes
	Stars: require('./StarCollection'),
	StarCollection: require('./StarCollectionView'),

	/*
	 * Run app
	 */
	initialize: function () {
		var stars = new this.Stars(),

			starsView = new this.StarCollection({
				collection: stars
			});

		this.timerStart = (new Date()).getTime();

		this.listenTo(stars, 'sync', function (options) {
			// calculate data load time
			var timeDelta = (new Date()).getTime() - this.timerStart;

			console.log('loaded in ' + timeDelta + 'ms');
		}.bind(this));

		stars.fetch();
	}
}))();
