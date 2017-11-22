let content = '<h1>Hello World</h1>';
require('http')
	.createServer( (req, res) => { 
		res.end(`<html><body>${content}</body></html>`);
	})
	.listen( 8000, (err) => { 
		if (err) return console.log(":(", err);
		console.log('server\'s up!');
	});