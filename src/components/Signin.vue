<template>
  <div class="sign-in">
      <p>Let's create a new account!</p>
        <input type="text" ref="name" v-model="user.name" placeholder="Full Name"><br>
        <input type="password" v-model="user.password1" placeholder="Password"><br>
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        <input type="text" ref="url" v-model="user.bday" placeholder="Birthday"><br>
        <input type="text" ref="phone" v-model="user.facebook" placeholder="Facebook"><br>
        <input type="text" ref="email" v-model="user.email" placeholder="Email"><br>

        <button  @click="validateBeforeSubmit">Sign Up</button>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'

var md5 = require('md5');
let usersRef = db.ref('users');

export default {
  name: 'signIn',
  data() {
      return {
          user: {
              name: '',
              email: '',
              password1: '',
              password2: '',
              bday: '',
              facebook: ''
          }
      }
  },    
  methods: {
      validateBeforeSubmit() {
          if (this.user.email && (this.user.password1 === this.user.password2) && this.user.bday && this.user.name && this.user.facebook) {
             if(this.ValidDate()){
                 if(this.ValidURL()){
                    this.signup();
                 }else{
                     alert('URL Valid !!')
                     this.$refs.facebook.focus();
                     return;
                 }

             }else{
                 alert('Date Valid !!')
                 this.$refs.bday.focus();
                 return;
             }
          } else {
              if(!this.user.name) {
                  alert('Name cannot be empty');
                  this.$refs.name.focus();
                  return;
              }
              if(!this.user.email) {
                  alert('Email cannot be empty');
                  this.$refs.email.focus();
                  return;
              }
              if(this.user.password1 != this.user.password2) {
                  alert('Password mismatch');
                  this.$refs.password2.focus();
                  return;
              }
              if(!this.user.bday) {
                  alert('Brithday cannot be empty');
                  this.$refs.bday.focus();
                  return;
              }
              if(!this.user.facebook) {
                  alert('facebook cannot be empty');
                  this.$refs.facebook.focus();
                  return;
              }

          }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    this.addUserInfo();
                    this.$router.push({ name: 'Hello'});
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
      },
      addUserInfo() {
          var newUser = {
              name: this.user.name,
              email: this.user.email,
              facebook: this.user.facebook,
              bday: this.user.bday
          }

          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('users/'+ uid).set(newUser);

      },
      ValidURL() {
          var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          var regex = new RegExp(expression);
          if(!this.user.facebook.match(regex)) { 
              return false;
        }
        else {
            return true;
        }
    },
    ValidDate() {
        var expression = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; 
        var regex = new RegExp(expression);

        if(!this.user.bday.match(regex)) {
            return false;
        }
        else {
            return true;
        }
    }
    }
}
</script>

<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input {
        margin: 5px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>

