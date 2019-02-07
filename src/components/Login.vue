<template>
	<div class="m-login">
		<h2 class="loginTitle">{{ isSignUp ? 'Registrate' : 'Conectate'}}</h2>
		<div class="inputsWrapper">
			<input class="input" v-model="email" type="email" placeholder="usuario">
			<input class="input" v-model="password" type="password" placeholder="contraseña">
			<button class="loginButton" v-if="!isSignUp" @click="signIn">Conectate</button>
			<button class="loginButton" v-if="isSignUp" @click="signUp">Registrate</button>
		</div>
		<router-link to="/signup" v-if="!isSignUp" class="action">¿No tenes una cuenta? Registrate</router-link>
		<router-link to="/login" v-if="isSignUp" class="action">¿Ya tenes una cuenta? Conectate</router-link>
		<div class="error" v-show="errorMsg.length">{{errorMsg}}</div>
		<div class="congrats" v-show="congratsMsg.length">{{congratsMsg}}</div>
	</div>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'Login',
		props: ['isSignUp'],
		data () {
			return {
				email: '',
				password: '',
				errorMsg: '',
				congratsMsg: ''
			}
		},
		methods: {
			signUp() {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						this.errorMsg = "";
						this.congratsMsg = "¡Tu usuario fue creado exitosamente! Conectando y redirigiendo...";
						setTimeout(() => this.$router.replace('home'), 3000)
					},
					(err) => this.errorMsg = err.message
				)
			},

			signIn() {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						// this.congratsMsg = "¡Conectado! Redirigiendo al inicio...";
						// setTimeout(() => this.$router.replace('home'), 3000)
						this.errorMsg = "";
						this.$router.replace('home')
					},
					(err) => this.errorMsg = err.message
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* Modules */
	@import "../styles/modules/m-login.scss";
</style>