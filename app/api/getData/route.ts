import * as admin from "firebase-admin";
import { adminDb } from "@/app/firebase/firebaseAdmin";

export async function POST(request: Request) {
    const body = await request.json();

    console.log("API", body);

    const dataRequest = JSON.parse(body);

    const res = await fetch(
        `https://7nvpx4v7ya2lzltbkb54ynqcku0qcnct.lambda-url.ap-southeast-1.on.aws`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        }
    );

    const data = await res.json();

    const { id } = dataRequest;

    // save data on firebase realtime
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
