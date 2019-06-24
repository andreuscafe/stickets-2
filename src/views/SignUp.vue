<template>
	<div class="l-login">
		<div class="loginWrapper">
			<img src="../assets/logo.png" alt="Stickets.io" class="logo">
			<h1 class="pageTitle">Stickets.io</h1>
			<Login isSignUp="true"></Login>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
	name: 'signUpView',
	components: {
		Login
	}
}
</script>

<style lang="scss" scoped>
	/* Layout */
	@import "../styles/layout/l-login.scss";
</style>