<template>
    <table class="table operation-table">
        <thead class="thead-light">
        <tr class="operation-table__heading-row heading-row">
            <heading-cell field="date"
                          title="Дата">
            </heading-cell>
            <heading-cell field="type"
                          title="Операция">
            </heading-cell>
            <heading-cell field="assessment"
                          title="Качество">
            </heading-cell>
            <heading-cell field="comment"
                          title="Комментарий">
            </heading-cell>
        </tr>
        </thead>
        <tbody>
        <tr class="operation-table__operations operation-row"
            v-for="operation in operations"
            v-bind:key="operation.id">
            <td class="operation-row__date operation-row__cell">{{getOperationDate(operation.date)}}</td>
            <td class="operation-row__name operation-row__cell">{{getOperationNameByType(operation.type)}}</td>
            <td class="operation-row__quality quality-cell operation-row__cell">
                <span class="quality-cell__indicator" v-bind:class="qualityIndicatorClass(operation)"></span>
                <span class="quality-cell__text">
                        {{getQualityByAssessment(operation.assessment)}}
                    </span>
            </td>
            <td class="operation-row__comment operation-row__cell">{{operation.comment}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
	import {mapState, mapGetters} from "vuex";
	import {OperationType, Assessment} from '../models/Operation';
	import locales from "../../locales/intterra-ru-RU.json";

	const moment = require('moment');

	moment.locale('ru');

	export default {
		name: "operation-table",
		components: {
			'heading-cell': () => import("@/components/HeadingCell.vue")
		},
		props: {},
		computed: {
			...mapState([
				'filterSettings'
			]),
			...mapGetters({
				allOperations: 'operations'
			}),
			...mapGetters([
				'doneOperations',
				'plannedOperations'
			]),
			operations() {
				let operations;

				if (this.filterSettings.type === 'all') {
					operations = this.allOperations;
				} else if (this.filterSettings.type === 'done') {
					operations = this.doneOperations;
				} else if (this.filterSettings.type === 'planned') {
					operations = this.plannedOperations;
				}

				return operations;
			}
		},
		data: function () {
			return {}
		},
		methods: {
			getOperationDate(dateObj) {
				const dateArr = [dateObj.year, dateObj.month, dateObj.day];
				const dateStr = moment(dateArr).format('DD MMM YYYY').toUpperCase();

				return dateStr
			},
			getOperationNameByType(type) {
				return locales[OperationType[type]];
			},
			getQualityByAssessment(assessment) {
				return locales[Assessment[assessment]] || 'Нет оценки';
			},
			qualityIndicatorClass(operation) {
				if (operation.assessment !== null) {
					return `quality-indicator-${operation.assessment}`
				} else {
					return `no-assessment`
				}
			}
		}
	}
</script>

<style>
    .operation-table {
        text-align: left;
        table-layout: fixed;
    }

    .operation-row .operation-row__cell {
        font-size: 11px;
    }

    .operation-row__name.operation-row__cell {
        font-size: 13px;
    }

    .operation-row__cell.operation-row__date {
        text-transform: uppercase;
    }

    .quality-cell__indicator {
        display: inline-block;
        width: 20px;
        height: 10px;
        background: #EDEEEE;
        border-radius: 5px;
        margin-right: 10px;
    }

    .quality-indicator-0 {
        background: #66CC66;
    }

    .quality-indicator-1 {
        background: #FFE06D;
    }

    .quality-indicator-2 {
        background: #FF7360;
    }

    .no-assessment + span.quality-cell__text {
        color: #333333;
        opacity: 0.3;
    }
</style>