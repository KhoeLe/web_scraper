"use client";
import { db } from "@/app/firebase/config";
import Results from "@/components/Results";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";
import Spinner from "react-spinkit";

interface Props {
    params: {
        id: string;
    };
}

// This page is rendered at DYNAMIC ROUTES /search/[id]/page

function SearchPage({ params: { id } }: Props) {
    const [snapshot, loading, error] = useDocument(doc(db, "searches", id));

    const router = useRouter();

    const handleDelete = () => {
        deleteDoc(doc(db, "searches", id));
        router.push("/");
    };

    const deleteBtnRender = (
        <button
            onClick={handleDelete}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            {" "}
            Delete Search
        </button>
    );

    if (loading) {
        <h1 className="text-center p-10 text-xl text-indigo-500/50 animate-pulse">
            Loading Result......
        </h1>;
    }

    console.log("FireStore", snapshot?.data());

    if (!snapshot?.exists()) return;

    if (snapshot?.data()?.status === "building") {
        return (
            <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
                <p className="text-indigo-600 animate-pulse text-center">
                    Scraping results from Amazon
                </p>
                <Spinner
                    style={{
                        height: "100px",
                        width: "100px",
                    }}
                    name="cube-grid"
                    fadeIn="none"
                    color="indigo"
                />
                {deleteBtnRender}
            </div>
        );
    }

    return (
        <div className="py-5">
            <div className="flex items-center justify-between mb-7">
                <div className="flex flex-col md:flex-row gap-x-4">
                    <h1 className="font-bold">
                        Search results for{" "}
                        <span className="text-indigo-600 ">
                            {snapshot?.data()?.search} "
                        </span>
                    </h1>
                    <p className="text-gray-300">
                        {snapshot?.data()?.results?.message.length > 0 &&
                            `${
                                snapshot?.data()?.results?.message.length
                            } results found`}
                    </p>
                </div>
                {deleteBtnRender}
            </div>
            {snapshot?.data()?.results?.message.length > 0 ? (
                <div>
                    <Results
                        results={snapshot?.data()?.results?.message}
                        key={snapshot?.data()?.results?.message.url}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default SearchPage;
