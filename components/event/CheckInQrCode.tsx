"use client";

import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { UserData } from "@/types";

interface CheckInQrCodeProps {
  id: number;
}

const CheckInQrCode: React.FC<CheckInQrCodeProps> = ({ id }) => {
  React.useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (text, result) => {
        const userData = JSON.parse(result.decodedText) as UserData;

        // create the form
        const form = document.createElement("form");
        form.setAttribute("hidden", "true");
        form.setAttribute("method", "post");
        form.setAttribute("action", "/api/user-event");

        // create email
        const userID = document.createElement("input");
        userID.setAttribute("type", "text");
        userID.setAttribute("name", "user_id");
        userID.setAttribute("value", userData.id);
        form.appendChild(userID);

        // create password
        const eventId = document.createElement("input");
        eventId.setAttribute("type", "text");
        eventId.setAttribute("name", "event_id");
        eventId.setAttribute("value", String(id));
        form.appendChild(eventId);

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

export default CheckInQrCode;
