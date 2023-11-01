import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userAction";
import { clearUIData } from "../../redux/actions/dataAction";

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password.trim() !== this.state.confirmPassword.trim()) {
      this.setState({
        errors: "Confirm Password is not matching",
      });
    } else {
      const userData = {
        email: this.state.email.toLowerCase(),
        username: this.state.username.toLowerCase(),
        password: this.state.password,
      };
      this.props.signupUser(userData);
    }
  };

  handleChange = (event) => {
    if (event.target.name === "username" && event.target.value.length > 31) {
      this.setState({
        errors: "username max char length is not more than 30",
      });
    } else if (
      event.target.name === "username" &&
      event.target.value[event.target.value.length - 1] === " "
    ) {
      this.setState({
        errors: "username does not contain space",
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        errors: null,
      });
    }
  };
  render() {
    const {
      ui: { loading, messages },
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        {messages && (
          <div className="box-border p-2 mt-2 mb-4 rounded bg-green-600 flex">
            <p className="text-white flex-1">{messages}</p>
            <button
              className="text-xl"
              onClick={this.props.clearUIData}
              title="close"
              t
            >
              👍
            </button>
          </div>
        )}
        {(errors || this.props.ui.errors) && (
          <div className="box-border p-2 mt-2 mb-4 rounded bg-red-600 flex">
            <p className="text-white flex-1">
              {errors || this.props.ui.errors}
            </p>
            <button
              className="text-xl"
              onClick={this.props.clearUIData}
              title="close"
              t
            >
              👍
            </button>
          </div>
        )}
        <form noValidate onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </div>
          <div className="mb-4">
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="mb-6">
            <p className="text-gray-500 text-xs">
              *The password must contain one lowercase letter, one uppercase
              letter, one number, and be at least 6 characters long
            </p>
            <input
              className={
                "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <input
              className={
                "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {!loading && <span>Create Account</span>}
              {loading && (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
                </div>
              )}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

Signup.prototypes = {
  signupUser: PropTypes.func.isRequired,
  clearUIData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionsToProps = {
  signupUser,
  clearUIData,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
