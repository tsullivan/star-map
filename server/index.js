var mongo = require('mongoskin');

// star data from https://github.com/astronexus/HYG-Database/blob/master/hygxyz.csv
var db = mongo.db("mongodb://localhost:27017/hiyagl", { native_parser: true }); // TODO: move to config

/*
 * Application routes
 */
module.exports = function (app) {
	/*
	 * GET home page.
	 */
	app.get('/', function(req, res){
		res.render('index', { title: 'Star Map' });
	});

	/*
	 * GET star data.
	 */
	app.get('/star-data', function(req, res){
		db.collection('hygxyz')
			.find({ 'Mag': { $lt: 2 }})
			.sort({Distance: 1})
			.limit(250)
			.toArray(function (err, items) {
				if (err) {
					res.json(500, { error: err.message || err });
					console.log(err);
				}
				else {
					res.json(items);
				}
		});
	});
}

db.close();
