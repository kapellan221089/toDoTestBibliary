import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: SocketIO('http://localhost:3025'),
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
