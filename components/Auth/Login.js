import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userAction";
import { clearUIData } from "../../redux/actions/dataAction";
import Router from "next/router";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, Router);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      ui: { loading, messages, errors },
    } = this.props;
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
        {errors && (
          <div className="box-border p-2 mt-2 mb-4 rounded bg-red-600 flex">
            <p className="text-white flex-1">{errors}</p>
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
              id="email"
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="mb-6">
            <input
              className={
                "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {!loading && <span>Sign In</span>}
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

Login.prototypes = {
  loginUser: PropTypes.func.isRequired,
  clearUIData: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapActionsToProps = {
  loginUser,
  clearUIData,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
