<template>
    <li class="filter-list__item filter-item nav-item"
        v-on:click="filterOperations"
        v-bind:class="classObject">
        <a class="nav-link" href="#">{{title}}</a>
    </li>
</template>

<script>
	import {mapState, mapActions} from "vuex";

	export default {
		name: "filter-item",
		props: [
			'type',
			'title'
		],
		computed: {
			...mapState([
				'filterSettings'
			]),
			classObject: function() {
				return {
					active: this.filterSettings.type === this.type
				}
			}
		},
		data: function() {
			return {
			}
		},
		methods: {
			...mapActions([
				'actFilterBy'
			]),
			filterOperations() {
				this.actFilterBy(this.type);
			}
		}
	}
</script>

<style>
    .filter-list__item {
        margin-right: 18px;
    }

    .filter-list__item .nav-link {
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.517647px;
        text-transform: uppercase;
        color: #333333;
        padding: 0;
    }

    .filter-list__item.active .nav-link,
    .filter-list__item.active .nav-link:hover,
    .filter-list__item .nav-link:hover {
        color: #3399FF;
    }
</style>