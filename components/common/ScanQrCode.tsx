"use client";

import * as React from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";

interface ScanQrCodeProps {}

const ScanQrCode: React.FC<ScanQrCodeProps> = () => {
  React.useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (text, result) => console.log(text, result),
      (error) => console.log(error)
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div
      id="reader"
      className="w-full h-full"
    />
  );
};

export default ScanQrCode;
