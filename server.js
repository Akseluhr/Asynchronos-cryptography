var express = require('express') // Popular web framework for Node.js
var bodyParser = require('body-parser') // Auto parses body of post and put requests
var morgan = require('morgan') // Logs HTTP requests to the console
var app = express()
app.use(express.static('static'));    // makes the files in /static folder available
app.use(bodyParser.urlencoded({ extended: true })) //
app.use(bodyParser.json());                        // Hooking on functions that will we called for each request
app.use(morgan('dev'));                            //

var data = require('./data');
var port = 13480;
// HTTP SERVER
app.listen(port, function () {
  console.log('Message app listening on port '+port+'!')
});

// HOME PAGE
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// MESSAGES ENDPOINT
// requests the body in order to fetch username and message text
// if either of these are empty, "bad request" is responded
// else, "created" is responded to the client
app.post('/messages', function(request, response) {
    var username = request.body.userName;
    var text = request.body.text;
    console.log(username, text);
    if(username === ""){
      response.sendStatus(400);
      console.log('No username');
    }
    else if(text === ""){
      response.sendStatus(400)
      console.log('No message');
    }
    else{
      data.addMessage(username,  text);
      response.sendStatus(201);
    } 
});

app.get('/messages', function(request, response){
  response.json(data.messages);
});

// requesting the URL in order to fetch the message ID
// if no ID is found, 404 not found is responded
// if an ID is found, the message exists and is fetched in order to be viewed on the page
app.get('/messages/:id', function(request, response){
  var id = request.params.id;
  if(!getMessageById(id)){ 
    response.sendStatus(404);
  }else
  response.json(data.getMessageById(id));
  response.sendStatus(200);
});
// the message ID is fetched after the delete button is pressed
// if the message is found in the message-array, the message is deleted
// otherwise, 404 not found is responded.
app.delete('/messages/:id', function(request, response){
  var id = request.params.id;
  if(getMessageById(id)){
    response.json(data.removeMessage(id));
  }else
    response.sendStatus(404);
});
