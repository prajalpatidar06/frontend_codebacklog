import React, { Component, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProblemById } from "../../redux/actions/dataAction";
import Navbar from "../../components/Navbar";
import SyntaxHighlighter from "react-syntax-highlighter";
import EditorTheme from "../../styles/tomorrow-night-bright";

export function Problem(props) {
  const { query } = useRouter();
  useEffect(() => {
    if (query.id) {
      props.getProblemById(query.id);
    }
  }, []);
  const { problem, loading } = props.data;
  return (
    <>
      <Navbar />
      {loading ? (
        <>Loading...</>
      ) : problem._id ? (
        <div className="bg-white p-4 space-y-4 rounded-lg shadow overflow-auto">
          <div className="flex items-center space-x-2">
            <div className="text-blue-500 font-bold hover:underline">
              #{problem.userId}
            </div>
            <div className="text-blue-500 font-medium">{problem.language}</div>
            <div
              className={`"p-1.5" text-sm font-medium uppercase tracking-wider ${
                problem.status
                  ? "text-green-800 bg-green-200"
                  : "text-red-800 bg-red-200"
              } rounded-lg bg-opacity-50`}
            >
              {problem.status ? "Solved" : "Unsolved"}
            </div>
          </div>
          <div>
            <h3 className="font-bold">URL:</h3>
            <a
              href={problem.problemUrl}
              target="_blank"
              rel="noreferrer"
              className="text-green-500 hover:underline"
            >
              {problem.problemUrl}
            </a>
          </div>
          <div>
            <h3 className="font-bold">NOTES:</h3>
            <SyntaxHighlighter>{problem.notes}</SyntaxHighlighter>
          </div>
          <div>
            <h3 className="font-bold">CODE:</h3>
            <SyntaxHighlighter language={problem.language} style={EditorTheme}>
              {problem.code}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <>invalid id</>
      )}
    </>
  );
}

Problem.propTypes = {
  data: PropTypes.object.isRequired,
  getProblemById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getProblemById })(Problem);
