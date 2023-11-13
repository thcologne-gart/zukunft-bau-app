<template>
    <div>
        <v-card
            color =success variant="outlined" class="pa-4 line-chart-card">
            <v-card-actions>
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="initChart('day')"
                >
                  Dieser Tag
                </v-btn>
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="initChart('week')"
                >
                  Diese Woche
                </v-btn>
              </v-card-actions>
            <v-card-text class="center-content">
              <div id="chartdiv"></div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useMonitoringStore } from "@/store/monitoring"

export default {
  name: "MyChart",
  data() {
    return {
      chart: null,
    };
  },
  props: {
      allElements: Array
    },
  mounted() {
    let presetTime = 'month'
    this.initChart(presetTime);
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  computed: {
    monitoringStore () {
      return useMonitoringStore()
    }
  },
  methods: {
    async initChart(time) {
      console.log(time)
      let elementsToDisplay = [];

      const semanticIdMappings = {
        'https://th-koeln.de/gart/vocabulary/MeasuredValueReturnTemperature/1/0': 0x372772,
        'https://th-koeln.de/gart/vocabulary/MeasuredValueFlowTemperature/1/0': 0xFF4A1C,
        // Add more mappings as needed
      };

      for (let komponente in this.allElements) {
        let component = this.allElements[komponente].elements;

        for (let elementInformation in component) {
          let element = component[elementInformation];
          let semanticId = element.semanticId;

          if (semanticIdMappings.hasOwnProperty(semanticId)) {
            console.log(semanticIdMappings[semanticId]);

            let aasId = this.allElements[komponente].anlagenInformation.aasId;
            let timeSeriesData = await this.monitoringStore.getTimeSeriesValues(element.idShort, element.submodelName, aasId);

            //data.push(timeSeriesData)
            //names.push(element.name)
            elementsToDisplay.push({
              'name': element.name,
              'data': timeSeriesData,
              'color': semanticIdMappings[semanticId]
            });
          }
        }
      }
      console.log(elementsToDisplay)
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          maxTooltipDistance: 0,
          pinchZoomX: true,
        })
      );

      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let value = 100;

      let tooltipTime = am5.Tooltip.new(root, {
          getFillFromSprite: false,
      });

      tooltipTime.get("background").setAll({
          fill: am5.color(0x3B5249)
      });
            
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          baseInterval: {
            timeUnit: "hour",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let xRenderer = xAxis.get("renderer");
        xRenderer.labels.template.setAll({
          //fill: am5.color(0xFF0000),
          fontSize: "12px",
          fontFamily: "Montserrat"
      });

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );
      let yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({
          //fill: am5.color(0xFF0000),
          fontSize: "12px",
          fontFamily: "Montserrat"
      });
      console.log(elementsToDisplay.length)
      for (var i = 0; i < elementsToDisplay.length; i++) {
        console.log(elementsToDisplay[i].name)
        let series = chart.series.push(
          am5xy.LineSeries.new(root, {
            //name: "Series " + i,
            name: elementsToDisplay[i].name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            legendValueText: "{valueY}",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{valueY}",
            }),
          })
        );

        date = new Date();
        date.setHours(0, 0, 0, 0);
        value = 0;

        //let data = generateDatas(100);
        let data = elementsToDisplay[i].data
        //console.log(data)
        //series.set("stroke", am5.color(0xFF4A1C));
        series.set("stroke", am5.color(elementsToDisplay[i].color))
        //series.set("fill", am5.color(0x3B5249)); -> Die ist für den tooltip, könnte auch noch angepasst werden
        series.data.setAll(data);

        series.appear();
      }

      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none",
      }));
      cursor.lineY.set("visible", false);

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal",
      }));
      /*
      chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical",
      }));
      */

      let legend = chart.rightAxesContainer.children.push(
        am5.Legend.new(root, {
          width: 200,
          paddingLeft: 15,
          height: am5.percent(100),
        })
      );

      legend.itemContainers.template.events.on("pointerover", function (e) {
        let itemContainer = e.target;
        let series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries) {
          if (chartSeries != series) {
            chartSeries.strokes.template.setAll({
              strokeOpacity: 0.15,
              stroke: color(0x000000),
            });
          } else {
            chartSeries.strokes.template.setAll({
              strokeWidth: 3,
            });
          }
        });
      });

      legend.itemContainers.template.events.on("pointerout", function (e) {
        let itemContainer = e.target;
        let series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 1,
            strokeWidth: 1,
            stroke: chartSeries.get("fill"),
          });
        });
      });

      legend.itemContainers.template.set("width", am5.p100);
      legend.valueLabels.template.setAll({
        width: am5.p100,
        textAlign: "right",
      });

      legend.data.setAll(chart.series.values);

      chart.appear(1000, 100);

      this.chart = chart;
    },
  },
};
</script>

<style>
/*
.line-chart-card {
  background-color: rgba(157,172,178, 0.);
}
*/
#chartdiv {
  width: 100%;
  height: 400px; /* Adjust the height as needed */
}
</style>