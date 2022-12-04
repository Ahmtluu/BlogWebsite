import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import CustomJumbotron from "../components/CustomJumbotron";
import CustomFooter from "../components/CustomFooter";
import Features from "../components/Features";
import CustomHeading from "../components/CustomHeading";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <CustomJumbotron />
      <CustomHeading />
      <Features />
      <CustomFooter />
    </>
  );
}
