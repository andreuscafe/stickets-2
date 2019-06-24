<template>
	<header class="m-header m--horizontal" role="banner">
		<div class="contentWrapper m--fullWidth">
			<div class="headerWrapper">
				<router-link :to="'/home'" class="homeLink">
					<div class="appTitle">Stickets <span class="beta">beta</span></div>
				</router-link>

				<div class="headerData">
					<div class="boardTitle" v-if="hasSelectedBoard">
						<img src="~@/assets/icon-board.svg" :alt="selectedBoard.title" class="boardIcon">
						<h2 class="selectedBoardTitle">{{ selectedBoard.title }}</h2>
					</div>
					
					<div class="actionsWrapper">
						<div class="action m-search">
							<input
								type="text"
								class="searchInput js-search"
								placeholder="Buscar..."
								spellcheck="false"
								v-model="$store.state.searchField"
								v-on:keydown.shift.65.stop
							/>
						</div>
						<div class="action m--actionToggleLayout">?</div>
					</div>
					
					<div class="userWrapper h-whiteText" v-if="user">
						<!-- <div class="greetWrapper">Bienvenido, <span class="h-bold">{{userName}}</span></div> -->
						<div class="profileWrapper">
							<div class="profileImgWrapper" @click="logout">
								<img :src="user.photoURL" alt="userName" class="profile">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Header',
	props: ['user'], // WIP: Use this prop to do something awesome about users
	data () {
		return {
			store: {
				state: {
					horizontalLayout: true
				}
			}
		}
	},
	methods: {
		...mapGetters([
			'get_selectedBoard'
		]),

		// User and auth methods
		logout() {
			firebase.auth().signOut().then(() => this.$router.replace('login'))
		}
	},
	mounted: () => {
	},
	computed: {
		userName () {
			return this.user ? this.user.displayName.split(' ')[0] : 'Anónimo'
		},

		selectedBoard () {
			return this.get_selectedBoard();
		},

		hasSelectedBoard () {
			return !!Object.keys(this.selectedBoard).length;
		}
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