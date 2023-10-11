
<template>
    <div>
        <div class="lineChart" ref="lineChart"></div>
    </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useMonitoringStore } from "@/store/monitoring"

export default {
    methods: {
        async getData () {
            await this.monitoringStore.createLineChart(this.submodelElementPath, this.submodelRefIdShort, this.aasId)
            // const data = this.monitoringStore.roomTemperature
            // return data
        }
    },
    mounted() {
        let root = am5.Root.new(this.$refs.lineChart);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX:true
            })
        );

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        let date = new Date();
        date.setHours(0, 0, 0, 0);
        //let value = 100;
        /*
        function generateData() {
            value = Math.round((Math.random() * 10 - 5) + value);
            am5.time.add(date, "day", 1);
            return {
                date: date.getTime(),
                value: value
            };
        }
        
        function generateDatas(count) {
            let data = [];
            for (var i = 0; i < count; ++i) {
                data.push(generateData());
            }
            console.log(data)
            return data;
        }
        */

        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.2,
            baseInterval: {
                //timeUnit: "hour",
                timeUnit: 'minute',
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                pan:"zoom"
            })  
        }));

        let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));


        // Set data
        // let data = generateDatas(1200);
        //let data = this.timeSeries

        // let data = this.getData()
        // console.log(typeof data)

        let data = this.monitoringStore.roomTemperature
        console.log(data)
        /*
        let data = [
                {date: 1705186800000, value: 134},
                {date: 1705273200000, value: 129},
                {date: 1705359600000, value: 126},
                {date: 1705446000000, value: 123},
                {date: 1705532400000, value: 122}
        ]
        */
        series.data.setAll(data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    }
}

</script>

<style scoped>
.lineChart {
  width: 100%;
  height: 250px;
}
</style>