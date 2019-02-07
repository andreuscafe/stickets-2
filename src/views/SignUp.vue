<template>
	<div class="l-signUp">
		<div class="loginWrapper">
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
	@import "../styles/layout/l-signUp.scss";
</style>