import Link from "next/link";

import {v4 as uuidv4}  from "uuid"


interface resultsType {
    results: Product[];
}

function Results({ results }: resultsType) {

    const renderLinkResult = results.map((result) => (
        <Link
            target="__blank"
            key={uuidv4()}
            href={result.url}
            className="flex flex-col space-x-1 w-full bg-white rounded-lg shadow-md p-5 xs:text-center">
            <img
                key={uuidv4()}
                srcSet={result.imageset}
                alt={result.title}
                className="object-contain w-full h-40 py-5"
            />
            <div  key={uuidv4()} className="flex flex-col py-5 flex-1">
                {/* <p className="font-bold text-base xs:text-xs sm:text-xl md:text-base lg:text-base ">{result.title}</p> */}
                <p className="font-bold text-base overflow-hidden whitespace-nowrap text-ellipsis xs:text-xs ">{result.title}</p>
                <p className="font-sm text-gray-500 text-base xs:text-xs">
                    {result.rating} ({result.views} reviews)
                </p>
                <div className="flex space-x-2 justify-end flex-1">
                    <p className="font-bold text-indigo-500 pt-2 text-xl mt-auto xs:text-xs">
                        ${result.price ? result.price : "N/A"}
                    </p>
                    {result.previous_price > 0 ? (
                        <p className="font-bold text-indigo-500/50 line-through pt-2 text-xl mt-auto xs:text-xs">
                            ${result.previous_price}
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-wrap  gap-2 justify-end mt-5">
                    {result.features.map((feature) => (
                            feature ? ( <p className="text-xs bg-indigo-500 px-2 py-1 text-white rounded-md"> {feature}</p>) : null
                    ))}
                </div>
            </div>
        </Link>
    ));

    return (
        <div
            className="grid
            lg:grid-cols-4
            xl:grid-cols-6
            xs:grid-cols-2
            gap-5
            w-full
            ">
            {renderLinkResult}
        </div>
    );
}

export default Results;
