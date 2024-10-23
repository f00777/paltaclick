import express from "express";
import { neon } from '@neondatabase/serverless';
import regiones from "../public/javascript/regionesChile.js"; 
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');
const CLAVE = 'aguanteelbulla';
const AUTH_COOKIE_NAME = 'triton';
let login = false;

var router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  try{
    req.user = jwt.verify(token, CLAVE);
    next();
  }catch(e){
    res.redirect('/');
  }
}

const is_auth = (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  try{
    req.user = jwt.verify(token, CLAVE);
    res.redirect('/catalogo');
  
  }catch(e){
    next();
  }
}



function isLogin(){
  const token = req.cookies[AUTH_COOKIE_NAME];
  if(token){
    req.user = jwt.verify(token, CLAVE);
    if(req.user){
      return true;
    }
  }
}

router.get('/register', is_auth ,function(req, res, next) {
  res.render('register', { title: 'Registro', isIndex: false, regiones: regiones.regions, login: login});
});

router.post('/register', async function(req, res, next){
  const data = req.body;
  if(data.name != '' && 
    data.lastname != '' &&
    data.address != '' &&
    (data.gender == 'male' || data.gender == 'female' || data.gender == 'other') &&
    data.zipcode != '' &&
    validator.isEmail(data.email) &&
    data.password.length > 8 &&
    data.password2 == data.password
  ){
    const name = data.name;
    const lastname = data.lastname;
    const money = 0;
    const is_admin = 0;
    const email = data.email;
    const password = bcrypt.hashSync(data.password, 5);
    const address = data.address;
    const gender = data.gender;
    const zipcode = parseInt(data.zipcode);
    const query = `INSERT INTO users (name, lastname, money, is_admin, email, password, address, gender, zipcode) VALUES ('${name}', '${lastname}', ${money}, '${is_admin}', '${email}', '${password}', '${address}', '${gender}', ${zipcode}) RETURNING id`;

    const result = await sql(query);
    const [{id}] = result;

    const fiveMinuteFromNowInSeconds = Math.floor(Date.now() / 1000) + 5 * 60;
    
    const token = jwt.sign({id, exp: fiveMinuteFromNowInSeconds}, CLAVE );

    res.cookie(AUTH_COOKIE_NAME, token, {maxAge: 60*5*1000});
    login = true;

    res.redirect('/auth/login');
  }
  else{
    res.redirect('/register?error=invalid');
  }
})

router.get('/login', is_auth, function(req, res, next) {
  const error = req.query.error;
  console.log(req.user);
  
  if(error == 'unknown'){
    res.render('login', { title: 'Iniciar Sesión', isIndex: false, login: login, error: error}); 
  }
  else{
    res.render('login', { title: 'Iniciar Sesión', isIndex: false, login: login}); 
  }
  
});

router.post('/login', async function(req, res, next) {
  const {email, password} = req.body;
  const query = 'SELECT id, password FROM users WHERE email = $1';
  const results = await sql(query, [email]);

  if(results.length === 0){
    res.redirect('/auth/login?error=unknown');
    return;
  }

  const id = results[0].id;
  const hash = results[0].password;

  if(bcrypt.compareSync(password, hash)){
    const fiveMinuteFromNowInSeconds = Math.floor(Date.now() / 1000) + 5 * 60;
    
    const token = jwt.sign({id, exp: fiveMinuteFromNowInSeconds}, CLAVE );

    res.cookie(AUTH_COOKIE_NAME, token, {maxAge: 60*5*1000});

    res.redirect('/catalogo');
    console.log(login);
    return;
  }

  res.redirect('/auth/login?error=unknown');
  
});


router.get('/dashboard', authMiddleware, async function(req, res, next) {
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  if(is_admin){
    res.render('admin', { title: 'Admin', isIndex: false});
  }
  else{
    res.redirect('/');
  }
});
router.get('/productos', authMiddleware, async function(req, res, next) {
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  if(is_admin){
    res.render('productos', { title: 'Productos', isIndex: false});
  }
  else{
    res.redirect('/');
  }
});
router.get('/crear', authMiddleware, async function(req, res, next) {
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  if(is_admin){
  res.render('crear', { title: 'Crear', isIndex: false});
  }
  else{
  res.redirect('/');
  }
});
router.get('/editar', authMiddleware , async function(req, res, next) {
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  if(is_admin){
    res.render('editar', { title: 'Editar', isIndex: false});
  }
  else{
    res.redirect('/');
  }
});
router.get('/pedidos', authMiddleware, async function(req, res, next) {
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  if(is_admin){
    res.render('pedidos', { title: 'Pedidos', isIndex: false});
  }
  else{
    res.redirect('/');
  }
});

router.get('/logout', function(req,res){
  res.clearCookie[AUTH_COOKIE_NAME];
  res.redirect('/');
})


export default router;
