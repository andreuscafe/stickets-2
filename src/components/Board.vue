<template>
	<section
		class="l-board"
		:class="{'m--horizontal': horizontalLayout}"
	>
		<div class="boardLoader" v-show="loadingBoard">Cargando tablero...</div>

		<div
			class="m-overlap m--noCategories"
			v-if="!this.board.categories.length"
		>
			<div class="contentWrapper">
				<div class="overlapContent">
					<div class="emoji">😅</div>
					<h3 class="overlapTitle">No hay grupos de stickets en este tablero...</h3>
					<div class="overlapDescription">
						Presioná el botón verde de abajo para crear el primero.
						<br>
						<br>
						O mejor; presioná <b>shift+A.</b>
					</div>
					<div class="overlapAction" @click="addCategory">
						¿shift+A? ¿Quién usaría esa combinación?
					</div>
					<div class="overlapAction m--deleteAction" @click="deleteBoard">
						¿O deseas eliminar este tablero?
					</div>
				</div>
			</div>
		</div>

		<div
			class="contentWrapper"
			:class="{'m--horizontal': horizontalLayout}"
			v-if="this.board.categories.length"
		>
			<div class="categoriesWrapper">
				<Group v-for="(group, index) in this.board.categories" :groupData="group" />
				<div
					class="m-category m--placeholder"
					@click.stop="addCategory"
					:class="{'m--horizontal': horizontalLayout}"
					v-show="!searchField"
					tabindex="0"
					@keydown.enter="addCategory"
					@keydown.space="addCategory"
				>
					<div class="addText">Nuevo grupo</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

// Components
import Group from '@/components/Group.vue'

export default {
	name: 'Board',
	props: ['boardId'], // WIP: Use this prop to do something awesome about users
	components: {
		Group
	},
	data () {
		return {
			form: {
				title: '',
				description: '',
			},
			loadingBoard: true,
			isAdding: false,
			macyInstances: [],
			categoryWatchers: [],
			board: {
				categories: []
			}
		}
	},
	methods: {
		...mapActions([
			'action_addCategory',
			'action_deleteBoard'
		]),
		...mapGetters(['get_boards']),

		setBoard (boardId) {
			// This is horrible, but I need to learn a better way to pass getter's params
			this.board = this.get_boards()(boardId);
			// setTimeout(() => {
			this.loadingBoard = false;
			// }, 1000)
		},

		addCategory() {
			const placeholders = [
				'Acá los stickets raros...',
				'Notas mentales...',
				'Necesito comprar...',
				'Por hacer...',
				'En progreso...',
				'Terminado...',
				'Ver luego...',
				'Notas de la reunión...',
				'Links interesantes...',
				'Películas a ver...',
				'Detalles oportunos...',
				'Recordar...',
				'/watch?v=dQw4w9WgXcQ'
			];

			this["action_addCategory"]({
				boardId: this.board.id,
				placeholder: placeholders[Math.floor(Math.random() * placeholders.length)],
				callback: ref => {
					// this.addCategoryWatcher(ref);

					// if (this.masonryLayout) {
					// 	this.$nextTick().then(() => {
					// 		this.initializeMacy(ref);
					// 		document.querySelector('div[data-key="'+ref.key+'"]').querySelector("textarea.name").focus();
					// 	});
					// }
				}
			});
		},

		deleteBoard () {
			let that = this;

			if (confirm('¿Seguro que deseas eliminar el board ' + this.board.title +'?')) {
				this.action_deleteBoard({boardId: this.boardId}).then(() => {
					that.$router.push({ name: 'home' })
				})
			}
		}
	},
	computed: {
		...mapState([
			'searchField',
			'horizontalLayout',
			'masonryLayout',
			'get_debug'
		]),

		// horizontalLayout() {
		// 	return this.horizontalLayout
		// },
	},
	mounted () {
		this.setBoard(this.boardId);
	},
	watch: { 
		boardId: function(newVal, oldVal) { // watch it
			this.loadingBoard = true;
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
			this.setBoard(newVal);
		}
	}
}
</script>

<style lang="scss" scoped>
/* Base */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";

/* Layout */
@import "../styles/layout/l-board.scss";
@import "../styles/layout/l-loader.scss";

/* Modules */
@import "../styles/modules/m-overlap.scss";
@import "../styles/modules/m-category.scss";
</style>