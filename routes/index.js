import express from "express";
import { neon } from '@neondatabase/serverless';
import jwt from "jsonwebtoken";
import validator from "validator";

const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');
var router = express.Router();

const CLAVE = 'aguanteelbulla';
const AUTH_COOKIE_NAME = 'triton';

const authMiddleware = (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  try{
    req.user = jwt.verify(token, CLAVE);
    next();
  }catch(e){
    res.redirect('/auth/login');
  }
}


router.get('/', async function(req, res, next) {
  const products = await sql("SELECT * FROM products ORDER BY id DESC LIMIT 3");
  
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

router.get('/cart', authMiddleware, async function(req, res, next) {

  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  req.user = jwt.verify(req.cookies[AUTH_COOKIE_NAME], CLAVE);

  if(req.query.id && req.query.quantity && validator.isNumeric(req.query.id) && validator.isNumeric(req.query.quantity)){
    try{
    const query = `INSERT INTO shoppingcart (user_id, product_id, quantity) values ($1, $2, $3)`;
    const resultado = await sql(query, [req.user.id, req.query.id, req.query.quantity]);
    }
    catch(e){
      console.log(e);
    }
  }

  const products = await sql("SELECT products.*, quantity FROM shoppingcart JOIN products ON products.id = shoppingcart.product_id");
  
  res.render('cart', { title: 'Carrito', isIndex: false, login: isLogged, products: products});
});


router.get('/historial', authMiddleware, async function(req, res, next) {
  let isLogged = false
  if(req.cookies[AUTH_COOKIE_NAME]){
    isLogged = true;
  }

  const orders = await sql(`SELECT * FROM history JOiN products ON products.id = history.id_product WHERE id_user = ${res.locals.usuario.id}`);
  const total = await sql(`SELECT SUM(products.price*history.quantity) FROM history join products on products.id = history.id_product WHERE history.id_user = ${res.locals.usuario.id}`);
  console.log(total[0]);

  res.render('historial', { title: 'Historial', isIndex: false, login: isLogged, orders: orders, total: total[0].sum});
});

export default router;
