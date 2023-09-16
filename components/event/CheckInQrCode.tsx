"use client";

import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { UserData } from "@/types";

interface CheckInQrCodeProps {}

const CheckInQrCode: React.FC<CheckInQrCodeProps> = () => {
  React.useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (text, result) => {
        const userData = JSON.parse(result.decodedText) as UserData;
      },
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

export default CheckInQrCode;
