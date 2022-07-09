import Router from "next/router";
import React from "react";
import jwtDecode from "jwt-decode";
import { logoutUser } from "../../redux/actions/userAction";
import store from "../../redux/store";
import { SET_AUTHENTICATED , SET_UNAUTHENTICATED } from "../../redux/types";
import axios from "axios";

const AuthenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };
    componentDidMount() {
      const token = window.localStorage.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logoutUser());
          Router.push("/login");
        } else {
          store.dispatch({ type: SET_AUTHENTICATED });
          axios.defaults.headers.common["Authorization"] = token;
          this.setState({ loading: false });
        }
      } else {
        store.dispatch({type:SET_UNAUTHENTICATED})
        Router.push("/login");
      }
    }
    render() {
      const { loading } = this.state;
      if (loading) {
        return <div />;
      }
      return <Component {...this.props} />;
    }
  }
  return AuthenticatedRoute;
};

export default AuthenticatedRoute;
