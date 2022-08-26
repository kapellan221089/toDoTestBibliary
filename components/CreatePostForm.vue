<template>
  <v-card flat >
    <div class="modal-mask ">
      <div class="modal-wrapper d-flex justify-center" >
      <v-row>
        <v-col cols="9">
        <v-card-subtitle class="textDate">
          <h3 class="createWin">Создать новую задачу</h3>
        </v-card-subtitle>
        </v-col>
        <v-col cols="3">
          <button 
          class="modalClose d-flex justify-center align-center"
          @click="$emit('close'); clearForm()"
          >
          <v-icon class="closeModalIcon" >
            mdi-close
          </v-icon>
          </button>
        </v-col>
      <v-row class="modalTextField align-center">
        <v-text-field
            placeholder="Введите описание"
            label="Описание"
            outlined
            v-model="form.descriptions"
            v-on:input="validDescriptionCheck"
            :rules="rules.descriptions"
        ></v-text-field>
        <div class="addBtn">
        <v-btn
          class="btn align-center"
          @click ="$emit('close');createPost(),clearForm()"
          :disabled="!formIsValid"
          >
            <p class="btnCreate align-center">Создать</p>
        </v-btn>
        </div>
      </v-row>
      </v-row>
      
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      date:'',
      rules: {
      descriptions: [val => val.length < 50 || 'Максимальная длина 50 символов', val => val.length > 1 || 'Минимальная длина 2 символа']
      },
      defaultForm: {
      autor:'',
      descriptions : ''
      },
      form:{
        autor:'',
        descriptions : ''
      },
      formIsValid: false,
    }
  },
  methods: {
    createPost(){
      let now = new Date();
      let t = now.toISOString().split('T')[0];
      this.$socket.emit("createPost", {
        text: this.form.descriptions,
        id: Math.round(Math.random()*Math.random()*576).toString(),
        status: 'В работе',
        date: t
      });
    },
    clearForm(){
      this.form.descriptions = '';
    },
    validDescriptionCheck() {
      if(this.form.descriptions.length < 2 || this.form.descriptions.length > 49){
        this.formIsValid=false;
        this.descriptionsValid=false;
      } else {
          this.descriptionsValid = true;
          this.formIsValid=true;
      }
    }
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  position: absolute;
  width: 400px;
  height: 281px;
  margin-left: 720px;
  margin-right: 600px;
  margin-bottom: 310px;
  margin-top: 309px;
  background: #FFFFFF;
  border: 1px solid #DDE2E4;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

.createWin {
  width: 236px;
  height: 24px;
  margin-left: 40px;
  margin-top: 40px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 132%;
  color: #16191D;
}
.modalClose {
  background: #314B99;
  border-radius: 5px;
  width: 22px;
  height: 22px;
  margin-top:40px;
  margin-right: 40px;
}
.modalTextField {
  max-width: 320px;
  margin-left: 50px;
  margin-bottom: 64px;
}
.form {
  background-color: #E8EAF6;
}
.addBtn {
  margin-left: 25%
}
.btnCreate {
  font-family: 'Vela Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 132%;
  color: #314B99;
  margin-top: 12px;
}

.btn {
  width: 153px;
  height: 48px;
}
</style>