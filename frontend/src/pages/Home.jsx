import React from "react";
import CustomJumbotron from "../components/CustomJumbotron";
import CustomFooter from "../components/CustomFooter";
import CustomPosts from "../components/CustomPosts";

export default function Home() {
  return (
    <>
      <CustomJumbotron />
      <CustomPosts />
      <CustomFooter />
    </>
  );
}
