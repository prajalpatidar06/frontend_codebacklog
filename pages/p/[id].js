import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProblemById, deleteProblem } from "../../redux/actions/dataAction";
import Navbar from "../../components/Navbar";
import AuthenticatedRoute from "../../components/AuthenticatedRoute";
import SyntaxHighlighter from "react-syntax-highlighter";
import EditorTheme from "../../styles/tomorrow-night-bright";
import swal from "sweetalert";

export function Problem(props) {
  const { query } = useRouter();
  useEffect(() => {
    if (query.id) {
      props.getProblemById(query.id);
    }
  }, []);
  const deleteProblemHandle = () => {
    if (props.user.id === props.data.problem.userId._id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this problem!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          props.deleteProblem(
            props.data.problem._id,
            props.data.problem,
            Router
          );
          swal("Poof! Your problem has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your problem is safe!");
        }
      });
    } else {
      swal("You are authorized to delete!");
    }
  };
  const { problem, loading } = props.data;
  return (
    <>
      <Navbar />
      {loading ? (
        <>Loading...</>
      ) : problem._id ? (
        <div className="bg-white p-4 space-y-4 rounded-lg shadow overflow-auto">
          {props.user.id === problem.userId._id && (
            <div className="flex space-x-8">
              <div className="flex-1"></div>
              <button
                onClick={deleteProblemHandle}
                className="font-xl font-bold box-border rounded bg-red-300 bg-opacity-30"
              >
                Delete 🗑️
              </button>
              <button
                onClick={() => Router.push(`/p/update/${problem._id}`)}
                className="font-xl font-bold box-border rounded shadow bg-orange-300 bg-opacity-30"
              >
                Edit ✎
              </button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="text-blue-500 font-bold hover:underline">
              <button>#{problem.userId.username}</button>
            </div>
            <div className="text-gray-500 font-medium">{problem.language}</div>
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
  user: PropTypes.object.isRequired,
  getProblemById: PropTypes.func.isRequired,
  deleteProblem: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
export default connect(mapStateToProps, { getProblemById, deleteProblem })(
  AuthenticatedRoute(Problem)
);
