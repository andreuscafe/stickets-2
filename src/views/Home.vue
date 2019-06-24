<template>
	<div class="l-home m--horizontal">
		<Header :user="user" />
		<!-- <h1>Bienvenido, {{userName}}</h1>
		<img :src="user.photoURL" alt="">
		<button @click="logout">Log out</button> -->
		<div class="boardsWrapper">
			<BoardsList :boardsList="boardsList" />

			<div v-if="nonExistentBoard">El board "{{ this.$route.params.id }}" no existe</div>
			<div v-if="emptyState">Ningun board seleccionado</div>

			<Board v-if="hasSelectedBoard" :boardId="selectedBoard.id"/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app';
import { mapGetters, mapActions } from 'vuex'

// Components
import Header from '@/components/Header.vue'
import BoardsList from '@/components/BoardsList.vue'
import Board from '@/components/Board.vue'

export default {
	name: 'home',
	components: {
		Header,
		Board,
		BoardsList
	},
	data () {
		return {
			emptyState: false,
			nonExistentBoard: false
		}
	},
	methods: {
		...mapActions([
			'action_selectBoard',
			'action_deselectBoard'
		]),
		...mapGetters([
			'get_selectedBoard',
			'get_boards'
		]),

		setBoard () {
			this.action_deselectBoard();

			if (this.$route.params.id) {
				this.emptyState = false;
				let paramBoard = this.get_boards()(this.$route.params.id);

				if (paramBoard) {
					this.action_selectBoard(this.$route.params.id);
					this.nonExistentBoard = false;
				} else {
					this.nonExistentBoard = true;
				}
			} else {
				this.emptyState = true;
			}
		}
	},
	computed: {
		boardsList () {
			return this.get_boards()();
		},

		user () {
			let user = firebase.auth().currentUser;
			if (user) return user;
			return null;
		},

		userName () {
			return this.user.displayName.split(' ')[0];
		},

		selectedBoard () {
			return this.get_selectedBoard();
		},

		hasSelectedBoard () {
			return !!Object.keys(this.selectedBoard).length;
		}
	},
	mounted () {
		// get boardId from url; if there's no board specified, use the first one or create a new one

		this.setBoard();
	},
	watch: {
		'$route' (to, from) {
			console.log('Route changed to: ' + this.$route.params.id);

			this.setBoard();
		}
	}
}
</script>

<style lang="scss" scoped>
/* Base */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";
@import "../styles/base/b-base.scss";

/* Layouts */
@import "../styles/layout/l-home.scss";

/* Modules */
@import "../styles/modules/m-overlap.scss";
</style>
