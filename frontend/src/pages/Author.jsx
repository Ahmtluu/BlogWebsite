import React from "react";
import CustomFooter from "../components/CustomFooter";
import AuthorAbout from "../components/AuthorAbout";
import AuthorRecent from "../components/AuthorRecent";
import AuthorDetail from "../components/AuthorDetail";

export default function Author() {
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <AuthorDetail />
            <AuthorAbout />
            <AuthorRecent />
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}
