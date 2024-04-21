import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Refer the high charts "https://github.com/highcharts/highcharts-react" for more information

const StackedBarCharts = (props) => {
  const config = {
    chart: {
      type: "bar",
    },
    title: {
      text: props.title,
    },
    xAxis: {
      categories: props.category,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Issues",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>{series.name}: {point.y}</b>",
    },
    plotOptions: {
      bar: {
        stacking: "normal", // Set stacking to "normal" for a stacked bar chart
      },
    },
    series: props.data,
  };
  return (
    <div>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={config}
        ></HighchartsReact>
      </div>
    </div>
  );
};

export default StackedBarCharts;