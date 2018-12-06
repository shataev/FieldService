<template>
    <div class="table-container">
        <operation-table-filter></operation-table-filter>
        <operation-table></operation-table>
    </div>
</template>

<script>
    export default {
    	name: "OperationListContainer",
        components: {
    		"operation-table-filter": () => import("@/components/Filter.vue"),
    		"operation-table": () => import("@/components/OperationTable.vue")
        },
        props: {

        },
        data: function() {
    		return {

            }
        }
    }
</script>

<styles>

</styles>