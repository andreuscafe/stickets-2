<template>
	<div class="l-login">
		<Login></Login>
	</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
	name: 'loginView',
	components: {
		Login
	}
}
</script>

<style lang="scss" scoped>
	/* Layout */
	@import "../styles/layout/l-login.scss";
</style>