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


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro', isIndex: false, regiones: regiones.regions});
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

    res.redirect('/auth/login');
  }
  else{
    
    res.render('')
  }

  console.log(data)
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión', isIndex: false});
});
router.get('/dashboard', authMiddleware, async function(req, res, next) {
  console.log(req.user.id);
  const [{is_admin}] = await sql(`SELECT is_admin FROM users WHERE id = ${req.user.id}`);
  
  if(is_admin){
    res.render('admin', { title: 'Admin', isIndex: false});
  }
  else{
    res.redirect('/');
  }
  
});
router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Productos', isIndex: false});
});
router.get('/crear', function(req, res, next) {
  res.render('crear', { title: 'Crear', isIndex: false});
});
router.get('/editar', function(req, res, next) {
  res.render('editar', { title: 'Editar', isIndex: false});
});
router.get('/pedidos', function(req, res, next) {
  res.render('pedidos', { title: 'Pedidos', isIndex: false});
});

export default router;
