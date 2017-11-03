<template>
<div alias = "center">
    <ul class="nav">
        <router-link to="/about" tag="li" activeclass="active" exact><a>About</a></router-link>
        <router-link to="/bookmarker" tag="li" activeclass="active"><a>Bookmarker</a></router-link>
        <router-link to="/hello" tag="li" activeclass="active"><a>Profile</a></router-link>  
        <li role="presentation"><a @click="logout">Sign out</a></li>      
        <!-- <router-link to="/user/10" tag="li" activeclass="active"><a>User10</a></router-link>
        <router-link to="/user/20" tag="li" activeclass="active"><a>User20</a></router-link> -->
    </ul>
</div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Header',
    methods: {
        logout() {
            firebase.auth().signOut().then( () => {
                this.$router.push( { name: 'Login'});
            })
        }
    },
}
</script>