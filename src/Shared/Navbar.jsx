import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import "./Navbar.css";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const handleLogout = () => {
        logOut()
            .then((Result) => {})
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="bg-base-200 ">
            <div className="navbar bg-slate-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className=" dropdown-content mt-3  shadow bg-base-100 w-52 rounded-box"
                        >
                            {/* <li>
                                <NavLink
                                    className="nav w-full flex px-10 py-3  text-[#737373] font-medium hover:bg-slate-100 rounded-t-2xl"
                                    to={"/"}
                                >
                                    Home
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink
                                    className="nav w-full flex px-10 py-3  text-[#737373] font-medium hover:bg-slate-100"
                                    to={"/"}
                                >
                                    Create Notes
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    className="nav w-full flex px-10 py-3  text-[#737373] font-medium hover:bg-slate-100"
                                    to={"/saved"}
                                >
                                    Saved Notes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav w-full flex px-10 py-3  text-[#737373] font-medium hover:bg-slate-100  rounded-b-2xl"
                                    to={"/favorites"}
                                >
                                    Favorites Notes
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center lg:hidden">
                    <Link to={"/"} className="flex items-center">
                        <img
                            className=" h-10"
                            src="https://raw.githubusercontent.com/ashikur-rahman-10/note-taking-web/main/images/list.png"
                            alt=""
                        />
                        <span className="font-semibold w-fit normal-case  text-xl">
                            Notes
                        </span>
                    </Link>
                </div>
                <div className="navbar-start absolute pl-5 hidden w-fit lg:block">
                    <Link to={"/"} className="flex items-center">
                        <img
                            className=" h-10"
                            src="https://raw.githubusercontent.com/ashikur-rahman-10/note-taking-web/main/images/list.png"
                            alt=""
                        />
                        <span className="font-semibold w-fit normal-case  text-xl">
                            Notes
                        </span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 items-center menu-horizontal px-1">
                        {/* <li>
                            <NavLink
                                className="nav px-3 py-2  text-[#737373] font-medium hover:bg-slate-100 rounded-lg"
                                to={"/"}
                            >
                                Home
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                className="nav px-3 py-2  text-[#737373] font-medium hover:bg-slate-100 rounded-lg"
                                to={"/"}
                            >
                                Create Notes
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className="nav px-3 py-2  text-[#737373] font-medium hover:bg-slate-100 rounded-lg"
                                to={"/saved"}
                            >
                                Saved Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav px-3 py-2  text-[#737373] font-medium hover:bg-slate-100 rounded-lg"
                                to={"/favorites"}
                            >
                                Favorites Notes
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className=" flex text-red-500 text-xs font-medium mr-6 flex-col-reverse hidden lg:block">
                        <div>
                            <small className="text-center">
                                {currentDateTime.toLocaleDateString()}
                            </small>
                        </div>
                        <div>
                            <small className="w-20 text-center">
                                {currentDateTime.toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full justify-center">
                                    {user?.photoURL ? (
                                        <img src={user?.photoURL} />
                                    ) : (
                                        <FaUserAlt className=" p-2 bg-slate-100 flex justify-center items-center w-10 h-10"></FaUserAlt>
                                    )}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
                            >
                                <li>
                                    <a className="justify-between min-h-12">
                                        <div>
                                            {user?.photoURL ? (
                                                <img
                                                    className="w-10 rounded-full outline outline-green-400"
                                                    src={user?.photoURL}
                                                />
                                            ) : (
                                                <FaUserAlt className="w-10 h-10 rounded-full outline outline-green-400 p-1"></FaUserAlt>
                                            )}
                                        </div>
                                        {user?.displayName}
                                    </a>
                                </li>
                                {/* <li>
                                    <a className=" min-h-12 font-medium justify-center">
                                        Settings
                                    </a>
                                </li> */}
                                <li>
                                    <p
                                        className=" min-h-12 text-red-600 font-medium justify-center"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </p>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <span className="mr-10  px-3 py-2  text-[#737373] font-medium hover:bg-slate-50 rounded-lg">
                            <NavLink to={"/login"}>Login</NavLink>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
