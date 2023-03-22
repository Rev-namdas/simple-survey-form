import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart({
    labels = [],
    values = [],
    index,
    customDataLabels = false,
    totalResponse = 0
}) {
    let dataLabelsFormat = {};

    if (customDataLabels) {
        dataLabelsFormat = {
            enabled: true,
            formatter: function (_, { seriesIndex, w }) {
              const currentValue = w.config.series[seriesIndex]
              const percentage = ((100 / totalResponse) * currentValue).toFixed(1)
              return percentage + "%";
            },
        };
    } else {
        dataLabelsFormat = {
            enabled: true,
        };
    }

    const data = {
        series: values,
        options: {
            chart: {
                id: `chart-pie-${index}`,
                width: "50%",
                type: "pie",
                toolbar: {
                    show: true,
                },
            },
            labels: labels,
            dataLabels: dataLabelsFormat,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: "50%",
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };

    return (
        <>
            <ReactApexChart
                id="download"
                options={data.options}
                series={data.series}
                type="pie"
                width={"50%"}
                height={300}
            />
        </>
    );
}
