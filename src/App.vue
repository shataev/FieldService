<template>
    <div id="app">
        <h1 class="table-header">Операции на поле 112</h1>
        <operation-list-container></operation-list-container>
    </div>
</template>

<script>
	import OperationListContainer from "./components/OperationListContainer.vue"

	export default {
		name: 'app',
		components: {
			'operation-list-container': OperationListContainer
		}
	}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 880px;
        min-height: calc(100vh - 93px);;
        margin: 0 auto;
        padding: 10px 30px;
        background: #fff;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    }

    .table-header {
        font-size: 25px;
        text-align: left;
        margin-bottom: 25px;
    }
</style>
