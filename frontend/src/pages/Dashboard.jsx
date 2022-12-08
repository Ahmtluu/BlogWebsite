import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CustomPostTable from "../components/CustomPostTable";
import CustomProfileForm from "../components/CustomProfileForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Dashboard() {
  return (
    <>
      <Container>
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>Posts</Tab>
          </TabList>

          <TabPanel>
            <CustomProfileForm />
          </TabPanel>
          <TabPanel>
            <CustomPostTable />
          </TabPanel>
        </Tabs>
      </Container>
    </>
  );
}
