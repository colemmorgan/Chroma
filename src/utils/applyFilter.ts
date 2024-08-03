import * as fabric from 'fabric';

type ColorBlindnessType = 'protanopia' | 'deuteranopia';

interface ColorMatrix {
  [key: string]: number[][];
}

const applyColorBlindnessFilter = (canvas: fabric.Canvas, colorBlindnessType: ColorBlindnessType) => {
    
  const matrices: ColorMatrix = {
    protanopia: [
      [0.567, 0.433, 0, 0, 0],
      [0.558, 0.442, 0, 0, 0],
      [0, 0.242, 0.758, 0, 0],
      [0, 0, 0, 1, 0]
    ],
    deuteranopia: [
      [0.625, 0.375, 0, 0, 0],
      [0.7, 0.3, 0, 0, 0],
      [0, 0.3, 0.7, 0, 0],
      [0, 0, 0, 1, 0]
    ],
  };

  const matrix = matrices[colorBlindnessType];
  if (matrix) {
    console.log(canvas)
    canvas.getObjects().forEach((obj) => {
    console.log(obj)
      if (obj instanceof Image) {
        obj.filters.push(new Image.filters.ColorMatrix({
          matrix: matrix.flat()
        }));
        obj.applyFilters();
      }
    });
    canvas.requestRenderAll();
  }
};

export default applyColorBlindnessFilter;