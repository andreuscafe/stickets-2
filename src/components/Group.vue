<template>
	<div
		class="m-category"
		v-show="sticketsFiltered(group).length || (!searchField && !group.stickets.length)"
		:class="{
			'js-masonry m--masonry': masonryLayout,
			'm--horizontal': horizontalLayout
		}"
		@click.prevent="focusPlaceholder(group.key)"
		@drop.prevent="dropSticket"
		@dragover.prevent="allowDrop"
		@dragenter.prevent.stop="dragEnter"
		@dragleave.prevent.stop="dragLeave"
		v-on:keydown.ctrl.shift.delete.prevent.stop="removeCategory(group.key)"
		v-on:keydown.meta.shift.delete.prevent.stop="removeCategory(group.key)"
		:data-key="group.key"
		:key="group.key"
	>
		<div class="categoryHeader">
			<h1 class="categoryName">
				<pre class="categoryNameSizer">{{ group.name }}<textarea class="name" v-model="group.name" spellcheck="false" v-bind:placeholder="group.placeholder" @click.prevent.stop v-on:keydown.shift.65.stop></textarea>
				</pre>
			</h1>
			<div class="categoryActions">
				<!-- <div class="textAction action" @click="renameCategory(group.key)">Renombrar</div> -->
				<span class="textAction action">({{group.stickets.length}})</span>
				<div class="iconAction action"
					@click.stop="clearCategoryStickets(group.key)"
					v-if="group.stickets.length > 0">
					↻
				</div>
				<div class="iconAction action" @click.stop="removeCategory(group.key)">✕</div>
			</div>
		</div>
		<!-- <div class="advise" v-if="searchField">
			{{ searchField ? 'Mostrando resultados de "'+searchField+'"' : '' }}
		</div> -->
		<div class="sticketsWrapper"
			:class="{'m--masonry': masonryLayout}"
			@click.prevent.stop
		>
			<Sticket v-for="(sticket, index) in sticketsFiltered(group)" :sticketData="sticket" />

			<!-- Placeholder for add new stickets -->
			<div
				class="m-sticket m--placeholder js-sticketPlaceholder"
				:class="{ 's--hasData': formHasData, 'm--masonry': masonryLayout}"
				v-show="!searchField"
				@click.prevent.stop
			>
				<input
					class="sticketTitle"
					placeholder="Agregar sticket"
					v-model="form.title"
					spellcheck="false"
					v-on:keydown.meta.13="addSticket(group.key)"
					v-on:keydown.ctrl.13="addSticket(group.key)"
					v-on:keydown.shift.65.stop
				/>
				<div class="textAreaWrapper">{{ form.description }}
					<textarea
					class="sticketDescription"
					placeholder="Escribí algo útil..."
					v-model="form.description"
					spellcheck="false"
					v-on:keydown.meta.13="addSticket(group.key)"
					v-on:keydown.ctrl.13="addSticket(group.key)"
					v-on:keydown.shift.65.stop
					></textarea>
				</div>
				<div
					class="sticketSubmit"
					@click="addSticket(group.key)"
					v-show="formHasData"
					@click.prevent.stop>＋</div>
			</div>

			<div
				class="noResults"
				v-if="!sticketsFiltered(group).length && searchField"
			>
				No hay stickets que contengan "{{
					searchField.toLowerCase()
				}}"
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

// Components
import Sticket from '@/components/Sticket.vue'

export default {
	name: 'Group',
	props: ['groupData'],
	components: {
		Sticket
	},
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
		...mapActions(['action_addCategory']),
		...mapGetters(['get_boards']),
	},
	computed: {
		...mapState([
			'searchField',
			'horizontalLayout',
			'masonryLayout',
			'loading',
			'get_debug'
		]),

		group() {
			return this.groupData;
		},

		formHasData() {
			return !!this.form.title || !!this.form.description;
		},

		sticketsFiltered() {
			var sf = this.searchField;
			return group => {
				return sf.length
					? group.stickets.filter(s => {
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
					: group.stickets;
			};
		},
	},

	watch: {
	}
}
</script>

<style lang="scss" scoped>
/* Base */
@import "../styles/base/b-variables.scss";
@import "../styles/base/b-mixins.scss";
@import "../styles/base/b-helpers.scss";

/* Modules */
@import "../styles/modules/m-category.scss";
@import "../styles/modules/m-sticket.scss";
</style>