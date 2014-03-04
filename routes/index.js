var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/hiyagl", { native_parser: true });

// star data from https://github.com/astronexus/HYG-Database/blob/master/hygxyz.csv
db.bind('hygxyz');

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
		db.hygxyz.findOne(function(err, item) {
			if (err) {
				res.json(500, { error: err.message || err });
				console.log(err);
			}
			else {
				res.json(item);
			}
		});

	});
}

db.close();
