import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetCurrentUser } from "../services/UserService";
import CustomFooter from "../components/CustomFooter";
import AuthorRecent from "../components/AuthorRecent";
import AuthorDetail from "../components/AuthorDetail";

export default function Author() {
  const { authorName } = useParams();
  const [author, setAuthor] = useState();
  const fetchAuthorData = async () => {
    const response = await GetCurrentUser(authorName);
    setAuthor(response);
  };

  useEffect(() => {
    fetchAuthorData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <AuthorDetail currentAuthor={author} />
            <AuthorRecent currentAuthor={author} />
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}
