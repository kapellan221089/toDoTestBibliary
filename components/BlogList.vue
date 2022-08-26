<template>
  <v-container class="main">
    <v-row class="name">
      <v-col cols="11" class="align-center">
        <div class="title pa-2">To do list</div>
      </v-col>
      <v-col class="justify-end align-center" cols="1">
        <div class="justify-end align-center">
          <v-btn
            class="addBtn "
            fab
            dark
            color="#D6DBEB"
            small
            justifu
            @click="showCreate"
          >
            <v-icon color="black">
              mdi-plus
            </v-icon>
          </v-btn>
          <CreatePost
            @close='close'
            v-show="createVisible"
          />
        </div>
      </v-col>
    </v-row >
    <v-row class="top">
      <v-col cols="9" class="align-center">
        <v-text-field 
          class="textField" 
          placeholder="Введите описание для поиска задачи" 
          prepend-icon="mdi-magnify" 
          append-icon="mdi-close"
          @click:append="clear"
          @input='filt' v-model="inpVal"
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="6" class="d-flex align-center">
            <p class="sort">
              Сортировать по:
            </p>
          </v-col>
          <v-col cols="6" class="d-flex align-start sortField">
            <p class="sort">
              <v-select class="selField"
                :items="items"
                v-model="select"
                @change="sort()"
              ></v-select>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="tableTop" cols="12">
      <v-col cols="6">
        <v-card-subtitle class="textField bord" style="margin-left:200px">
          Описание
        </v-card-subtitle>
      </v-col>
      <v-col cols="1" >
        <v-card-subtitle class="textField bord" style="margin-left:170px">
          Статус
        </v-card-subtitle>
      </v-col>
      <v-col cols="5" >
        <v-card-subtitle class="textField bord" style="margin-left:250px">
          Дата
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>
      <Post v-for="p in showDo" :key="p.text"
        @setCompl = "setCompl(p.id)"
        :name = "p.name"
        :text = "p.text"
        :date = "p.date"
        :status = "p.status === 'Выполнено' ? true : false"
        :id = "p.id" 
      />
    </v-row>
  </v-container>

</template>

<script>
import Post from '@/components/Post';
import CreatePost from '@/components/CreatePostForm';
import{mapState} from 'vuex';
import Vue2Filters from 'vue2-filters'


export default {
  methods:{
    showCreate() {
      this.createVisible = !this.createVisible;
    },
    close(){
      this.createVisible = false;
    },
    setCompl(data) {
      this.$store.commit('setCompl', data);
    },
    filt () {
      let filtList = this.filterBy(this.post, this.inpVal, 'text');
      this.$store.commit('filtersList', filtList);
    },
    sort () {
      this.$store.commit('sortList', this.select);
    },
    clear () {
      this.$store.commit('clearFilt');
      this.inpVal = '';
    }
  },
  mixins: [Vue2Filters.mixin],
  data () {
    return {
      createVisible: false,
      inpVal:'',
      items : ['Статус', 'Дата'],
      select:''
    };
  },
  computed: mapState(["showDo", "post"]),
  components: { Post, CreatePost}  
}
</script>

<style>
  .main {
    min-width: 1600px;
    height: 900px;
    margin-top: 104px;
    background: #FFFFFF;
  }
  .title {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 132%;
    color: #16191D;
  }
  .top {
    padding: 12px;
    padding-bottom: 24px;
    max-width: 1300px;
    max-height: 70px;
    margin-bottom: 10px;
    margin-left: 150px;
    margin-right: 150px;
  }
  .name {
    max-width: 1300px;
    margin-left: 150px;
    margin-right: 150px;
  }
  .textField {
    font-family: 'Vela Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 132%;
  }
  .sort {
    font-family: 'Vela Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 132%;
    text-align: end;
  }
  .selField {
    font-family: 'Vela Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 132%;
  }
  .bord {
    border-left: 1px solid #C4C4C4;
  }
  .tableTop {
    height: 58px;
    margin-bottom: 10px;
  }
</style>