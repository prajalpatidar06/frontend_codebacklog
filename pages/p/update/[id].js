import React, { Component } from "react";
import CreateProblem from "../../../components/CreateProblem";
import Navbar from "../../../components/Navbar";
import AuthenticatedRoute from "../../../components/AuthenticatedRoute";
import { useRouter } from "next/router";

export function UpdateProblem(props) {
  const { query } = useRouter();
  return (
    <div>
      <Navbar />
      {query.id && <CreateProblem edit={true} id={query.id} />}
    </div>
  );
}

export default AuthenticatedRoute(UpdateProblem);
