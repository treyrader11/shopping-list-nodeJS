
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  /*remove: function(id) { 
    console.log("the items are", this.items);
    var currentItem = this.items[id - 1];
    console.log("clicked on", currentItem);
    var currentIndexOfItem = this.items.indexOf(currentItem); //converts the item into its index value
    console.log("I want to remove item", currentItem.id, ", which is", currentItem.name, ", since it is what I just clicked");
    console.log(currentIndexOfItem);
    this.items.splice(currentIndexOfItem, 1);
    console.log("the items are now", this.items);
    console.log("*****************************************");
    return currentItem;
  },*/
  remove: function(id) {
    
    console.log("the items are", this.items);
    var item = this.items[id];
    var index = this.items.indexOf(item);//converts the item into its index value
    if(id === index) {
      console.log("clicked on", item.name);
      this.items.splice(index, 1);
      console.log("the items are now", this.items);
      console.log("****************************");
      return item;
    } else {
        item = this.items[id - 1];
        console.log("clicked on", item.name);
        index = this.items.indexOf(item);
        this.items.splice(index, 1);
        console.log("*****************************");
        return item;
      }
      
  },
  update: function(id) {
    var index = this.items.indexOf(id);
    this.items.splice(index, 1);
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
};

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');



var app = express();

app.use(express.static('public'));

app.get('/items', jsonParser, function(request, response) {
    response.json(storage.items);
    var body = request.body;
    //console.log(body.name);
});


app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
  //  console.log(request.body);
    response.status(201).json(item);
});


/*
Create an endpoint that responds to a DELETE request to /items/:id
If the item is succesfully deleted, the server should respond with a 200 OK status
If an incorrect ID is supplied, your endpoint should fail gracefully, returning a 404 Not Found status and a JSON error message.
*/


app.delete('/items/:id', function(request, response, err) {
    var id = request.params.id;
    var url = request.headers.host + request.url;
    console.log(url);
        if (id) {
          id = storage.remove(id);
          return response.status(200).json(id);
        } else {
              return response.status(404).json(err);
          }
});

app.put('/items/:id', function(request, response, err) {
  var id = request.params.id;
  if (id) {
          id = storage.update(id);
          return response.status(200).json(id);
        } else {
              return response.status(404).json(err);
          }
});


app.listen(process.env.PORT || 8080, process.env.IP);