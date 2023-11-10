<template>
    <div>
        <v-card
            color ="#ff4a1c" variant="outlined" class="pa-4 line-chart-card">
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

export default {
  name: "MyChart",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
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

      function generateData() {
        value = Math.round(Math.random() * 10 - 4.2 + value);
        am5.time.add(date, "day", 1);
        return {
          date: date.getTime(),
          value: value,
        };
      }

      function generateDatas(count) {
        let data = [];
        for (var i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }

      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      for (var i = 0; i < 10; i++) {
        let series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: "Series " + i,
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

        let data = generateDatas(100);
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

      chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical",
      }));

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
.line-chart-card {
  background-color: #fcefef;
}
#chartdiv {
  width: 100%;
  height: 400px; /* Adjust the height as needed */
}
</style>