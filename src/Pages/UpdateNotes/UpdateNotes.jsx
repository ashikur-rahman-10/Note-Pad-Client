import { useContext, useInsertionEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";

const UpdateNotes = () => {
    const { user } = useContext(AuthContext);
    const savedNote = useLoaderData();

    const handleSaveChanges = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const descriptions = form.descriptions.value;
        const textColor = form.color.value;

        const note = {
            title,
            descriptions,
            textColor,
        };
        // console.log(note);
        fetch(`https://notes-server-nine.vercel.app/notes/${savedNote._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.acknowledged) {
                    Swal.fire("Edited Successfully", "", "success");
                    window.history.back();
                }
            });
    };
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div className="lg:min-h-[90vh] min-h-[92vh] notes  w-full  flex justify-center items-center">
            <form onSubmit={handleSaveChanges} className="space-y-5">
                <div>
                    <label className="label">
                        <span className="text-[#737373] text-sm font-medium">
                            Notes Title
                        </span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={savedNote.title}
                        required
                        placeholder="Notes Title(Compulsory)"
                        className="input input-bordered input-info  w-[300px] "
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-[#737373] text-sm font-medium">
                            Descriptions
                        </span>
                    </label>
                    <textarea
                        placeholder="Descriptions(Optional)"
                        name="descriptions"
                        defaultValue={savedNote.descriptions}
                        className="textarea textarea-info h-32  w-[300px]"
                    />
                </div>
                <div className="w-full">
                    <label className="label">
                        <p className="text-[#737373] text-center w-full text-sm font-medium">
                            Pick a Color For Your Notes
                        </p>
                    </label>
                    <span className="w-full flex justify-center">
                        <input
                            className="input-bordered outline outline-info"
                            type="color"
                            defaultValue={savedNote.textColor}
                            name="color"
                            id=""
                        />
                    </span>
                </div>

                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="bg-info text-white font-medium w-full py-2 rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNotes;
