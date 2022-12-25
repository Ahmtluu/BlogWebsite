import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import CustomSinglePost from "../components/CustomSinglePost";
import CustomFooter from "../components/CustomFooter";
import ProfileAbout from "../components/ProfileAbout";
import ProfileRecent from "../components/ProfileRecent";
import ProfileDetail from "../components/ProfileDetail";
import { cookies } from "../services/UserService";
import { Container } from "react-bootstrap";

function Profile() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getProfileData = async () => {
      const currentCookie = cookies.get("jwt_authorization");
      const decoded = jwt_decode(currentCookie);
      setCurrentUser(decoded);
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
