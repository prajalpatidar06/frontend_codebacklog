import { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getAuther } from "../../redux/actions/userAction";

function NavLink({ to, children }) {
  return (
    <Link href={to} className={`mx-4`}>
      {children}
    </Link>
  );
}

function MobileNav({ open, setOpen, user, logoutUser }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
        {/*logo container*/}
        <Link className="text-xl font-semibold" href="/">
          CODEBACKLOG
        </Link>
      </div>
      <div className="flex flex-col mt-4 ml-4 space-y-4">
        <Link
          className="text-xl font-medium"
          href="/me"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          <p>Hello, {user.username}</p>
        </Link>
        <Link
          className="text-xl font-normal"
          href="/p/create"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Create New
        </Link>
        {user.authenticated ? (
          <button className="text-xl font-normal" onClick={logoutUser}>
            LOGOUT
          </button>
        ) : (
          <Link className="text-xl font-normal" href="/login">
            LOGIN/SINGUP
          </Link>
        )}
      </div>
    </div>
  );
}

function Navbar({ user, logoutUser, getAuther, pageName }) {
  const [open, setOpen] = useState(false);
  if (!user.username) getAuther();
  return (
    <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
      <MobileNav
        open={open}
        setOpen={setOpen}
        user={user}
        logoutUser={logoutUser}
      />
      <div className="w-3/12 flex items-center">
        <Link href="/">
          <div
            className={
              pageName === "home" &&
              "tracking-wider rounded-lg text-blue-800 bg-blue-100 bg-opacity-50"
            }
          >
            <div className="text-2xl font-bold cursor-pointer">
              CODINGBACKLOG
            </div>
          </div>
        </Link>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex space-x-4">
          <NavLink to="/me">
            <div
              className={
                pageName === "auther" &&
                "tracking-wider rounded-lg text-blue-800 bg-blue-100 bg-opacity-50"
              }
            >
              <div className="cursor-pointer">Hello, {user.username}</div>
            </div>
          </NavLink>
          <NavLink to="/p/create">
            <div
              className={
                pageName === "create" &&
                "tracking-wider rounded-lg text-blue-800 bg-blue-100 bg-opacity-50"
              }
            >
              <div className="cursor-pointer">Create New</div>
            </div>
          </NavLink>
          {user.authenticated ? (
            <button className="hover:text-red-500" onClick={logoutUser}>
              LOGOUT
            </button>
          ) : (
            <NavLink className="hover:text-red-500" to="/login">
              LOGIN/SINGUP
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getAuther: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser, getAuther })(Navbar);
