const {app, server} = require('./app');
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config');
const morgan = require('morgan');
const PORT = process.env.PORT || 3005

const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

app.use(morgan('dev'));


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    server.listen(PORT, ()=>{
       console.log(`Server run in ${PORT} `);
    });
  });