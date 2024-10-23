import express from "express";
import { neon } from '@neondatabase/serverless';
import jwt from "jsonwebtoken";

const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');
var router = express.Router();

const CLAVE = 'aguanteelbulla';
const AUTH_COOKIE_NAME = 'triton';

router.get('/', async function(req, res, next) {
  const products = await sql("SELECT * FROM products ORDER BY id LIMIT 3");

  let isLogged = false

  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }


  res.render('index', { title: 'PaltaClick', isIndex: true, products: products, login: isLogged});
});

router.get('/nosotros', function(req, res, next) {

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('nosotros', { title: 'Nosotros', isIndex: false, login: isLogged});
});

router.get('/catalogo', async function(req, res, next) {
  const products = await sql("SELECT * FROM products");

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('catalogo', { title: 'Productos', isIndex: false, products: products, login: isLogged});
});


router.get('/producto/:id', async function(req, res, next) {
  const id = req.params.id;
  const product = await sql(`SELECT * FROM products WHERE id = ${id}`);

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('producto', { title: 'Producto', isIndex: false, product: product[0], login: isLogged});
});

router.get('/contacto', function(req, res, next) {

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('contacto', { title: 'Contacto', isIndex: false, login: isLogged});
});

router.get('/cart', function(req, res, next) {

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('cart', { title: 'Carrito', isIndex: false, login: isLogged});
});
router.get('/historial', function(req, res, next) {
  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  res.render('historial', { title: 'Historial', isIndex: false, login: isLogged});
});

export default router;
