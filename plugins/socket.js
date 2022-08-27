import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
const PORT =  process.env.PORT || 'http://localhost:3025'

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      //connection: 'http://localhost:3025',
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
