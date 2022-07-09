import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import ProblemsTable from "../components/ProblemsTable";
import { getAutherProblems } from "../redux/actions/dataAction";
import AuthenticatedRoute from "../components/AuthenticatedRoute";

export class me extends Component {
  componentDidMount() {
    this.props.getAutherProblems();
  }
  render() {
    const {
      user,
      data: { authProblems, loading },
    } = this.props;
    if (!loading) console.log(authProblems);
    return (
      <>
        <Navbar />
        <div>
          <div className="box-border p-2 mt-2 mb-4 mx-4 md:mx-24 shadow flex flex-col">
            <div className="text-xl font-medium">username: {user.username}</div>
            <div className="text-xl font-medium">email: {user.email}</div>
            {user.name && (
              <div className="text-xl font-medium">
                name: {user.name.first || ""} {user.name.last || ""}
              </div>
            )}
          </div>
          <div>
            {loading ? (
              <div className="text-xl">Loading Your problems...</div>
            ) : (
              <ProblemsTable problems={authProblems} />
            )}
          </div>
        </div>
      </>
    );
  }
}
me.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getAutherProblems: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});
export default connect(mapStateToProps, { getAutherProblems })(
  AuthenticatedRoute(me)
);
