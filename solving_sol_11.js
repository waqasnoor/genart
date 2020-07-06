const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 10;
const lineDiff = 50;
const radius = 5;
const generateQuardentPoints = (xMin, yMin, xMax, yMax) => {
  return { xMin, xMax, yMin, yMax };
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    width = width - margin;
    height = height - margin;

    const centerX = Math.round(width / 2);
    const centerY = Math.round(height / 2);

    const q1 = generateQuardentPoints(margin, margin, centerX, centerY);

    const q2 = generateQuardentPoints(centerX, margin, width, centerY);

    const q3 = generateQuardentPoints(margin, centerY, centerX, height);
    const q4 = generateQuardentPoints(centerX, centerY, width, height);

    const plotCenterLine = () => {
      context.beginPath();
      context.moveTo(margin, centerY);
      context.lineTo(width, centerY);
      context.strokeStyle = "red";
      context.lineWidth = 4;
      context.stroke();

      context.beginPath();
      context.moveTo(centerX, margin);
      context.lineTo(centerX, height);
      context.strokeStyle = "blue";
      context.lineWidth = 4;
      context.stroke();
    };
    plotCenterLine();

    const verticleLines = (quad, color) => {
      const { xMin, xMax, yMin, yMax } = quad;

      for (let i = xMin; i <= xMax; i += lineDiff) {
        console.log("making line");
        context.beginPath();
        context.moveTo(i, yMin);
        context.lineTo(i, yMax);
        context.strokeStyle = "orange";
        context.lineWidth = 4;
        context.stroke();
        // context.endPath();
      }
    };

    const horizontalLine = (quad, color) => {
      const { xMin, xMax, yMin, yMax } = quad;

      for (let i = yMin; i <= yMax; i += lineDiff) {
        console.log("making line");
        context.beginPath();
        context.moveTo(xMin, i);
        context.lineTo(xMax, i);
        context.strokeStyle = "orange";
        context.lineWidth = 4;
        // context.strokeStyle = "orange";
        context.stroke();
        // context.endPath();
      }
    };

    // verticleLines(q1);
    // verticleLines(q2);
    // verticleLines(q3);
    // verticleLines(q4);
    horizontalLine(q1);
    horizontalLine(q2);
    horizontalLine(q3);
    horizontalLine(q4);
    // verticleLines(q3);
    // horizontalLine(q4);
  };
};

canvasSketch(sketch, settings);
