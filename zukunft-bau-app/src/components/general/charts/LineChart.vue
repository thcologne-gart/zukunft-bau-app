
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
    /*
    data() {
    return {
      data: []
    };
  },
    
    methods: {
        async getData () {
            await this.monitoringStore.createLineChart(this.submodelElementPath, this.submodelRefIdShort, this.aasId)
            // const data = this.monitoringStore.roomTemperature
            // return data
        }
    },
    */
    props: {
        aasId: String,
        submodelRefIdShort: String,
        submodelElementPath: String
    },
    async mounted() {
        let data = await this.getTimeSeriesData()
        //let data = this.data
        let root = am5.Root.new(this.$refs.lineChart);

        let customTheme = am5themes_Animated.new(root);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX:true
            })
        );

        root.setThemes([customTheme]);

        //root.setThemes([
          //  am5themes_Animated.new(root)
        //]);

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        let date = new Date();
        date.setHours(0, 0, 0, 0);

        let tooltipTime = am5.Tooltip.new(root, {
            getFillFromSprite: false,
        });

        tooltipTime.get("background").setAll({
            fill: am5.color(0x3B5249)
        });

        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.2,
            baseInterval: {

                // Zu Minute setzen wenn Daten jede Minute angezeigt werden, Stunde wenn nur jede Stunde
                
                //timeUnit: "hour",
                timeUnit: 'minute',
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            //tooltip: am5.Tooltip.new(root, {})
            tooltip: tooltipTime
        }));

        let xRenderer = xAxis.get("renderer");
        xRenderer.labels.template.setAll({
            //fill: am5.color(0xFF0000),
            fontSize: "12px",
            fontFamily: "Montserrat"
        });

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                pan:"zoom"
            })  
        }));
        let yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({
            //fill: am5.color(0xFF0000),
            fontSize: "12px",
            fontFamily: "Montserrat"
        });

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
        }))
        //let color = am5.Color.fromHex(0xff0000)
        series.set("stroke", am5.color(0xFF4A1C));
        series.set("fill", am5.color(0x3B5249));
        series.data.setAll(data)
        series.appear(1000);
        chart.appear(1000, 100);
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
    methods: {
        async getTimeSeriesData () {
            let timeSeriesData = await this.monitoringStore.getTimeSeriesValues(this.submodelElementPath, this.submodelRefIdShort, this.aasId)
            //this.data = timeSeriesData
            return timeSeriesData
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