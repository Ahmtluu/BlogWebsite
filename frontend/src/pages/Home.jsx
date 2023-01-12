import React from "react";
import CustomJumbotron from "../components/CustomJumbotron";
import CustomFooter from "../components/CustomFooter";
import CustomPosts from "../components/CustomPosts";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Home() {
  return (
    <>
      <CustomJumbotron />
      <AnimationOnScroll animateIn="animate__fadeIn">
        <CustomPosts />
      </AnimationOnScroll>
      <CustomFooter />
    </>
  );
}
