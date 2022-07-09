import React, { Component } from "react";
import Router from "next/router";

export class ProblemsTable extends Component {
  render() {
    const { problems } = this.props;
    return (
      <div className="overflow-auto rounded-lg shadow md:m-4">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Index
              </th>
              <th className="w-40p-3 text-sm font-semibold tracking-wide text-left">
                User
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Problem
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                language
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Read more
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {problems ? (
              problems.map((problem, idx) => {
                return (
                  <tr
                    key={idx}
                    className={problem.status ? "bg-green-200" : "bg-red-200"}
                  >
                    <td className="p-3 text-blue-700">{idx + 1}</td>
                    <td className="p-3">{problem.userId.username}</td>
                    <td
                      role="button"
                      onClick={() => window.open(problem.problemUrl)}
                      className="p-3 whitespace-nowrap hover:text-blue-500"
                    >
                      {problem.problemUrl}
                    </td>
                    <td className="p-3">{problem.language}</td>
                    <td className="p-3">
                      {problem.status ? "solved" : "unsolved"}
                    </td>
                    <td
                      role="button"
                      onClick={() => Router.push(`/p/${problem._id}`)}
                      className="p-3 text-red-500"
                    >
                      Click
                    </td>
                  </tr>
                );
              })
            ) : (
              <>no problem to display</>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProblemsTable;
