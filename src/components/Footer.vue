<template>
	<footer class="l-footer" role="contentinfo">
		<div class="m-madeWithLove">
			Hecho con
			<span class="love">
				<svg class="heart" viewBox="0 0 32 29.6">
					<path
					d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
					c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
					/>
				</svg>
			</span>
			por <a class="loveName" target="_blank" alt="AndreusCafe" href="https://twitter.com/andreuscafe">@andreuscafe</a>
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'Footer',
		data () {
			return {
			}
		},
		methods: {
		},
		mounted: () => {
		}
	}
</script>

<style lang="scss" scoped>
/* Modules */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";
@import "../styles/modules/m-header.scss";
@import "../styles/modules/m-search.scss";
</style>