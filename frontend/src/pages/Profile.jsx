import React, { useState, useEffect } from "react";
import CustomFooter from "../components/CustomFooter";
import ProfileRecent from "../components/ProfileRecent";
import ProfileDetail from "../components/ProfileDetail";
import { GetCurrentUser } from "../services/UserService";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { CircularProgress } from "react-loading-indicators";

function Profile() {
  const [currentUser, setCurrentUser] = useState();
  const { id } = useParams();

  const getProfileData = async () => {
    await GetCurrentUser(id).then((response) => {
      setCurrentUser(response);
    });
  };
  useEffect(() => {
    getProfileData();
  },[]);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {currentUser ? (
            <div className="col">
              <ProfileDetail
                 userId={currentUser.sub}
              />
              <ProfileRecent
              user={currentUser}
               
              />
            </div>
          ) : (
            <Container className="d-flex justify-content-center">
            <CircularProgress size="small" variant="dotted" color="#495579" />
          </Container>
          )}
        </div>
      </div>
      <CustomFooter />
    </>
  );
}
export default Profile;
