import React from "react";

export default function ProfileAbout({ about }) {
  return (
    <div className="mb-5 mt-4">
      <p className="lead fw-normal mb-2">About</p>
      <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <p className="font-italic mb-1">{about}</p>
      </div>
    </div>
  );
}
