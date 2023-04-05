import * as admin from "firebase-admin";
import { adminDb } from "../../firebase/firebaseAdmin";
export async function POST(request: Request) {

    const body = await request.json();

    const bodyJson = JSON.stringify(body);

    console.log("API", bodyJson);


    let data;

    try {
        const res = await fetch(
            `https://7nvpx4v7ya2lzltbkb54ynqcku0qcnct.lambda-url.ap-southeast-1.on.aws`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: bodyJson,
            }
        );
        console.log("Data fetched successfully without retry");
        data = await res.json();
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);

        // Retry logic
        let retries = 3;
        while (retries > 0) {
            retries--;
            try {
                const res = await fetch(
                    `https://7nvpx4v7ya2lzltbkb54ynqcku0qcnct.lambda-url.ap-southeast-1.on.aws`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: bodyJson,
                    }
                );

                // data = await res.json();
                console.log("Data fetched successfully after retry");
                break;
            } catch (error) {
                console.error(
                    `Error occurred while fetching data in retry ${retries}: `,
                    error
                );
                if (retries === 0) {
                    console.error("Max retries reached, unable to fetch data");
                }
            }
        }
    }

    // Use the data after fetching
    // console.log("Data: ", data);
    const dataRequest = JSON.parse(bodyJson);

    const { id } = dataRequest;

    //save data on firebase realtime
    await adminDb.collection("searches").doc(id).set(
        {
            status: "completed",
            updatedAt: admin.firestore.Timestamp.now(),
            results: data,
        },
        {
            merge: true,
        }
    );

    return new Response(JSON.stringify(data), {
        status: 200,
    });
}
