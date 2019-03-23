import ChartPieComponent from './chart-pie-component';
import {colorList} from '../common';

class ChartController {
  constructor() {
    this.charts = {
      colors: {
        selector: `.statistic__colors`,
        title: `DONE BY: COLORS`,
      }
    };
  }

  initCharts(tasks) {
    this._initColorChart(tasks);
  }

  _initColorChart(tasks) {
    const [data, bgColors, labels] = getColorStats(tasks, colorList);

    this.charts.colors.data = data;
    this.charts.colors.labels = labels;
    this.charts.colors.bgColors = bgColors;

    this.charts.colors.chart = new ChartPieComponent(this.charts.colors);
  }

  updateCharts(tasks) {
    const [data, bgColors, labels] = getColorStats(tasks, colorList);
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
