const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {allowEIO3: true});


const posts = [
  {name:'John', text: 'Продумать вид проекта', id:'1', status: 'Выполнено', date : '2014-01-04'},
  {name:'Alan', text: 'продумать архитектуру проекта', id:'2', status: 'В работе', date : '2014-01-18'},
  {name:'Vasya', text: 'Настроить окружение', id:'3', status: 'Выполнено', date : '2014-01-10'},
  {name:'Ivan', text: 'Подготовить серверную часть', id:'4', status: 'В работе', date : '2014-02-15'},
  {name:'Sanguinius', text: 'Осуществить базовую верстку', id:'5', status: 'Выполнено', date : '2014-01-13'},
  {name:'Angron', text: 'Создать логику работы пользовательской части', id:'6', status: 'В работе', date : '2014-01-16'},
  {name:'Dorn', text: 'Протестировать работоспособность приложения', id:'7', status: 'Выполнено', date : '2014-01-25'},
  {name:'Korax', text: 'Пофиксить возможные баги', id:'8', status: 'В работе', date : '2014-08-28'},
  {name:'Lorgar', text: 'Оформить техническую документацию', id:'9', status: 'Выполнено', date : '2014-01-21'},
  {name:'Russ', text: 'Осуществить релиз проекта', id:'10', status: 'Выполнено', date : '2014-01-23'}
];

io.on('connection', socket => {
  console.log('start socket')
  socket.emit('loadPosts', posts)
  socket.on('createMessage', data => {
    for(let i = 0; i<posts.length;i++){
      if (data.id == posts[i].id){
        posts.splice(i,1)
      }
    }
    io.emit('loadPosts', posts)
  });
  socket.on('updatePost', data =>{
    for(let i = 0; i<posts.length;i++){
      if (data.id == posts[i].id){
        if (data.status==true){
          posts[i].status = 'Выполнено'
        } else {
          posts[i].status = 'В работе'
        }
        io.emit('updatePost', posts[i])
        io.emit('loadPosts', posts)
      }
    }
    console.log(data)
  })
  socket.on('createPost', data =>{
    console.log(data)
    posts.push(data)
    io.emit('loadPosts', posts)
  })
});

module.exports = {
  app,
  server
};
