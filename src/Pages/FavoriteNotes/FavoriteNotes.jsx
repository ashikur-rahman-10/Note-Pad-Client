import React, { useContext, useEffect, useState } from "react";
import NotesCard from "../../Shared/NotesCard";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { MagnifyingGlass } from "react-loader-spinner";

const FavoriteNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // anoter api https://notepad-server-chi.vercel.app
    useEffect(() => {
        fetch(
            `https://notes-server-nine.vercel.app/favorites?email=${user.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
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
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://notes-server-nine.vercel.app/favorites/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const reamaingNotes = notes.filter(
                                (note) => note._id !== id
                            );
                            setNotes(reamaingNotes);
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        }
                        console.log(data);
                    });
            }
        });
    };

    const handleUnFavorite = (id) => {
        fetch(`https://notes-server-nine.vercel.app/favorites/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ favorite: false }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire("Note Removed From Favorite", "", "warning");
                    const reamaingNotes = notes.filter(
                        (note) => note._id !== id
                    );
                    const UpdatedNotes = notes.find((note) => note._id == id);
                    setNotes(reamaingNotes);
                    UpdatedNotes.favorite = false;
                }
            });
    };
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div className="min-h-[92vh]">
            <h1 className="text-center text-3xl font-medium py-10">
                Favorite Notes:{notes.length}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3  pb-10 w-full mx-auto">
                {notes.map((note) => (
                    <NotesCard
                        key={note._id}
                        note={note}
                        handleDelete={handleDelete}
                        handleUnFavorite={handleUnFavorite}
                    ></NotesCard>
                ))}
            </div>
        </div>
    );
};

export default FavoriteNotes;
