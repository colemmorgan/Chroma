const daltonize = (imageData: ImageData, type: 'protanomaly' | 'deuteranomaly' | 'tritanomaly'): ImageData => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let l = (17.8824 * data[i] + 43.5161 * data[i+1] + 4.11935 * data[i+2]) / 100;
      let m = (3.45565 * data[i] + 27.1554 * data[i+1] + 3.86714 * data[i+2]) / 100;
      let s = (0.0299566 * data[i] + 0.184309 * data[i+1] + 1.46709 * data[i+2]) / 100;
      
      let l2: number, m2: number, s2: number;
      if (type === 'protanomaly') {
        l2 = 0.0 * l + 2.02344 * m + -2.52581 * s;
        m2 = 0.0 * l + 1.0 * m + 0.0 * s;
        s2 = 0.0 * l + 0.0 * m + 1.0 * s;
      } else if (type === 'deuteranomaly') {
        l2 = 1.0 * l + 0.0 * m + 0.0 * s;
        m2 = 0.494207 * l + 0.0 * m + 1.24827 * s;
        s2 = 0.0 * l + 0.0 * m + 1.0 * s;
      } else {
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


export default daltonize