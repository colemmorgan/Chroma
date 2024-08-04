import React, {
  useRef,
  ChangeEvent,
  DragEvent,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import daltonize from "../utils/daltonize";
import enhanceEdges from "../utils/enhanceEdges";
import { FaRegTrashAlt, FaFile } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";

type EditorProps = {};

const Editor: React.FC<EditorProps> = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<number>(1);
  const [edgeEnhanceAmt, setEdgeEnhanceAmt] = useState<number>(0);
  const [colorMode, setColorMode] = useState<
    "protanomaly" | "deuteranomaly" | "tritanomaly"
  >("protanomaly");


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);

  //   useEffect(() => {
  //     console.log(image)
  //   },[image])

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange({ target: { files } } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const applyColorAdjustment = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const originalCanvas = originalCanvasRef.current;
    const originalCtx = originalCanvas?.getContext("2d");
    if (!canvas || !ctx || !originalCanvas || !originalCtx || !image) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      originalCanvas.width = img.width;
      originalCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalCtx.drawImage(img, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const originalImageData = originalCtx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      imageData = daltonize(imageData, colorMode);

      imageData = enhanceEdges(imageData, edgeEnhanceAmt);

      const data = imageData.data;
      const originalData = originalImageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = originalData[i] * (1 - strength) + data[i] * strength;
        data[i + 1] =
          originalData[i + 1] * (1 - strength) + data[i + 1] * strength;
        data[i + 2] =
          originalData[i + 2] * (1 - strength) + data[i + 2] * strength;
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = image;
  };

  useEffect(() => {
    if (image) {
      applyColorAdjustment();
    }
  }, [image, colorMode, strength, edgeEnhanceAmt]);

    const downloadImage = () => {
      const canvas = canvasRef.current;
      if (!canvas || !image) {
        window.alert("Please Upload a photo.")
        return
      }

      const link = document.createElement('a');
      link.download = `${colorMode}-adjusted.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

  return (
    <>
      <nav>
        <div className="max-w-[1100px] px-4 flex justify-between mx-auto h-20 items-center">
          <p className="text-accent font-bold text-xl">Chroma</p>
          <ul className="flex gap-6 font-semibold text-sm">
            <Link to={"/"}>Home</Link>
            <a href="https://github.com/colemmorgan/Chroma" target="_blank">
              Github
            </a>
          </ul>
        </div>
      </nav>
      <div className="max-w-[1100px] px-4 mx-auto pt-14 pb-14">
        <h1 className="text-center font-bold text-5xl">Image Adjuster</h1>
        <p className="text-center font-semibold mt-4 text-lg opacity-85">
          Enhance color differentiation
        </p>
        <div className="min-h-[475px] mt-14 border border-dark border-opacity-15 rounded-xl box flex flex-col lg:flex-row items-center lg:items-stretch">
          <div className="max-w-[420px] lg:min-w-[420px] lg:border-r border-dark border-opacity-15 h-full px-6 py-8">
            <div className="">
              <p className="font-medium">
                Adjustment Strength (100% Recommended)
              </p>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={strength}
                onChange={(e) => setStrength(parseFloat(e.target.value))}
                className="mt-4 "
              />
            </div>
            <div className="mt-6">
              <p className="font-medium">
                Edge Enhancement. High values may provide more contrast but
                lower image quality. <br />
                (0-25% Recommended)
              </p>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.01"
                value={edgeEnhanceAmt}
                onChange={(e) => setEdgeEnhanceAmt(parseFloat(e.target.value))}
                className="mt-4"
              />
            </div>
            <div className="mt-6 font-medium">
              <p className="font-semibold">Color Mode</p>
              <div className="flex items-center gap-4 mt-4">
                <input
                  type="radio"
                  name="mode"
                  id="protanomaly"
                  defaultChecked
                  onClick={() => setColorMode("protanomaly")}
                />
                <label htmlFor="protanomaly" className="cursor-pointer">
                  Protanomaly
                </label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="radio"
                  name="mode"
                  id="deuteranomaly"
                  onClick={() => setColorMode("deuteranomaly")}
                />
                <label htmlFor="deuteranomaly" className="cursor-pointer">
                  Deuteranomaly
                </label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="radio"
                  name="mode"
                  id="tritanomaly"
                  onClick={() => setColorMode("tritanomaly")}
                />
                <label htmlFor="tritanomaly" className="cursor-pointer">
                  Tritanomaly
                </label>
              </div>
            </div>
            <button className="w-full mt-8 bg-accent text-light font-semibold py-2 rounded-md flex gap-3 justify-center items-center" onClick={downloadImage}>
              Download Image <span className="text-2xl"><AiOutlineDownload/></span>
            </button>
          </div>
          <div className="w-full px-10 py-8 relative">
          {image && <span className="absolute right-5 top-5 text-xl text-red-500 cursor-pointer z-10" onClick={() => setImage("")}><FaRegTrashAlt/></span>}
            <div
              className={`w-full h-full border-2 border-accent ${image ? "border-opacity-0" : "border-opacity-50"} border-dashed flex flex-col items-center justify-center
              min-h-[400px] lg:min-h-0 `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {image ? (
                <>
                  <canvas ref={canvasRef} style={{ maxWidth: "100%", overflow: "hidden" }} />
                  <canvas ref={originalCanvasRef} style={{ display: "none" }} />
                </>
              ) : (
                <>
                  {" "}
                  <p className="text-3xl font-semibold">Drag File Here</p>
                  <p className="text-2xl font-medium my-4">Or</p>
                  <button
                    className="font-semibold bg-accent text-light py-2 w-60 rounded-xl mb-8 flex justify-center items-center gap-2"
                    onClick={handleButtonClick}
                  >
                    Choose File <span><FaFile/></span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
    // <ImageEditor/>
  );
};
export default Editor;
