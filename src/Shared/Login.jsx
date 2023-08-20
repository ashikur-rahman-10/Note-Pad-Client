import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState("");

    const location = useLocation();
    // console.log(location);
    const from = location?.state?.pathname || "/";

    const navigate = useNavigate();

    const loginThen = (result) => {
        const user = result.user;
        Swal.fire({
            title: "User Login Successfull!",
            icon: "success",
            confirmButtonText: "Ok",
        });
        setError("");
        navigate(from, { replace: true });
        console.log(user);
    };
    const handleSubmit = (event) => {
        setError("");
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                event.target.reset();
                loginThen(result);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                loginThen(result);
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div>
            <div className="hero min-h-[85vh] lg:min-h-[90vh]">
                <div className="hero-content flex-col justify-center w-11/12 lg:flex-row">
                    {/* <div className="text-center lg:text-left">
                        <img src={img} alt="" />
                    </div> */}
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h1 className="text-3xl text-center font-bold">
                                Login{" "}
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                <label className="label">
                                    <Link
                                        href="#"
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot password?
                                    </Link>
                                </label>
                            </div>
                            <span className="text-center">
                                <small className="text-[#FF0000] font-medium">
                                    {error}
                                </small>
                            </span>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-[#ff3811] border-none"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="text-center space-y-4">
                                <small className="text-center">
                                    Or Sign In With
                                </small>
                                <div className="text-center flex items-center justify-center gap-4">
                                    <div
                                        onClick={handleGoogle}
                                        className=" cursor-pointer bg-[#F5F5F8] p-3 rounded-full hover:bg-blue-200 "
                                    >
                                        <FaGoogle></FaGoogle>
                                    </div>
                                    {/* <div className=" cursor-pointer bg-[#F5F5F8] p-3 rounded-full hover:bg-blue-200 ">
                                        <FaFacebook></FaFacebook>
                                    </div>
                                    <div className=" cursor-pointer bg-[#F5F5F8] p-3 rounded-full hover:bg-blue-200 ">
                                        <FaLinkedin></FaLinkedin>
                                    </div> */}
                                </div>
                            </div>
                            <small className="text-center mt-2">
                                Are you new here?
                                <Link
                                    to={"/register"}
                                    className="text-[#ff3811]"
                                >
                                    Register
                                </Link>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
