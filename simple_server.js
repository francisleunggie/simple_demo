const MongoClient = require('mongodb').MongoClient;
const mongo_url = 'mongodb://demo_user1:funnycat@localhost:27017/simple_demo';
let content = '<h1>hello world</h1>';
MongoClient.connect( mongo_url, (err, db) => {
	let cursor = db.collection('employee').find({});
	content += '<table border="1"><tr><th>Name</th><th>Department</th><th>title</th></tr>';
	cursor.each( (err, doc) => {
		if (doc != null) 
			content += '<tr><td>'+doc.usrName+'</td><td>'+doc.usrDept+'</td><td>'+doc.usrTitle+'</td></tr>';
		else content += '</table>';
	});
	db.close();
});				
require('http')
	.createServer( (req, res) => { 
		res.end(`<html><body>${content}</body></html>`);
	})
	.listen( 8000, (err) => { 
		if (err) return console.log(":(", err);
		console.log('server\'s up!');
	});