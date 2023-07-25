const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express"); 

//body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "*");
   next();
});

/* sweager configuration */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API AUCTION SYSTEM',
    version: '1.0.0',
    description: 'This is a REST API application made with Express.',
    license: {
      name: 'URL API Backend',
      url: 'http://localhost:3001/api-docs/',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Development server',
    },
  ],
  components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          description: 'JWT authorization of an API',
          name: 'Authorization',
          in: 'header',
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }]
};

const options = {
  swaggerDefinition,
  explorer: false,
  swaggerOptions: {
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));
app.get('/', function(req, res){
	res.redirect('/api-docs');
});

/* routing */
const auth = require('./routes/route_auth');
const bidding = require('./routes/route_bidding');

app.use('/api', auth);
app.use('/api/bid', bidding);

app.get('*', function(req, res){
  res.send({ 
    "status": false,
    "responseCode" : 404,
    "message" :'Page not found!'
  })
});

app.post('*', function(req, res){
  res.send({ 
    "status": false,
    "responseCode" : 404,
    "message" :'Page not found'
  })
});

const port = process.env.APP_PORT;

app.listen(port, '0.0.0.0', function() {
  console.log(`Server Starts on ${port}`);
});
