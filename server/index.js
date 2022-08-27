const {app, server} = require('./app');
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config');
const morgan = require('morgan');

const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

app.use(morgan('dev'));


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    server.listen(3025, ()=>{
       console.log(`Server run in `);
    });
  });