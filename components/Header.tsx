"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import { FormEvent, useRef } from "react";
import { toast } from "react-hot-toast";


interface getDataType {
    success: boolean;
    search: string;
    dataset_file: string;
    id: string;
    collector_id: string;
    start_eta: string;
}
function Header() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [attempts, setAttempts] = useState(0);


    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = inputRef?.current?.value;

        if (!input) return;

        const notification  = toast.loading(` Starting a Scraper for ${input}`)
        if (inputRef?.current?.value) {
            inputRef.current.value = "";
        }

        try {
            const res = await fetch("/api/activeScraper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: input }),
            });

            const dataReq_ = await res.json();

            const { collection_id, start_eta } = dataReq_;

            router.push(`/search/${collection_id}`);

            const body: getDataType = {
                success: true,
                search: input,
                dataset_file: input,
                id: collection_id,
                collector_id: collection_id,
                start_eta: start_eta,
            };

            let jsonData = JSON.stringify(body);

            // console.log(jsonData);

            for (let i = 0; i < 3; i++) {
            const res2 = await fetch("/api/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            });

            await new Promise(resolve => setTimeout(resolve, 30000));
            const data_Res_ = await res2.json();
            toast.success("Scraper Started Successfully", {id: notification})
        }



            // console.log("Searching Data.........", dataReq_);
            // console.log("Return data from webHook..", data_Res_);
        } catch (error) {
            toast.error("Whoops... Something went wrong !")
            console.log(error);
        }
    };

    return (
        <header>
            <form
                onSubmit={handleSearch}
                className="flex justify-center item-center py-2 px-4 bg rounded-full bg-indigo-100 max-w-md mx-auto ">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Searching for items if u want"
                    className="flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300"
                />
                <button hidden>Searching</button>
                <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
            </form>
        </header>
    );
}

export default Header;
