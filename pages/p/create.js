import React, { Component } from "react";
import AuthenticatedRoute from "../../components/AuthenticatedRoute";
import CreateProblem from "../../components/CreateProblem";
import Navbar from "../../components/Navbar";

export class create extends Component {
  render() {
    return (
      <>
        <Navbar pageName="create" />
        <CreateProblem />
      </>
    );
  }
}

export default AuthenticatedRoute(create);
