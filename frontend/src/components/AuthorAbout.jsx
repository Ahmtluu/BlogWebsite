import React from "react";

export default function AuthorAbout() {
  return (
    <div className="card-body p-4 text-black">
      <div className="mb-5">
        <p className="lead fw-normal mb-1">About</p>
        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <p className="font-italic mb-1">Web Developer</p>
          <p className="font-italic mb-1">Lives in New York</p>
          <p className="font-italic mb-0">Photographer</p>
        </div>
      </div>
    </div>
  );
}
