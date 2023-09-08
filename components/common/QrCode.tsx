"use client";
import * as React from "react";
import { Ecc, QrCode as QrCodeEngine } from "@/util";

interface QrCodeProps {
  id: string;
  hash: string;
  email: string;
}

const QrCode: React.FC<QrCodeProps> = (props) => {
  const [loading, setLoading] = React.useState(true);
  const scale = 10;
  const border = 2;
  const darkColor = "#000000";
  const lightColor = "#FFFFFF";
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const errCorLvl: Ecc = Ecc.LOW;

  React.useEffect(() => {
    const qr = QrCodeEngine.encodeText(JSON.stringify(props), errCorLvl);
    const canvas = canvasRef.current;

    if (!canvas) return;

    const width: number = (qr.size + border * 2) * scale;
    canvas.width = width;
    canvas.height = width;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    for (let y = -border; y < qr.size + border; y++) {
      for (let x = -border; x < qr.size + border; x++) {
        ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
        ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
      }
    }

    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <span className="loading loading-infinity loading-lg text-primary"></span>
      )}
      <canvas
        id="qr-code"
        ref={canvasRef}
      ></canvas>
    </>
  );
};

export default QrCode;
