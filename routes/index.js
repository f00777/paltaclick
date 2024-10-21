import express from "express";
import { neon } from '@neondatabase/serverless';
import bcrypt from "bcryptjs";

const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const products = await sql("SELECT * FROM products ORDER BY id LIMIT 3");
  res.render('index', { title: 'PaltaClick', isIndex: true, products: products});
});

router.get('/nosotros', function(req, res, next) {
  res.render('nosotros', { title: 'Nosotros', isIndex: false});
});

router.get('/catalogo', async function(req, res, next) {
  const products = await sql("SELECT * FROM products");
  res.render('catalogo', { title: 'Productos', isIndex: false, products: products});
});
router.get('/producto/:id', async function(req, res, next) {
  const id = req.params.id;
  const product = await sql(`SELECT * FROM products WHERE id = ${id}`);
  res.render('producto', { title: 'Producto', isIndex: false, product: product[0]});
});

router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Contacto', isIndex: false});
});

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Carrito', isIndex: false});
});
router.get('/historial', function(req, res, next) {
  res.render('historial', { title: 'Historial', isIndex: false});
});

export default router;
