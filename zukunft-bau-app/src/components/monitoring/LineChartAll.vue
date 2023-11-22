<template>
    <div>
        <v-card
            color =success variant="outlined" class="pa-4 line-chart-card">
            <v-card-actions>
                <v-btn
                  class="max-3 mr-2" 
                  variant="outlined" 
                  color="warning"
                  @click="zoomXAxes('day')"
                >
                  Dieser Tag
                </v-btn>
                <v-btn
                  class="max-3 mr-2" 
                  variant="outlined" 
                  color="warning"
                  @click="zoomXAxes('week')"
                >
                  Diese Woche
                </v-btn>
                <v-btn
                  class="max-3 mr-2" 
                  variant="outlined" 
                  color="warning"
                  @click="zoomXAxes('month')"
                >
                  Dieser Monat
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
      xAxis: null,
      elementsToDisplay: [],
      data: null,
    };
  },
  props: {
      allElements: Array
    },
  mounted() {
    let presetTime = 'month'
    let chart = this.initChart(presetTime);
    console.log(chart)
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
    zoomXAxes(period) {

      // Hier ist der code, wie man die aktuelle Zeit minus eins bekommt
      
      /*
      const currentTime = new Date();
      console.log(currentTime)
      const updatedYear = currentTime.getFullYear();
      const updatedMonth = currentTime.getMonth();
      const updatedDay = currentTime.getDate();
      const updatedHours = currentTime.getHours();
      const updatedMinutes = currentTime.getMinutes();
      const updatedSeconds = currentTime.getSeconds();
      const updatedTime = new Date();
      updatedTime.setFullYear(updatedYear);
      updatedTime.setMonth(updatedMonth);
      updatedTime.setDate(updatedDay - 1);
      updatedTime.setHours(updatedHours, updatedMinutes, updatedSeconds);
      */

      // Zwei zeilen könenn dann weg
      let currentTime
      let updatedTime
      if (period === 'day') {
        // Funktioneirt mit echten Daten
        /*
        const updatedTime = new Date();
        updatedTime.setFullYear(updatedYear);
        updatedTime.setMonth(updatedMonth);
        updatedTime.setDate(updatedDay - 1);
        updatedTime.setHours(updatedHours, updatedMinutes, updatedSeconds);
        console.log(updatedTime)
        */

        // Hier als Ersatz, sodass es mit den daten funktioniert

        currentTime = new Date(2023, 8, 28)
        updatedTime = new Date(2023, 8, 29)
      } else if (period === 'week'){

        // Funktioniert mit echten Daten
        /*
        const updatedTime = new Date();
        updatedTime.setFullYear(updatedYear);
        updatedTime.setMonth(updatedMonth);
        updatedTime.setDate(updatedDay - 7);
        updatedTime.setHours(updatedHours, updatedMinutes, updatedSeconds);
        console.log(updatedTime)
        */

        currentTime = new Date(2023, 8, 21)
        updatedTime = new Date(2023, 8, 28)
      } else if (period === 'month'){

        // funktioniert mit echten daten
        /*
        const updatedTime = new Date();
        updatedTime.setFullYear(updatedYear);
        updatedTime.setMonth(updatedMonth-1);
        updatedTime.setDate(updatedDay);
        updatedTime.setHours(updatedHours, updatedMinutes, updatedSeconds);
        console.log(updatedTime)
        */
        currentTime = new Date(2023, 7, 28)
        updatedTime = new Date(2023, 8, 28)
      }


      if (this.chart && this.elementsToDisplay.length > 0) {

        const xAxis = this.chart.xAxes.getIndex(0);
        /*
        const startOfDay = new Date(specificDate);
        startOfDay.setHours(0, 0, 0, 0); // Set to the beginning of the day

        const endOfDay = new Date(specificDate);
        endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
        */

        for (let i = 0; i < this.elementsToDisplay.length; i++) {
          const series = this.chart.series.getIndex(i);
          //series.data.setAll(dayData);
          series.data.setAll(this.elementsToDisplay[i].data)
        }
        xAxis.zoomToDates(updatedTime, currentTime);
      }
    },

    async initChart(time) {
      console.log(time)
      let elementsToDisplay = [];

      const semanticIdMappings = {
        'https://th-koeln.de/gart/vocabulary/MeasuredValueReturnTemperature/1/0': 0x372772,
        'https://th-koeln.de/gart/vocabulary/MeasuredValueFlowTemperature/1/0': 0xFF4A1C,
        // Alles was hier hinzugefügt wird, wird in dem Chart visualisiert, wenn es
        // auch in this.allElements enthalten ist
        //'https://th-koeln.de/gart/vocabulary/AlarmMessage/1/0': 0xFF4A1C
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
      this.elementsToDisplay = elementsToDisplay
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
        this.data = data
        //console.log(data)
        //series.set("stroke", am5.color(0xFF4A1C));
        series.set("stroke", am5.color(elementsToDisplay[i].color))
        //series.set("fill", am5.color(0x3B5249)); -> Die ist für den tooltip, könnte auch noch angepasst werden
        series.data.setAll(data);

        console.log(xAxis)

        console.log(series)

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

      console.log(chart)
      this.xAxis = xAxis

      this.chart = chart;
      return chart
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