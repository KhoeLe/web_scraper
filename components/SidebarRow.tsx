import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "react-spinkit";

interface Props {
    doc: DocumentData;
}
function SidebarRow({ doc }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(doc.id));
    }, [pathname, doc]);

    // console.log(doc.data());
    return (
        <li
            onClick={() => router.push(`/search/${doc.id}`)}
            className={`flex flex-col md:flex-row gap-1 justify-between p-4 cursor-pointer hover:bg-white hover:shadow-md rounded-lg  ${
                active ? "bg-white shadow-md" : ""
            }`}>
            <div>
                <p className="text-xs md:text-base font-bold ">
                    {doc.data().search}
                </p>
                {doc?.data()?.status === "building" ? (
                    <p className="text-xs"> Scraping information.... </p>
                ) : null}
            </div>
            <span className="ml-2">
                {doc.data().status === "building" ? (
                    <Spinner
                        name="cube-grid"
                        fadeIn="none"
                        color="indigo"/>
                ) : (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                )}
            </span>
        </li>
    );
}

export default SidebarRow;
