<template>
	<div class="m-boardsList">
		<div class="addBoardWrapper">
			<a class="m-boardItem m--add" @click="showNewBoardModal">+</a>
			<div class="addBoardInputWrapper" v-show="newBoardModalVisible">
				<input type="text" v-model="newBoardName" @keydown.enter="onAddBoard" class="newBoardInput js-newBoardInput">
				<button class="newBoardButton" v-on:click="onAddBoard"><span class="plusIcon">+</span></button>
			</div>
		</div>

		<div class="boardsButtonsWrapper">
			<router-link
				:to="'/boards/' + board.id"
				class="m-boardItem"
				v-for="board in boardsList"
				v-bind:key="board.id"
			>{{ board.id.toString().substr(0,2).toUpperCase() }}</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name: 'BoardsList',
	data () {
		return {
			newBoardModalVisible: false,
			newBoardName: ''
		}
	},
	props: ['boardsList'],
	methods: {
		...mapActions([
			'changeTitle',
			'action_createBoard',
			'action_selectBoard'
		]),

		showNewBoardModal () {
			this.newBoardModalVisible = !this.newBoardModalVisible;

			if (this.newBoardModalVisible) {
				
			}

			this.$nextTick().then(() => {
				document.querySelector(".js-newBoardInput").focus();
			});
		},

		onAddBoard () {
			let boardId = new Date().getTime().toString().substr(-5) + '-' + this.newBoardName.toLowerCase().split(' ').join('-');

			this.action_createBoard({
				boardId: boardId,
				boardTitle: this.newBoardName,
				boardCategories: [],
				successCallback: () => {
					this.$router.push({ name: 'board', params: { id: boardId } });
					this.action_selectBoard(boardId);
				}
			});
			
			this.newBoardModalVisible = false;
			this.newBoardName = '';
		}
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
/* Base */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";

/* Modules */
@import "../styles/modules/m-boardsList.scss";
@import "../styles/modules/m-boardItem.scss";
</style>
