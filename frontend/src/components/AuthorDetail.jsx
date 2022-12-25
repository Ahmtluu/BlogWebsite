import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import profileImage from "../assets/images/profileImage.png";
import { GetCurrentUser } from "../services/UserService";

export default function AuthorDetail() {
  const { username } = useParams();
  const [author, setAuthor] = useState();

  const fetchAuthorData = async () => {
    const response = await GetCurrentUser(username);
    setAuthor(response);
  };
  useEffect(() => {
    fetchAuthorData();
  }, []);

  return author ? (
    <>
      {" "}
      <div
        className="rounded-top text-white d-flex flex-row"
        style={{ backgroundColor: "#000", height: "200px" }}
      >
        <div
          className="ms-4 mt-5 d-flex flex-column"
          style={{ width: "150px" }}
        >
          <img
            src={profileImage}
            alt="Generic placeholder image"
            className="img-fluid img-thumbnail mt-4 mb-2"
            style={{ width: "150px", zIndex: "1" }}
          />
        </div>
        <div className="ms-3" style={{ marginTop: "150px" }}>
          <h5>{author.username}</h5>
        </div>
      </div>
      <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="d-flex justify-content-end text-center py-1">
          <div>
            <p className="mb-1 h5">253</p>
            <p className="small text-muted mb-0">Total Posts</p>
          </div>
        </div>
      </div>{" "}
    </>
  ) : (
    <div>Loading</div>
  );
}
