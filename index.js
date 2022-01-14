const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let ejs = require('ejs')
let fs = require('fs')
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
const axios = require('axios').default;
const { exec } = require("child_process");

const server = http.createServer((req, res, next) => {
  //replace stackfame.com with your doamin name
  res.writeHead(302, {'Location' : 'http://www.visionly.manuthecoder.ml'});
  res.end();
});


function _generateId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


const sessionMiddleware = session({
  genid: function(req) {
    return _generateId(400) // use UUIDs for session IDs
  },
  secret: _generateId(400)
})
app.use(sessionMiddleware);



// app.get('/', (req, res) => {
//   res.send("");
// });


app.set('view engine', 'ejs');

app.get('/login', function(req, res) {
	if(req.session.name) {res.redirect("/app")}
  res.render('index', {
  });
});


app.get('/', function(req, res) {
	if(req.session.name) {res.redirect("/app")}
  res.render('home', {
  });
});

app.get('/app', function(req, res) {
  res.render('app', {
		user: req.session
  });
});
app.use(express.static("views"))


app.get('/auth', function(req, res) {
  var token = req.query.token;
	exec(`curl --location --request POST 'https://api.smartlist.ga/v1/oauth/credentials?token=${token}' \
--header 'Authorization: Bearer ${process.env.SmartlistOauthToken}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
		let user = JSON.parse(stdout);
    console.log(user);
		if(user.email === null) {res.send("Invalid token");return;}
		req.session.name = user.name;
		req.session.email = user.email;
		req.session._id = user.id;
		req.session.avatar = user.user_avatar;
		req.session.email = user.email;
		res.redirect("./app");
})

	
});


// register middleware in Express
app.use(sessionMiddleware);
// register middleware in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
  // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
  // connections, as 'socket.request.res' will be undefined in that case
});

io.on('connection', (socket) => {
	socket.on("*", () => {
    if (!socket.request.session.name) {
      console.log("Invalid session!");
      socket.disconnect();
    }
  });
  if (socket.request.session && socket.request.session.name) {
  const session = socket.request.session;
	socket.on("fetch_data", data => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data...")
			res = JSON.parse(res.toString());
			socket.emit('resolve_data', res[socket.request.session._id]);
		});
	});



	socket.on("addVision", (id, data) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());
			data[0] = _generateId(10),
			res[socket.request.session._id].projects[id].visions.push(data)
			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
					
				}
			});
			socket.emit('addVision', id, data);
		});
	});


	socket.on("addProject", (data) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());
			data.visions = [],
			res[socket.request.session._id].projects.push(data)
			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
				}
			});
			socket.emit('addProject', data);
		});
	});


	socket.on("deleteVision", (pr, id) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());

			res[socket.request.session._id].projects[pr].visions[id] = undefined;

			res[socket.request.session._id].projects[pr].visions = res[socket.request.session._id].projects[pr].visions.filter(n => n);
			
			console.log(res);
			// return;


			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
					
				}
			});
			socket.emit('deleteVision', pr, id);
		});
	});



	socket.on("deleteProject", (pr, id) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());

			res[socket.request.session._id].projects[pr] = undefined;

			res[socket.request.session._id].projects = res[socket.request.session._id].projects.filter(n => n);
			
			console.log(res);


			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
					
				}
			});
			socket.emit('deleteProject', id);
		});
	});


	socket.on("updateVision", (pr, id, key, value) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());

			res[socket.request.session._id].projects[pr].visions[id][key] = value;
			
			console.log(res);


			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
					
				}
			});
			socket.emit('deleteVision', pr, id, key, value);
		});
	});

	socket.on("updateSettings", (pr, data) => {
		fs.readFile('./db.json', function (err, res) {
			if (err) throw err;
			console.log("fetched data....")
			res = JSON.parse(res.toString());
			Object.keys(data).forEach(key => {
				res[socket.request.session._id].projects[pr][key] = data[key]
			})
			
			console.log(res);


			fs.writeFile("./db.json", JSON.stringify(res,null,'\t'), (err) => {
				if (err) console.log(err);
				else {
					console.log("File written successfully\n");
					
				}
			});
			socket.emit('updateSettings', pr, data);
		});
	});



	socket.on("fetch_sessinfo", data => {
			socket.emit('resolve_sessinfo', socket.request.session);
	})
	} else {
    socket.emit("retry", true);
  }
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});