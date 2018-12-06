<template>
    <ul class="filter-list nav">
        <filter-item
                type="planned"
                title="Запланированные операции">
        </filter-item>
        <filter-item
                type="done"
                title="Выполненные операции">
        </filter-item>
    </ul>
</template>

<script>
	export default {
		name: "operation-table-filter",
		components: {
			"filter-item": () => import("@/components/FilterItem.vue"),
		}
	}
</script>

<style>
    .filter-list {
        display: flex;
        list-style: none;
        margin: 0 0 24px 0;
        padding: 0;
    }
</style>