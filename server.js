
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
  remove: function(id) { //items/2
  

    var removeId = false;
    for(var i = 0; i < this.items.length; i++) {
    
      if(id == this.items[i].id) { //if 2 === items[2].id
        removeId = id;
        console.log("removeId is", removeId);
        if(removeId !== false) {
          this.items.splice(removeId, 1);
        }
      }
    }
    
    console.log("after deletion, the items are:", this.items);
    return removeId;
    
    
  
    
    
  },
  update: function(id, name) {
    this.items.forEach(function(item) {
        if(item.id === id) {
          item.name = name;
        }    
    });
    return name;
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


app.delete('/items/:id', function(request, response, err) { //frontend gives the actual id for /:id
    var id = request.params.id;
    console.log('you clicked on item', '"'+id+'"');
    //var url = request.headers.host + request.url;
    if (id) {
      id = storage.remove(id);
      return response.status(200).json(id);
    } else {
        return response.status(404).json(err);
      }
});

app.put('/items/:id', function(request, response, err) {
  var id = request.params.id;
  var payload = request.body;
  console.log(payload);
  if (id) {
          id = storage.update(id);
          return response.status(200).json(id);
        } else {
              return response.status(404).json(err);
          }
});


app.listen(process.env.PORT || 8080, process.env.IP);