import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const NoteDetails = () => {
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { title, descriptions, textColor, _id, submissionTime, ownerName } =
        note;

    useEffect(() => {
        fetch(`https://notes-server-nine.vercel.app/notes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setNote(data);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center mx-auto items-center">
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            </div>
        );
    }
    const textStyle = {
        color: textColor,
    };

    const formattedDate = new Date(submissionTime).toLocaleDateString(
        undefined,
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    const formattedTime = new Date(submissionTime).toLocaleTimeString();

    return (
        <div className=" min-h-[92vh] bg-gradient-to-t from-violet-50 to-fuchsia-100  mx-auto max-w-lg lg:max-w-3xl">
            <div className=" min-h-[92vh] lg:bg-white h-full w-full p-4  mx-auto max-w-lg lg:max-w-3xl">
                <div className="flex justify-between items-center gap-6 px-3">
                    <div className="flex justify-center  w-[75%]">
                        {" "}
                        <h1 className="text-xl text-[#737373] font-medium">
                            {title}
                        </h1>
                    </div>
                    <span className="text-gray-500 text-xs font-medium w-[25%] flex flex-col">
                        <span className="flex gap-1">
                            <span className="hidden lg:block">Date:</span>{" "}
                            {formattedDate}
                        </span>
                        <span className="hidden lg:block">
                            Time: {formattedTime}
                        </span>
                    </span>
                </div>
                <hr className="my-4" />
                <div className="max-w-full mb-20 px-3">
                    <p style={textStyle} className="whitespace-pre-wrap">
                        <span> </span> {descriptions}
                    </p>
                </div>
                <hr />
                <div className="text-center text-[#737373] text-xs my-4">
                    <small>This notes created by: {ownerName}</small>
                </div>
            </div>
        </div>
    );
};

export default NoteDetails;
