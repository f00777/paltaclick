import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {fileURLToPath} from "url";
import {engine} from "express-handlebars";
import jwt from "jsonwebtoken";
import { neon } from '@neondatabase/serverless';
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');

// view engine setup
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const CLAVE = 'aguanteelbulla';
const AUTH_COOKIE_NAME = 'triton';

app.use(async function(req, res, next){
  if(req.cookies[AUTH_COOKIE_NAME]){
    let user = jwt.verify(req.cookies[AUTH_COOKIE_NAME], CLAVE);
    user = await sql(`SELECT * FROM users WHERE id = ${user.id}`);
    user = user[0];
    res.locals.usuario = user;
    next();
  }
  else{
    next();
  }
})

app.use('/', indexRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 */
export default app;