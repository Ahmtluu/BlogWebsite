import React, { useState, useEffect } from "react";
import CustomFooter from "../components/CustomFooter";
import ProfileRecent from "../components/ProfileRecent";
import ProfileDetail from "../components/ProfileDetail";
import { GetCurrentUser } from "../services/UserService";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { CircularProgress } from "react-loading-indicators";
import { useFetchCurrentUserQuery } from "../features/users/userApiSlice";

function Profile() {

  const { id } = useParams();
  const {data=[], isFetching} = useFetchCurrentUserQuery(id);


  return (
    <>
      <Row className="row d-flex justify-content-center align-items-center h-100">
        {data ? (
          <div className="col">
            <Container>
              <ProfileDetail user={data} />{" "}
            </Container>
            <ProfileRecent user={data} />
          </div>
        ) : (
          <Container className="d-flex justify-content-center">
            <CircularProgress size="small" variant="dotted" color="#495579" />
          </Container>
        )}
      </Row>

      <CustomFooter />
    </>
  );
}
export default Profile;
