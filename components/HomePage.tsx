import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

function HomePage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <DocumentMagnifyingGlassIcon className="w-64 h-64 text-indigo-600/20" />
                <h1 className="xl:text-xl xs:text-base">Welcome to The Amazon Web Scraper App</h1>
                <h2 className=" italic text-b/50 xl:text-xs  xs:text-xs">
                    To learn how to code form Zero to Hero, visit my{" "}
                    <a
                        className="font-bold text-red-600 "
                        href="https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA"
                        target="_blank">
                        YouTube channel
                    </a>
                </h2>
            </div>
        </>
    );
}

export default HomePage;
