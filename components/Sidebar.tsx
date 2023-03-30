import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Sidebar() {
    return (
        <div className="p-2 py-6 overflow-y-auto border-b md:p-10 border-indigo-500/50">
            <div className="flex flex-col items-center justify-center mt-10">
                <DocumentMagnifyingGlassIcon className="h-16 text-indigo-600 md:w-16 " />
                <h1 className="hidden text-3xl t-2 md:inline text-center mb-2 font-bold">Web Scraper</h1>
                <h2 className="hidden text-xs italic md:inline text-center">
                    Scraping the Unscramble
                </h2>
            </div>

            <ul>
                {/* sidebarRow */}
                {/* sidebarRow */}
                {/* sidebarRow */}

            </ul>
        </div>
    );
}

export default Sidebar;
