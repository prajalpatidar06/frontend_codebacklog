import React, { Component } from "react";
import Router from "next/router";

export class ProblemsTable extends Component {
  render() {
    const { problems } = this.props;
    return (
      <>
        <div className="overflow-auto rounded-lg shadow hidden md:block m-4">
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
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {problems ? (
            problems.map((problem, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg shadow space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="text-blue-500 font-bold"
                      onClick={() =>
                        Router.push(`/u/${problem.userId.username}`)
                      }
                    >
                      {problem.userId.username}
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
                    <a
                      href={problem.problemUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      {problem.problemUrl}
                    </a>
                  </div>
                  <div
                    className="text-blue-500"
                    onClick={() => Router.push(`/p/${problem._id}`)}
                  >
                    Read more...
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default ProblemsTable;
