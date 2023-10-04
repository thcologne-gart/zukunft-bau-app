<template>
    <div>
        <p>
            Here we go again
        </p>
        <AmCharts />
        <PieChart />
        <LineChart />
    </div>
</template>

<script>
import AmCharts from "@/components/general/AmCharts.vue"
import PieChart from "@/components/general/charts/PieChart.vue"
import LineChart from "@/components/general/charts/LineChart.vue"

export default{
    components: {
        AmCharts, PieChart, LineChart
    }
}
</script>