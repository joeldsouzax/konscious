"use client";

import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { UserData } from "@/types";

interface LoginScanProps {}

const LoginScan: React.FC<LoginScanProps> = () => {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 2, qrbox: { width: 400, height: 400 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (text, result) => {
        setLoading(true);
        const userData = JSON.parse(result.decodedText) as UserData;
        html5QrcodeScanner.pause();

        if (ref.current) {
          const form = document.createElement("form");
          form.setAttribute("hidden", "true");
          form.setAttribute("method", "post");
          form.setAttribute("encType", "multipart/form-data");
          form.setAttribute("action", "/auth/sign-in");
          // create email
          const email = document.createElement("input");
          email.setAttribute("type", "email");
          email.setAttribute("name", "email");
          email.setAttribute("value", userData.email);
          form.appendChild(email);
          // create password
          const password = document.createElement("input");
          password.setAttribute("type", "password");
          password.setAttribute("name", "password");
          password.setAttribute("value", userData.hash);
          form.appendChild(password);
          ref.current.appendChild(form);
          form.submit();
        }
        // // create the form
        // const form = document.createElement("form");
        // form.setAttribute("hidden", "true");
        // form.setAttribute("method", "post");
        // form.setAttribute("encType", "multipart/form-data");
        // form.setAttribute("action", "/auth/sign-in");
        // // create email
        // const email = document.createElement("input");
        // email.setAttribute("type", "email");
        // email.setAttribute("name", "email");
        // email.setAttribute("value", userData.email);
        // form.appendChild(email);
        // // create password
        // const password = document.createElement("input");
        // password.setAttribute("type", "password");
        // password.setAttribute("name", "password");
        // password.setAttribute("value", userData.hash);
        // form.appendChild(password);

        // document.body.appendChild(form);

        // form.submit();

        setTimeout(() => {
          setLoading(false);
          html5QrcodeScanner.resume();
        }, 1000);
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
      className="w-full h-full"
      id="scan-form"
      ref={ref}
    >
      {loading ? (
        <span className="loading-spinner">Scanning QR Code</span>
      ) : (
        <div
          id="reader"
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default LoginScan;
