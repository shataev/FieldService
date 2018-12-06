import {} from "bootstrap/dist/css/bootstrap.css";
import {} from "./css/styles.css";
import FieldService from './FieldService.js';
import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import locales from ".././locales/intterra-ru-RU.json";
import {OperationType, Assessment} from "./models/Operation";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = {
	state: {
		operations: [],
		sorting: {
			field: null,
			direction: 1
		},
		filterSettings: {
			type: 'all'
		},
		LOCALES: locales,
		OPERATION_TYPE: OperationType,
		ASSESSMENT: Assessment
	},
	actions: {
		actSortBy({commit}, paramObj) {
			if (paramObj.field == 'comment') { //Не сортируем по комментарию
				return;
			}

			commit('UPDATE_SORTING', paramObj);
			commit('SORT_OPERATION', paramObj);
		},
		actFilterBy({commit}, type) {
			commit('UPDATE_FILTER', type)
		}
	},
	mutations: {
		SORT_OPERATION(state, paramObj) {
			state.operations.sort(function(a, b){
				let sortValueA = a[paramObj.field];
				let	sortValueB = b[paramObj.field];

				if (paramObj.field == 'type') { //Название операции
					sortValueA = state.LOCALES[state.OPERATION_TYPE[sortValueA]];
					sortValueB = state.LOCALES[state.OPERATION_TYPE[sortValueB]];
				} else if (paramObj.field == 'date') { //Дата
					sortValueA = new Date(sortValueA.year, sortValueA.month, sortValueA.day);
					sortValueB = new Date(sortValueB.year, sortValueB.month, sortValueB.day);
				} else if (paramObj.field == 'assessment') { //Качество
					sortValueA = state.LOCALES[state.ASSESSMENT[sortValueA]] || 'Нет оценки';
					sortValueB = state.LOCALES[state.ASSESSMENT[sortValueB]] || 'Нет оценки';
				}

				if (sortValueA > sortValueB) {
					return state.sorting.direction;
				} else if (sortValueA < sortValueB) {
					return -state.sorting.direction;
				} else {
					return 0
				}
			});
		},
		UPDATE_SORTING(state, paramObj) {
			if (state.sorting.field === paramObj.field) {
				state.sorting.direction = -state.sorting.direction;
			} else {
				state.sorting.field = paramObj.field;
				state.sorting.direction = 1;
			}
		},
		UPDATE_FILTER(state, type) {
			if (state.filterSettings.type === type) {
				state.filterSettings.type = 'all';
			} else {
				state.filterSettings.type = type;
			}
		}
	},
	getters: {
		operations(state) {
			return state.operations;
		},
		doneOperations(state) {
			return state.operations.filter(operation => operation.assessment !== null)
		},
		plannedOperations(state) {
			return state.operations.filter(operation => operation.assessment === null)
		},
	},
	modules: {

	}
};

//Данные для таблицы операций
const fieldService = new FieldService();

const getData = async () => {
	const operations = await fieldService.getOperations();

	return operations;
};

getData().then(data => {
	store.state.operations = data;

	//Инициализация компонента
	new Vue({
		store: new Vuex.Store(store),
		render: h => h(App),
	}).$mount('#app');
});
//Данные для таблицы операций конец








