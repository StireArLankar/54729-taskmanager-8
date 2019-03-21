import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class ChartPieComponent {
  constructor({title, selector, labels, data, bgColors}) {
    this._ref = document.querySelector(selector);
    this._chart = null;
    this.title = title;
    this.labels = labels;
    this.dataArray = data;
    this.bgColors = bgColors;
  }

  updateChart(data) {
    this.dataArray = data;
    if (this._chart) {
      this._chart.destroy();
    }
    const options = getChartOptions(this);
    this._chart = new Chart(this._ref, options);
  }
}

const getChartOptions = ({labels, dataArray, title, bgColors}) => {
  return {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels,
      datasets: [{
        data: dataArray,
        backgroundColor: bgColors,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: title,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  };
};

export default ChartPieComponent;
