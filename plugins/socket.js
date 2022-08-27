import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
const PORT =  process.env.PORT || 3005

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: PORT,
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
