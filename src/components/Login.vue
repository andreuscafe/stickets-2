<template>
	<div class="m-login">
		<h2 class="loginTitle">{{ signUp ? 'Registrate' : 'Conectate'}}</h2>
		<div class="inputsWrapper">
			<input class="input" type="text" placeholder="usuario">
			<input class="input" type="password" placeholder="contraseña">
			<button class="loginButton" v-if="!signUp" @click="login">Conectate</button>
			<button class="loginButton" v-if="signUp">Registrate</button>
		</div>
		<router-link to="/signup" v-if="!signUp" class="action">¿No tenes una cuenta? Registrate</router-link>
		<router-link to="/login" v-if="signUp" class="action">¿Ya tenes una cuenta? Conectate</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: ['signUp'],
		data () {
			return {

			}
		},
		methods: {
			login() {
				this.$router.replace('home')
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* Modules */
	@import "../styles/modules/m-login.scss";
</style>