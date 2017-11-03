<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>User information:</h2>
    <div v-if="user.photoURL">
    <p>Profile Photo:</p>
    <img :src="user.photoURL" style="height: 120px">
    </div>
    <br>
    <p>ID: {{ user.userId }}</p>
    <p v-if="user.name">Name: {{ user.name }}</p>
    <p>Brithday: {{ user.bday }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Facebook URL: {{ user.facebook }}</p>  
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'

var md5 = require('md5');

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Firebase Authentication tutorial',
      user: {
        photoURL: '',
        userId: '',
        name: '',
        email: '',
        facebook: '',
        bday: ''
      }
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then( () => {
        this.$router.push( { name: 'Login'});
      })
    }
  },
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.user.photoURL = user.photoURL;
      this.user.userId = user.uid;
      this.user.name = user.displayName;
      this.user.email = user.email;
      this.user.bday = user.bday;
      this.user.facebook = user.facebook;

      var uid = md5(user.email);
      console.log(uid);

      db.ref('users/' + uid).once('value').then(
        snapshot => {
          if (snapshot) {
            console.log(snapshot);
            this.user.name = snapshot.val().name;
            this.user.facebook = snapshot.val().facebook;
            this.user.bday = snapshot.val().bday;
          }
      });

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
