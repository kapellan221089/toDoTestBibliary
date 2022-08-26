let arraySort = require('array-sort');
export const state = () => ({
  user:{},
  post:[],
  showDo: [],
  users:[],
  currentPost:{},
  sortCurrArg: '',
  sortActive: false
});

export const mutations = {
  setUser(state, user){
    state.user = user;
  },
  filtersList (state, filtList){
    state.showDo = filtList;
  },
  setCompl (state, data) {
    let sendData = {};
    for (let i=0; i<state.showDo.length;i++){
      if(state.showDo[i].id === data) {
        if (state.showDo[i].status === 'Выполнено') {
          state.showDo[i].status = 'В работе';
          sendData = state.showDo[i];
        } else {
          state.showDo[i].status = 'Выполнено';
          sendData = state.showDo[i];
        }
      }
    }
 
  },
  sortList (state, sortArg){
    state.sortCurrArg = sortArg;
    state.sortActive = true;
    if (sortArg==='Дата') {
      sortArg = 'date';
    } else {
      sortArg = 'status';
    }
    state.sortArr = arraySort(state.showDo, sortArg);
    state.showDo = arraySort(state.showDo, sortArg);
  },
  clearFilt (state) {
    state.showDo = state.post;
  },
  setCurrPost(state,currPost){
    state.currentPost = currPost;
  },
  SOCKET_newMessage(state,data){
    state.post.push(data);
  },
  SOCKET_loadPosts(state,data){
    state.post = data;
    state.showDo = state.post;
    if (state.sortActive){
      state.showDo = state.sortArr;
    }
  },
  SOCKET_updatePost (state, post){
    for (let i=0; i<state.post.length;i++){
      if (state.post[i].id === post.id){
        state.post[i] = post;
      }
    }
  },
  SOCKET_updateUsers(state, users){
    state.users = users;
  }
};

