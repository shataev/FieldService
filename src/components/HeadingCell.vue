<template>
    <th class="heading-row__cell"
        v-on:click="sort"
        v-bind:class="[classObject, fieldNameClass]">
        {{title}}
        <i class="sorting-icon">
            <svg width="16" height="16" class="octicon octicon-triangle-down" viewBox="0 0 12 16" version="1.1"
                 aria-hidden="true">
                <path fill-rule="evenodd" d="M0 5l6 6 6-6H0z"></path>
            </svg>
        </i>
    </th>
</template>

<script>
	import {mapState, mapActions} from "vuex";

	export default {
		name: "heading-cell",
		props: [
			'field',
			'title',
			'direction'
		],
		computed: {
			...mapState([
				'sorting'
			]),
			classObject: function () {
				return {
					active: this.sorting.field === this.field,
					'is-desc-sorting': this.sorting.field === this.field && this.sorting.direction === -1
				}
			}
		},
		data: function () {
			return {
				fieldNameClass: `field-${this.field}`
			}
		},
		methods: {
			...mapActions([
				'actSortBy'
			]),
			sort() {
				let params = {
					field: this.field,
					direction: this.direction
				};

				this.actSortBy(params);
			}
		}
	}
</script>

<style>
    .heading-row__cell {
        font-size: 11px;
        cursor: pointer;
    }

    .field-date {
        width: 15%;
    }

    .field-assessment {
        width: 20%;
    }

    .field-comment {
        width: 30%;
    }

    .sorting-icon {
        display: inline-block;
        fill: #A7A9AC;
    }

    .heading-row__cell.active .sorting-icon {
        fill: #3399FF;
    }

    .heading-row__cell.active.is-desc-sorting .sorting-icon {
        transform: rotateZ(180deg);
    }

    .field-comment .sorting-icon {
        display: none;
    }
</style>