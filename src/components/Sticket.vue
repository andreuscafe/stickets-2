<template>
	<div
		class="m-sticket"
		draggable="true"
		@click.prevent.stop
		v-on:dragstart.stop="dragSticket"
		:data-key="sticket.key"
		:key="sticket.key"
		:class="{'m--masonry': masonryLayout}"
		@click.prevent.stop
	>
		<div class="sticketActions">
			<div class="action m--actionDelete"
				@click="deleteSticket(sticket.key, category.key)"
			>✕</div>
			<div class="action m--featuredIcon" 
				:class="{'m--featured': sticket.featured == undefined ? false : sticket.featured}"
				@click="toggleFeaturedSticket(sticket.key, category.key)"
			>!</div>
		</div>
		<div class="titleWrapper">
			<pre class="titleSizer">{{ sticket.title }}<textarea
				class="sticketTitle"
				v-model="sticket.title"
				spellcheck="false"
				v-on:keydown.ctrl.delete.exact.stop="deleteSticket(sticket.key, category.key)"
				v-on:keydown.meta.delete.exact.stop="deleteSticket(sticket.key, category.key)"
				v-on:keydown.shift.65.stop>
				</textarea>
			</pre>
		</div>
		<div class="descriptionWrapper">
			<pre class="descriptionSizer">{{ sticket.description }}<textarea
				class="sticketDescription"
				v-model="sticket.description"
				spellcheck="false"
				v-on:keydown.ctrl.delete.exact.stop="deleteSticket(sticket.key, category.key)"
				v-on:keydown.meta.delete.exact.stop="deleteSticket(sticket.key, category.key)"
				v-on:keydown.shift.65.stop>
				</textarea>
			</pre>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	name: 'Sticket',
	props: ['sticketData'], // WIP: Use this prop to do something awesome about users
	data () {
		return {
			form: {
				title: '',
				description: '',
			},
			isAdding: false,
			macyInstances: [],
			categoryWatchers: [],
			board: {
				categories: []
			}
		}
	},
	methods: {
	},
	computed: {
		...mapState([
			'searchField',
			'horizontalLayout',
			'masonryLayout',
			'loading',
			'get_debug'
		]),

		// horizontalLayout() {
		// 	return this.horizontalLayout
		// },

		formHasData() {
			return !!this.form.title || !!this.form.description;
		},

		sticketsFiltered() {
			var sf = this.searchField;
			return category => {
				return sf.length
					? category.stickets.filter(s => {
							return s.title
								.toLowerCase()
								.includes(
									sf.toLowerCase()
								) || 
								s.description
								.toLowerCase()
								.includes(
									sf.toLowerCase()
								);
					  })
					: category.stickets;
			};
		},
	},

	watch: { 
		// boardId: function(newVal, oldVal) { // watch it
		// 	console.log('Prop changed: ', newVal, ' | was: ', oldVal)
		// 	this.setBoard(newVal)
		// }
	}
}
</script>

<style lang="scss" scoped>
/* Base */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";
@import "../styles/base/b-helpers.scss";

/* Modules */
@import "../styles/modules/m-sticket.scss";
</style>