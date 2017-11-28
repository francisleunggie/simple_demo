const MongoClient = require('mongodb').MongoClient;
const mongo_url = 'mongodb://demo_user1:funnycat@localhost:27017/simple_demo';
let content = '<h1>hello world</h1>';
const refresh = (html, callback) => {
	MongoClient.connect( mongo_url, (err, db) => {
		if (err) return db.close();
		let cursor = db.collection('employee').find({});
		html += '<table border="1"><tr><th>Name</th><th>Department</th><th>title</th></tr>';
		cursor.each( (err, doc) => {
			if (doc != null) 
				html += `<tr><td>${doc.usrName}</td><td>${doc.usrDept}</td><td>${doc.usrTitle}</td></tr>`;
			else {
				html += '</table>';
				callback(html);
				db.close();
			}
		});
	});		
};		
require('http')
	.createServer( (req, res) => { 
		refresh( content, html => res.end(`<html><body>${html}</body></html>`) );
	})
	.listen( 8000, (err) => { 
		if (err) return console.log(":(", err);
		console.log('server\'s up!');
	});