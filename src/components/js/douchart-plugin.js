export let plugin = {
  id: "douChart",
  beforeDatasetDraw: function (chart) {
    let ctx = chart.ctx;
    ctx.save();

    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
    const width = outerRadius - (innerRadius + 2);
    const angle = Math.PI / 180;

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = "#D1E5FF";
    ctx.arc(xCoor, yCoor, outerRadius - width / 1.8, 0, angle * 360, false);
    ctx.stroke();
  },

  beforeDraw: function (chart) {
    let conf = chart.config._config;
    let douHeight = conf.data.datasets[0].Height;
    let douColor = conf.data.datasets[0].backgroundColor[0];
    let douSmallText = conf.data.datasets[0].smallText;
    let douWidth = conf.data.datasets[0].Width;
    let width = chart.width,
      height = chart.height,
      ctx = chart.ctx;
    ctx.restore();
    let fontSize = (height / 105).toFixed(2);
    ctx.font = fontSize + "em Prompt";
    ctx.fillStyle = douColor;
    ctx.textBaseline = "middle";

    let txt = conf.data.datasets[0].data[0],
      total_emp = conf.data.datasets[0].total_employees;
    if (Math.round(width - ctx.measureText(txt).width) > 138) {
      douWidth = 1.55;
    }
    let txtX = Math.round((width - ctx.measureText(txt).width) / douWidth),
      txtY = height / douHeight;
    ctx.fillText(txt + "%", txtX, txtY);

    ctx.font = (height / 200).toFixed(2) + "em Prompt";
    ctx.fillStyle = "#1A3C54";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const smallTxtX = Math.round((width - ctx.measureText(txt).width) / 1.75);
    const smallTxtY = height / 1.58;
    if (douSmallText) {
      ctx.fillText(total_emp + " คน", smallTxtX, smallTxtY);
    }
    ctx.save();
  },
};
