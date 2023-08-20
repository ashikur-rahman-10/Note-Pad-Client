import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const Register = () => {
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState("");

    const loginThen = (result) => {
        const user = result.user;
        Swal.fire({
            title: "User Login Successfull!",
            icon: "success",
            confirmButtonText: "Ok",
        });
        setError("");
        console.log(user);
    };

    const handleSubmit = (event) => {
        setError("");
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser(name)
                    .then(() => {
                        console.log("Name update Successfull");
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                Swal.fire({
                    title: "User Created Successfull!",
                    text: "Do you want to continue",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setError("");
                console.log(user);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error.message);
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
            <div className="hero  min-h-[85vh] lg:min-h-[90vh]">
                <div className="hero-content flex-col justify-center w-11/12 lg:flex-row">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h1 className="text-3xl text-center font-bold">
                                Sign Up{" "}
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
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
                                    Sign up
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
                                <Link to={"/login"} className="text-[#ff3811]">
                                    Login
                                </Link>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
