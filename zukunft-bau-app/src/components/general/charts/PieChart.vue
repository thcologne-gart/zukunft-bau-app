<template>
    <div>
        <div class="hello" ref="pieChart"></div>
        <p>Hi</p>
    </div>
  </template>

<script>
import * as am5 from '@amcharts/amcharts5';
//import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
//import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
    mounted() {
        let root = am5.Root.new(this.$refs.pieChart);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalHorizontal
            })
        );

        let data = [{
            country: "France",
            sales: 1
        },
        {
            country: "Germany",
            sales: 2
        }, {
            country: "Spain",
            sales: 3
        }];
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                categoryField: "country",
                valueField: "sales"
            })
        );
        series.data.setAll(data);
    }
}

</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>