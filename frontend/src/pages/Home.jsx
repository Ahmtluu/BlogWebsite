import React from "react";
import CustomJumbotron from "../components/CustomJumbotron";
import CustomFooter from "../components/CustomFooter";
import PostList from "../components/PostList";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Home() {
  return (
    <>
      <CustomJumbotron />
      <AnimationOnScroll animateIn="animate__fadeIn">
        <PostList />
      </AnimationOnScroll>
      <CustomFooter />
    </>
  );
}
