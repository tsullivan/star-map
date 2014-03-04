var stars = new Backbone.Collection({});
stars.url = '/star-data';
stars.fetch();

stars.on('sync', function (collection) {
	console.log(collection.at(0).attributes);
});
