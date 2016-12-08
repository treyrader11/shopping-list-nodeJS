
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); //parse payload into body. body object is not there without this piece of middleware

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  remove: function(id) { //items/2
    var removeId = false;
    var returnItem = {}; //just make it a blank obj to match our test case
    for(var i = 0; i < this.items.length; i++) {
      if(id == this.items[i].id) { //if 2 === items[2].id
        removeId = i; //2
      }
    }
    console.log("removeId is", removeId);
    if(removeId !== false) {
        returnItem = this.items[removeId]; //take a copy of returnItem before returning.
        this.items.splice(removeId, 1);
    }
    console.log("after deletion, the items are:", this.items);
    console.log("*************");
    return returnItem; //return back to our delete request handler so that it appears in our response.body
  },
  
  update: function(id, name) {
    this.items.forEach(function(item) {
        if(item.id === id) {
          item.name = name;
        }    
    });
    return name;
  }, 
  
  createUser: function(name) {
    var user = {username: name, items: this.items};
    this.users.push(user);
    this.setId += 1;
    console.log(this.users);
    return user;
  }
};


var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.users = [];
  storage.setId = 1;
  return storage;
};

var storage = createStorage(); //this gets exported

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
//storage.createUser('trey');
//storage.createUser('Jason');

var app = express();

app.use(express.static('public'));

app.get('/items', jsonParser, function(request, response) {
    response.json(storage.items);
    var body = request.body;
    //console.log(body.name);
});


//create a user in the url
app.get('/users/:username', function(request, response) {
    var username = request.params.username;
    response.json(storage.createUser(username));
    
});

app.get('/users', jsonParser, function(request, response) {
    response.json(storage.users);
    var body = request.body;
    var header = response.headers;
    var contentType = header;
    console.log("the headers:", contentType);
    
});

app.post('/items', jsonParser, function(request, response) { 
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name); //request payload is the body
    response.status(201).json(item);
});


app.delete('/items/:id', function(request, response, err) { //frontend gives the actual id for /:id
    var id = request.params.id;
    console.log('you clicked on item', '"'+id+'"');
    //var url = request.headers.host + request.url;
    if (id) {
      var returnItem = storage.remove(id); //returnItem gets converted into an object here
      return response.status(200).json(returnItem); //give us returnItem in our response.body
    } else {
        return response.status(404).json(err);
      }
});

//the client sets the number for id
app.put('/items/:id', jsonParser, function(request, response, err) {
  var id = request.params.id;
  //var payload = request.body;
  var firstItem = request.body.name;
  console.log(firstItem);
  if (id) {
    returnItem = storage.update(id);
    return response.status(200).json(id);
  } else {
        return response.status(404).json(err);
  }
});


app.listen(process.env.PORT || 8080, process.env.IP);

exports.app = app;
exports.storage = storage;