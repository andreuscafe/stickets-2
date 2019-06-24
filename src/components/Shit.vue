<template>
	<div>
		{{title}}
		<button @click.prevent="changeTitle('hola wea')"></button>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name: 'Shit',
	data () {
		return {}
	},
	methods: {
		...mapActions([
			'changeTitle'
		])
	},
	computed: {
		...mapGetters([
			'title',
			'titleLength'
		]),
	}
}
</script>

<style lang="scss" scoped>
/* 
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";
@import "../styles/base/b-base.scss";

@import "../styles/modules/m-overlap.scss";
*/
</style>
