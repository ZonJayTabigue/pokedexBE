var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var pokemonRouter = require('./routes/pokemon');
var tpyeRouter = require('./routes/type');
var abilitiesRouter = require('./routes/ability');
var statsRouter = require('./routes/stat');

var authMiddleware  = require('./middleware/authMiddleware');

var app = express();

// Load Swagger document
const file = fs.readFileSync(path.join(__dirname, 'docs', 'swagger', 'swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to the database
const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB_NAME;
connectDB(dbName);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/pokemon', pokemonRouter);
app.use('/type', tpyeRouter);
app.use('/ability', abilitiesRouter);
app.use('/stat', statsRouter);

app.use( authMiddleware );
// pokemon protected routes 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal error occurred.',
    error: err.message
  });
});

module.exports = app;
