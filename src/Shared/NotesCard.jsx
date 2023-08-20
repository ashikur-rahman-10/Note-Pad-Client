import React from "react";
import {
    FaBoxOpen,
    FaHeart,
    FaHeartBroken,
    FaPen,
    FaTrash,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NotesCard = ({
    note,
    handleDelete,
    handleFavorite,
    handleUnFavorite,
}) => {
    const { title, _id, submissionTime, favorite } = note;
    const formattedDate = new Date(submissionTime).toLocaleDateString(
        undefined,
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
    return (
        <span>
            {
                <div className="m-4">
                    <div className="flex  bg-gradient-to-r from-violet-50 to-fuchsia-200 w-full rounded-xl shadow-md h-48 flex-col mx-auto p-4 border justify-between ">
                        <div className="flex flex-col justify-center h-full  w-full">
                            <h2 className="text-[#737373]">
                                <span className="font-medium underline">
                                    Title:
                                </span>{" "}
                                {title}
                            </h2>
                            <p className="text-xs my-4">
                                Created in:{formattedDate}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                to={`/saved/${_id}`}
                                className="px-2 flex items-center gap-4 py-1 bg-transparent text-info border-2 border-info text-lg  text-center rounded-xl w-fit hover:text-white hover:bg-info hover:border-info mb-0"
                            >
                                Open <FaBoxOpen></FaBoxOpen>
                            </Link>

                            <Link
                                to={`/updateNotes/${_id}`}
                                className="bg-transparent text-success border-2 border-success text-lg p-3 text-center rounded-full w-fit hover:text-sky-100 hover:bg-success hover:border-success mb-0"
                            >
                                <FaPen className=" text-danger"></FaPen>
                            </Link>
                            {favorite ? (
                                <button
                                    onClick={() => {
                                        handleUnFavorite(_id);
                                    }}
                                    className="bg-transparent text-warning border-2 border-warning text-lg p-3 text-center rounded-full w-fit hover:text-error hover:bg-warning hover:border-warning mb-0"
                                >
                                    <FaHeartBroken className=" text-danger"></FaHeartBroken>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleFavorite(_id);
                                    }}
                                    className="bg-transparent text-warning border-2 border-warning text-lg p-3 text-center rounded-full w-fit hover:text-error hover:bg-warning hover:border-warning mb-0"
                                >
                                    <FaHeart className=" text-danger"></FaHeart>
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    handleDelete(_id);
                                }}
                                className="bg-transparent text-error border-2 border-error text-lg p-3 text-center rounded-full w-fit hover:text-white hover:bg-error hover:border-error mb-0"
                            >
                                <FaTrash className=" text-danger"></FaTrash>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </span>
    );
};

export default NotesCard;
