<template>
  <div class="home">
    <h1>Estas conectado. Muy piola.</h1>
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';

export default {
  name: 'home',
  methods: {
  	logout() {
  		firebase.auth().signOut().then(() => this.$router.replace('login'))
  	}
  }
}
</script>
