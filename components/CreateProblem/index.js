import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createProblem,
  updateProblem,
  clearUIData,
  getProblemById,
} from "../../redux/actions/dataAction";

export class CreateProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemUrl: this.props.edit ? this.props.data.problem.problemUrl : "",
      status: this.props.edit ? this.props.data.problem.status : false,
      language: this.props.edit ? this.props.data.problem.language : "cpp",
      notes: this.props.edit ? this.props.data.problem.notes : "",
      code: this.props.edit ? this.props.data.problem.code : "",
      errors: "",
    };
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.getProblemById(this.props.id);
    }
  }

  handleChange = (event) => {
    if (event.target.name === "notes" && event.target.value.length > 2500) {
      this.setState({
        errors: "max char length pf notes is not more than 2500",
      });
    } else if (
      event.target.name === "code" &&
      event.target.value.length > 3000
    ) {
      this.setState({
        errors: "max char length of code is not more than 3000",
      });
    } else if (
      event.target.name === "problemUrl" &&
      event.target.value.length > 250
    ) {
      this.setState({
        errors: "max char length of problem Url is not more than 250",
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        errors: null,
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const ProblemData = {
      problemUrl: this.state.problemUrl,
      notes: this.state.notes,
      code: this.state.code,
      status: Boolean(this.state.status),
      language: this.state.language,
    };
    if (this.props.edit) {
      if (this.props.user.id === this.props.data.problem.userId._id) {
        this.props.updateProblem(this.props.id, ProblemData, Router);
      } else {
        this.setState({
          errors: "you are not authorised to update another user problem",
        });
      }
    } else {
      this.props.createProblem(ProblemData, Router);
    }
  };
  render() {
    const {
      data: { loading },
      ui: { errors },
    } = this.props;
    return (
      <div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          {(this.state.errors || errors) && (
            <div className="box-border p-2 mt-2 mb-4 bg-red-500 flex">
              <p className="text-white flex-1">
                Error: {errors || this.state.errors}
              </p>
              <button
                className="text-xl"
                onClick={() => {
                  this.props.clearUIData();
                  this.setState({ errors: "" });
                }}
                title="close"
              >
                👍
              </button>
            </div>
          )}
          <form noValidate onSubmit={this.handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="mt-4 text-center text-blue-600 text-3xl sm:text-2xl font-bold">
                  {this.props.edit ? "Edit Problem" : "Create Problem"}
                </div>
                <div className="mt-4 rounded-md shadow-sm">
                  <input
                    title="Problem Url"
                    type="text"
                    name="problemUrl"
                    id="problemUrl"
                    className="focus:ring-blue-500 p-2 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-blue-300"
                    placeholder="Problem Url"
                    onChange={this.handleChange}
                    value={this.state.problemUrl}
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    title="notes"
                    id="notes"
                    name="notes"
                    rows="3"
                    className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-blue-300 rounded-md"
                    placeholder="make your notes...🙂"
                    onChange={this.handleChange}
                    value={this.state.notes}
                  ></textarea>
                </div>
                <div className="flex space-x-4 md:space-x-8">
                  <div className="mt-4 flex space-x-2 shadow-sm">
                    <p className="">Language:</p>
                    <select
                      title="Language"
                      name="language"
                      id="language"
                      className="sm:text-sm"
                      onChange={this.handleChange}
                      value={this.state.language}
                    >
                      <option value="cpp">C++</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="javascript">Javascript</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                  <div className="mt-4 flex space-x-2 shadow-sm">
                    <p className="">status:</p>
                    <select
                      title="status"
                      type="text"
                      name="status"
                      id="status"
                      className="sm:text-sm"
                      onChange={this.handleChange}
                      value={this.state.status}
                    >
                      <option value={true}>Solved</option>
                      <option value={false}>Unsolved</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <textarea
                    title="code"
                    id="code"
                    name="code"
                    rows="5"
                    className={`shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-blue-300 rounded-md `}
                    placeholder="Paste your code here..."
                    onChange={this.handleChange}
                    value={this.state.code}
                  ></textarea>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {!loading && (
                    <span>
                      {this.props.edit ? "Edit Problem" : "Submit Problem"}
                    </span>
                  )}
                  {loading && (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateProblem.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  createProblem: PropTypes.func.isRequired,
  updateProblem: PropTypes.func.isRequired,
  clearUIData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  ui: state.ui,
});

const mapActionsToProps = {
  createProblem,
  updateProblem,
  clearUIData,
  getProblemById,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProblem);
