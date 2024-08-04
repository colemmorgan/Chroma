const enhanceEdges = (imageData: ImageData, edgeEnhancement: number): ImageData => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const kernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0, g = 0, b = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const ki = (ky + 1) * 3 + (kx + 1);
            r += data[idx] * kernel[ki];
            g += data[idx + 1] * kernel[ki];
            b += data[idx + 2] * kernel[ki];
          }
        }
        const idx = (y * width + x) * 4;
        data[idx] = Math.min(255, Math.max(0, data[idx] + r * edgeEnhancement));
        data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + g * edgeEnhancement));
        data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + b * edgeEnhancement));
      }
    }
    return imageData;
  };

export default enhanceEdges