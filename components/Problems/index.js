import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllProblems } from "../../redux/actions/dataAction";
import ProblemsTable from "../ProblemsTable";

export class Problems extends Component {
  componentDidMount() {
    this.props.getAllProblems();
  }
  render() {
    const { problems, loading } = this.props.data;
    return (
      <>
        {loading ? (
          <>loading</>
        ) : (
          <ProblemsTable problems={problems} />
        )}
      </>
    );
  }
}

Problems.propTypes = {
  data: PropTypes.object.isRequired,
  getAllProblems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getAllProblems })(Problems);
