import express from "express";
import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://paltaclick_owner:CzyPKjdGI53A@ep-misty-bonus-a55bawz1.us-east-2.aws.neon.tech/paltaclick?sslmode=require');

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
