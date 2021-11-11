const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const {verifyUser, verifyAdmin} = require('./middlewares/auth');

dotenv.config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registro = require('./routes/registro');
const productos = require('./routes/productos');
const contacto = require('./routes/contacto');
const nosotros = require('./routes/nosotros');
const usuarios = require('./routes/usuarios');
const login = require('./routes/login');


//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN //
const adminIndex = require ('./routes/admin/index');
const adminProductos = require ('./routes/admin/productos');
const adminCategorias = require ('./routes/admin/categorias');
const adminUsuarios= require ('./routes/admin/usuarios');
const adminLogin = require('./routes/admin/login');
const adminEmpleados = require('./routes/admin/empleados');
//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN //

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'passwordSecreto',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))

//USUARIOS USUARIOS USUARIOS USUARIOS USUARIOS//
app.use('/usuarios' ,usuarios);
//USUARIOS USUARIOS USUARIOS USUARIOS USUARIOS//

//PARA TODOS PARA TODOS PARA TODOS PARA TODOS//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro', registro);
app.use('/productos', productos); 
app.use('/contacto', contacto); 
app.use('/nosotros', nosotros);
app.use('/login', login);
app.use('/admin', adminIndex);

//PARA TODOS PARA TODOS PARA TODOS PARA TODOS//


//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN //
app.use('/admin', adminIndex);
app.use('/admin/productos',  adminProductos);  
app.use('/admin/categorias', adminCategorias);  
app.use('/admin/usuarios', adminUsuarios);  
app.use('/admin/login',  adminLogin); 
app.use('/admin/empleados',   adminEmpleados);
//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
