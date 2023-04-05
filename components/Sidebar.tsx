"use client";
import { db } from "@/app/firebase/config";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarRow from "./SidebarRow";

function Sidebar() {
    const [snapshot, loading, error] = useCollection(
        query(collection(db, "searches"), orderBy("start_eta", "desc"))
    );

    return (
        <div className="p-2 pr-2 h-full py-6 border-b md:p-10 border-indigo-500/50">
            <div className="flex flex-col items-center justify-center mt-10 flex-1">
                <DocumentMagnifyingGlassIcon className="h-16 text-indigo-600 md:w-16 " />
                <h1 className="hidden text-3xl t-2 md:inline text-center mb-2 font-bold">
                    Web Scraper
                </h1>
                <h2 className="hidden text-xs italic md:inline text-center">
                    Scraping the Unscramble
                </h2>
            </div>

            <ul className="flex flex-col flex-1 gap-2 overflow-y-auto py-4 space-y-4 max-h-[42rem] ">
                {snapshot?.docs?.map((doc) => (
                    <SidebarRow doc= {doc} key={doc.id}/>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
