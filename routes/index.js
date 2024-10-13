import express from "express";
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'PaltaClick', isIndex: true});
});

router.get('/nosotros', function(req, res, next) {
  res.render('nosotros', { title: 'Nosotros', isIndex: false});
});

router.get('/catalogo', function(req, res, next) {
  res.render('catalogo', { title: 'Productos', isIndex: false});
});
router.get('/producto', function(req, res, next) {
  res.render('producto', { title: 'Producto', isIndex: false});
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
