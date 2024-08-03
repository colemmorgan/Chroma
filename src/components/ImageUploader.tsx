import React, { useState, useRef, useEffect } from 'react';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [colorMode, setColorMode] = useState('normal');
  const [strength, setStrength] = useState(1);
  const [edgeEnhancement, setEdgeEnhancement] = useState(0);
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (image) {
      applyColorAdjustment();
    }
  }, [image, colorMode, strength, edgeEnhancement]);

  const daltonize = (imageData, type) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let l = (17.8824 * data[i] + 43.5161 * data[i+1] + 4.11935 * data[i+2]) / 100;
      let m = (3.45565 * data[i] + 27.1554 * data[i+1] + 3.86714 * data[i+2]) / 100;
      let s = (0.0299566 * data[i] + 0.184309 * data[i+1] + 1.46709 * data[i+2]) / 100;
      
      let l2, m2, s2;
      if (type === 'protanopia') {
        l2 = 0.0 * l + 2.02344 * m + -2.52581 * s;
        m2 = 0.0 * l + 1.0 * m + 0.0 * s;
        s2 = 0.0 * l + 0.0 * m + 1.0 * s;
      } else if (type === 'deuteranopia') {
        l2 = 1.0 * l + 0.0 * m + 0.0 * s;
        m2 = 0.494207 * l + 0.0 * m + 1.24827 * s;
        s2 = 0.0 * l + 0.0 * m + 1.0 * s;
      } else if (type === 'tritanopia') {
        l2 = 1.0 * l + 0.0 * m + 0.0 * s;
        m2 = 0.0 * l + 1.0 * m + 0.0 * s;
        s2 = -0.395913 * l + 0.801109 * m + 0.0 * s;
      }
      
      let dl = l - l2;
      let dm = m - m2;
      let ds = s - s2;
      
      data[i] = data[i] + (0.0809444479 * dl + -0.130504409 * dm + 0.116721066 * ds) * 255;
      data[i+1] = data[i+1] + (-0.0102485335 * dl + 0.0540193266 * dm + -0.113614708 * ds) * 255;
      data[i+2] = data[i+2] + (-0.000365296938 * dl + -0.00412161469 * dm + 0.693511405 * ds) * 255;
    }
    return imageData;
  };

  const enhanceEdges = (imageData) => {
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

  const applyColorAdjustment = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const originalCanvas = originalCanvasRef.current;
    const originalCtx = originalCanvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      originalCanvas.width = img.width;
      originalCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalCtx.drawImage(img, 0, 0);
      
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const originalImageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);

      if (colorMode !== 'normal') {
        imageData = daltonize(imageData, colorMode);
      }

      imageData = enhanceEdges(imageData);

      const data = imageData.data;
      const originalData = originalImageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = originalData[i] * (1 - strength) + data[i] * strength;
        data[i + 1] = originalData[i + 1] * (1 - strength) + data[i + 1] * strength;
        data[i + 2] = originalData[i + 2] * (1 - strength) + data[i + 2] * strength;
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = image;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `adjusted-${colorMode}-image.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <select 
            value={colorMode} 
            onChange={(e) => setColorMode(e.target.value)}
          >
            <option value="normal">Normal Vision</option>
            <option value="protanopia">Adjust for Protanopia</option>
            <option value="deuteranopia">Adjust for Deuteranopia</option>
            <option value="tritanopia">Adjust for Tritanopia</option>
          </select>
          <div>
            <label>Adjustment Strength: </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={strength} 
              onChange={(e) => setStrength(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Edge Enhancement: </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={edgeEnhancement} 
              onChange={(e) => setEdgeEnhancement(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={downloadImage}>Download Adjusted Image</button>
          <br />
          <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
          <canvas ref={originalCanvasRef} style={{ display: 'none' }} />
        </>
      )}
    </div>
  );
};

export default ImageEditor;