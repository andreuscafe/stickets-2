import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'sticketsState',
  reducer: (state) => ({
	boards: state.boards,
	route: state.route
  }),
  storage: localStorage
})

const _debug = true; // Custom debug flag

Vue.use(Vuex)

export default new Vuex.Store({
	// Plugins
	plugins: [vuexPersist.plugin], // vuexPersist in order to save state to localStorage

	// State
	state: {
		debug: _debug,
		searchField: '',
		masonryLayout: true,
		horizontalLayout: true,
		loading: true,

		boards: localStorage.getItem('sticketsState')
			? JSON.parse(localStorage.getItem('sticketsState')).boards
			: [],
		selectedBoard: {},

		route: {
			boardId: ''
		}
	},

	getters: {
		get_debug: state => {
			return state.debug
		},

		get_boards: state => id => {
			if (id) {
				return state.boards.filter(b => {
					return b.id == id;
				})[0]
			} else {
				return state.boards
			}
		},

		get_categoryOnBoard: (state, getters) => (categoryKey, boardId) => {
			return getters.get_boards(boardId).categories.filter(c => c.key == categoryKey)[0]
		},

		get_selectedBoard: state => {
			return state.selectedBoard
		}
	},

	actions: {
		action_selectBoard: ({commit, state, dispatch}, boardId) => {
			let board = boardId
				? state.boards.filter(board => {return board.id == boardId})[0]
				: state.boards[0];

			if (board) {
				commit("SELECT_BOARD", board);
			} else {
				dispatch("action_createBoard", boardId);
			}
		},

		action_deselectBoard: ({commit, state, dispatch}) => {
 			if (state.selectedBoard) commit("DESELECT_BOARD");
		},

		action_getBoard: ({commit, state, dispatch}, boardId) => {
			return state.boards.filter(board => {return board.id == boardId})[0]
		},

		action_createBoard: ({commit, state, dispatch}, {boardId, boardTitle, boardCategories, successCallback, errorCallback}) => {
			const newBoardId = boardId ? boardId : new Date().getTime();
			const categories = boardCategories ? boardCategories : []; // CHECK THIS
			
			commit("CREATE_BOARD", {newBoardId, boardTitle, categories});

			successCallback ? successCallback() : dispatch("action_selectBoard", boardId);
		},

		action_deleteBoard: ({commit, state, dispatch}, {boardId}) => {
			commit("DELETE_BOARD", {boardId});
		},

		action_addCategory: ({commit, state, getters}, {boardId, placeholder, callback}) => {
			if (state.debug) console.log('addCategory triggered with placeholder: ' + placeholder);

			let newCategory = {
				key: new Date().getTime(),
				name: '',
				placeholder: placeholder,
				stickets: [],
			};

			commit("ADD_CATEGORY_TO_BOARD", {boardId, newCategory});

			if (callback) callback(getters.get_categoryOnBoard(newCategory.key, boardId));
		},
	},

	mutations: {
		SELECT_BOARD: (state, board) => {
			// Sets a reference to board property in order to 'select' and use it
			state.selectedBoard = board
		},

		DESELECT_BOARD: (state) => {
			state.selectedBoard = {}
		},

		ADD_CATEGORY_TO_BOARD: (state, {boardId, newCategory}) => {
			state.boards.filter((b) => b.id == boardId)[0].categories.push(newCategory)
		},

		CREATE_BOARD: (state, {newBoardId, boardTitle, categories}) => {
			state.boards.push({
				id: newBoardId,
				categories: categories,
				title: boardTitle
			});
		},

		DELETE_BOARD: (state, {boardId}) => {
			state.boards = state.boards.filter(board => board.id !== boardId)
		}
	}
})
