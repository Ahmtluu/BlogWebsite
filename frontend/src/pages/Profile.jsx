import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import CustomSinglePost from "../components/CustomSinglePost";
import CustomFooter from "../components/CustomFooter";
import ProfileAbout from "../components/ProfileAbout";
import ProfileRecent from "../components/ProfileRecent";
import ProfileDetail from "../components/ProfileDetail";
import { cookies, GetCurrentUser } from "../services/UserService";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

function Profile() {
  const [currentUser, setCurrentUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getProfileData = async () => {
      await GetCurrentUser(id).then((response) => {
        setCurrentUser(response);
      });
    };

    getProfileData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {currentUser ? (
            <div className="col">
              <ProfileDetail currentUser={currentUser} />
              <ProfileAbout about={currentUser.about} />
              <ProfileRecent />
            </div>
          ) : (
            <Container>Loading...</Container>
          )}
        </div>
      </div>
      <CustomFooter />
    </>
  );
}
export default Profile;
