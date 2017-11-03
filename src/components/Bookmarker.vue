<template>
  <div class="container" style="width:730px">
      <div class="header clearfix">
        <nav>

        </nav>
        <h3 class="text-muted">Bookmarker</h3>
      </div>

      <div class="jumbotron" align="center">
        <h2>Bookmark Your Favorite Sites</h2>
        <form id="myForm">
          <div class="form-group">
            <label>Site Name</label>
            <input type="text" class="form-control" placeholder="Website Name" v-model="bookmark.sName" >
          </div>
          <div class="form-group">
            <label>Site URL</label>
            <input type="text" class="form-control" placeholder="Website URL" v-model="bookmark.sUrl">
          </div>
          <button class="btn btn-primary" @click.prevent="submit">Submit</button>
        </form>
      </div>
      {{ fetchData() }}
      <div class="well" v-for="b in bookmarks" :key="b.sName">
        <h3>
          {{ b.sName }} <a class="btn btn-default" target="_blank" v-bind:href="'https://' + b.sUrl">Visit</a>
          <button class="btn btn-danger" @click.prevent="delData(b)">Delete</button>
          
        </h3>
      </div>
      <footer class="footer">
        <p>&copy; 2016 Bookmarker, Inc.</p>
      </footer>
    </div>
    
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'
    export default {
      data(){
        return{
          bookmark: {
            sName: '',
            sUrl: '',
            sKey:'',
            sUserId:''
          },
          bookmarks:[],
          resource: {}
        }
      },
      methods: {
                submit() {
                  if(!this.bookmark.sName || !this.bookmark.sUrl){
                    alert('Please fill in the form')
                  }
                  else{
                    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                    var regex = new RegExp(expression);

                    if(!this.bookmark.sUrl.match(regex)){
                      alert('Please use a valid URL');
                    }
                    else{
                       var user = firebase.auth().currentUser;
                       if(user){
                         this.bookmark.sUserId = user.uid;
                       }
                       this.$http.post('bookmarks.json', this.bookmark)
                      .then(response => { // define how to deal with the response
                          console.log(response);
                    }, error => { // define how to deal with error
                        console.log(error);
                    });
                    this.clearinput();
                    }
                  }
                   
                     
                },
                fetchData() {
                  var user = firebase.auth().currentUser;
                       if(user){
                         this.bookmark.sUserId = user.uid;
                       } 
                    this.$http.get('bookmarks.json')
                      .then(response => {
                        return response.json();           // return an a javascript object
                      })
                      .then(data => {                     // define what to do with the returned javascript object
                        const resultArray = [];
                        for (let key in data) {
                          let p = data[key];
                          p.sKey = key;
                          if(p.sUserId === this.bookmark.sUserId){
                            resultArray.push(p);
                          }
                        }
                        this.bookmarks = resultArray;         // trigger Vue.js to update the DOM
                      });     
                },
                 delData(bookmark) {
                //firebase.database().ref('bookmark/' +id).remove()
                  this.$http.delete('bookmarks/' + bookmark.sKey + '.json').then(response => { // define how to deal with the response
                    console.log(response);
                }, error => { // define how to deal with error
                    console.log(error);
                    });
                },
                clearinput(){
                  this.bookmark.sName ="";
                  this.bookmark.sUrl="";
                }
               }
              
      
    }

    </script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
