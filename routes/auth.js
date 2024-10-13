import express from "express";
var router = express.Router();

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro', isIndex: false});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión', isIndex: false});
});
router.get('/dashboard', function(req, res, next) {
  res.render('admin', { title: 'Admin', isIndex: false});
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
