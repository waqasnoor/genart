const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 50;
const lineDiff = 200;
const generateQuardentPoints = (xMin, yMin, xMax, yMax) => {
  return { xMin, xMax, yMin, yMax };
};

const encodeCoords = (point, center) => {
  return Math.round((point - center) / 10);
};
const decodeCoords = (point, center) => {
  return Math.round((point + center) * 10);
};

const sketch = () => {
  return ({ context, width, height }) => {
    let centerX = width / 2;
    let centerY = height / 2;
    context.translate(centerX, centerY);
    context.rotate((3 * Math.PI) / 2);

    width = width - margin;

    height = height - margin;

    centerX = width / 2;
    centerY = height / 2;

    context.strokeStyle = "black";
    context.strokeRect(-centerX, -centerY, width, height);

    const q1 = generateQuardentPoints(0, 0, centerX, centerY);

    const q2 = generateQuardentPoints(-centerX, 0, 0, centerY);

    const q3 = generateQuardentPoints(-centerX, -centerY, 0, 0);
    const q4 = generateQuardentPoints(0, -centerY, centerX, 0);

    const plotPoints = (q, color) => {
      const { xMin, xMax, yMin, yMax } = q;
      for (let x = xMin; x <= xMax; x += lineDiff) {
        for (let y = yMin; y <= yMax; y += lineDiff) {
          context.beginPath();
          context.fillStyle = color;
          context.arc(x, y, 10, 0, Math.PI * 2, false);
          context.fill();
        }
      }
    };
    plotPoints(q4, "red");
    // context.beginPath();

    // context.fillStyle = "#fff";
    // context.font = "35px Arial";
    // context.fillText(
    //   `{${encodeCoords(centerX, centerX)},${encodeCoords(centerY, centerY)}}`,
    //   centerX,
    //   centerY
    // );

    const plotCoords = (minX, minY, maxX, maxY) => {
      for (let x = minX; x < maxX; x += lineDiff) {
        for (let y = minY; y < maxY; y += lineDiff) {
          context.beginPath();

          context.fillStyle = "#000";
          context.font = "35px Arial";
          context.fillText(`{${x / 100},${y / 100}}`, x, y);
        }
      }
    };

    plotCoords(-centerX, -centerY, centerX, centerY);

    // const plotPoints = (minX, minY, maxX, maxY) => {
    //   for (let x = minX; x <= maxX; x += lineDiff) {
    //     for (let y = minY; y <= maxY; y += lineDiff) {
    //       context.beginPath();

    //       context.fillStyle = "#fff";
    //       context.font = "35px Arial";
    //       context.fillText(
    //         `{${encodeCoords(x, centerX)},${encodeCoords(y, centerY)}}`,
    //         x,
    //         y
    //       );
    //     }
    //   }
    // };

    // plotPoints(margin, margin, width - margin, height - margin);
  };
};

canvasSketch(sketch, settings);
