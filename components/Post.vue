<template>
  <v-container class="do">
    <v-col cols="12">
      <v-hover v-slot="{ hover }">
        <div class="todo"
          :elevation="hover ? 12 : 2"
        >
          <v-row>
            <v-col cols="1">
              <div class="check d-flex justify-center" v-bind:class="{checkComp : status, checkNotComp: !status}" @click="$emit('setCompl'), upd()">
                <v-icon class="checkBox" v-if="status" >
                  mdi-check
                </v-icon>
              </div>
            </v-col>
            <v-col cols="7">
              <v-card-subtitle class="text">
                {{text}}
              </v-card-subtitle>
            </v-col>
            <v-col cols="2">
              <v-card-subtitle class="text" v-bind:class="{ compl: status, work: !status }">
                {{status? 'Выполнено': 'В работе'}}
              </v-card-subtitle>
            </v-col>
            <v-col cols="2">
              <v-card-subtitle class="textDate">
                {{date}}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </div>
      </v-hover>
    </v-col>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    name: String,
    text: String,
    date: String,
    status: Boolean,
    id: String
  },
  data () {
    return {
      isModalVisible: false,
      post: {
        name:this.name,
        text: this.text,
        id: this.id
      }
    }; 
  },
  methods: {
    remove() {
      this.$socket.emit("createMessage", {
        text: this.text,
          id: this.id
        });
    },
    upd() {
      this.$socket.emit("updatePost", {
          status: !this.status,
          id: this.id
      });
    },
    showModal() {
      this.isModalVisible = true;
    },
    close(){
      this.isModalVisible = false;
    }
  }
}
</script>

<style>
  .ma-2 {
    z-index: 7;
  }
  .text {
    padding: 6px;
    font-family: 'Vela Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 132%;
  }
  .textDate {
    font-family: 'Vela Sans';
    font-style: normal;
    font-weight: 400;
    padding: 6px;
    font-size: 14px;
    line-height: 132%;
  }
  .do {
    border-bottom: 1px solid #EEEBE9;
    border-top: 1px solid #EEEBE9;
    padding: 0px;
    min-width: 1300px;
  }
  .do :hover {
    background: #ecf0f8;
  }
  .compl {
    color: #134EC1;
  }
  .work {
    color: #F89B11;
  }
  .check {
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    left: 0px;
    top: 0px;
    background: #FFFFFF;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(19, 78, 193, 0.15);
  }
  .checkComp {
    border: 1px solid #134EC1
  }
  .checkNotComp {
    border : 1px solid #16191D
  }
  .checkBox {
    border-radius: 100%;
    color:#134EC1
  }
</style>