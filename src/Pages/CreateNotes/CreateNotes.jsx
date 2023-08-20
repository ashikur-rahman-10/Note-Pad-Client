import { data } from "autoprefixer";
import "./CreateNotes.css";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSave = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const descriptions = form.descriptions.value;
        const textColor = form.color.value;
        const userEmail = user.email;
        const submissionTime = new Date();
        const ownerName = user.displayName;
        const favorite = false;
        const note = {
            title,
            descriptions,
            textColor,
            userEmail,
            submissionTime,
            ownerName,
            favorite,
        };
        // console.log(note);
        fetch("https://notes-server-nine.vercel.app/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    Swal.fire({
                        title: "Notes Saved Successfully",
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });

                    event.target.reset();
                    navigate("/saved");
                }
            });
    };
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div className="lg:min-h-[90vh] min-h-[85vh] notes  w-full  flex justify-center items-center">
            <form onSubmit={handleSave} className="space-y-5">
                <div>
                    <label className="label">
                        <span className="text-[#737373] text-sm font-medium">
                            Notes Title
                        </span>
                    </label>
                    <input
                        type="text"
                        name="title"
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
                        Save Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNotes;
