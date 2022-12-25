import React, { useState } from "react";
import profileImage from "../assets/images/profileImage.png";
import { useForm } from "react-hook-form";
import CustomPostTable from "./CustomPostTable";

export default function CustomProfileForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => {
    alert(JSON.stringify(d));
  };

  return (
    <div className=" container py-2">
      <div className="row">
        <div className="col-lg-4 text-center">
          <img
            src={profileImage}
            alt="avatar"
            className="rounded-circle img-fluid mt-2"
            style={{ width: "60%", height: "80%" }}
          />{" "}
        </div>
        <div className="col-lg-8">
          <div className="mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">example@example.com</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Mobile</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(098) 765-4321</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <CustomPostTable />
      </div>
    </div>
  );
}
