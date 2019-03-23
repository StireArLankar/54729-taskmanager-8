import ChartPieComponent from './chart-pie-component';
import {colorList} from '../common';

class ChartController {
  constructor(tasks) {
    this._tasks = tasks;

    this.charts = {
      colors: {
        selector: `.statistic__colors`,
        title: `DONE BY: COLORS`,
      }
    };
  }

  initCharts() {
    this._initColorChart();
  }

  _initColorChart() {
    const [data, bgColors, labels] = getColorStats(this._tasks, colorList);

    this.charts.colors.data = data;
    this.charts.colors.labels = labels;
    this.charts.colors.bgColors = bgColors;

    this.charts.colors.chart = new ChartPieComponent(this.charts.colors);
  }

  updateCharts() {
    const [data, bgColors, labels] = getColorStats(this._tasks, colorList);
    this.charts.colors.chart.updateChart(data, bgColors, labels);
  }
}

const getColorStats = (tasks, colorsList) => {
  const colorObj = colorsList.reduce((acc, color) => {
    acc[color] = 0;
    return acc;
  }, {});

  const colorStats = tasks.reduce((acc, task) => {
    acc[task.color]++;
    return acc;
  }, colorObj);

  const colors = [...Object.keys(colorStats)];
  const data = [...Object.values(colorStats)];
  const labels = colors.map((color) => {
    return `#${color}`;
  });

  return [data, colors, labels];
};

export default ChartController;
