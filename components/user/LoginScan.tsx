"use client";

import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { UserData } from "@/types";

interface LoginScanProps {}

const LoginScan: React.FC<LoginScanProps> = () => {
  React.useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 400, height: 400 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (text, result) => {
        const userData = JSON.parse(result.decodedText) as UserData;

        // create the form
        const form = document.createElement("form");
        form.setAttribute("hidden", "true");
        form.setAttribute("action", "post");
        form.setAttribute("method", "/auth/sign-in");

        // create email
        const email = document.createElement("input");
        email.setAttribute("type", "email");
        email.setAttribute("name", "email");
        email.setAttribute("value", userData.email);
        form.appendChild(email);

        // create password
        const password = document.createElement("input");
        email.setAttribute("type", "password");
        email.setAttribute("name", "password");
        email.setAttribute("value", userData.hash);
        form.appendChild(password);

        document.body.appendChild(form);
        form.submit();
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

export default LoginScan;
