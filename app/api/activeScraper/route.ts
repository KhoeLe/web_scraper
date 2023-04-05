import * as admin from "firebase-admin";
import { adminDb } from "@/app/firebase/firebaseAdmin";

export async function POST(request: Request) {
    const body = await request.json();

    const { search } = body;

    const url = `https://api.brightdata.com/dca/trigger?collector=c_lfte6txdybl1uuxhb&queue_next=1`;

    const config = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KEY_BRIGHTDATA}`,
    };

    // console.log("debugger", body);

    const res = await fetch(url, {
        method: "POST",
        headers: config,
        body: JSON.stringify({ search }),
    });

    const data = await res.json();

    const { collection_id, start_eta } = data;

    await adminDb.collection("searches").doc(collection_id).set(
        {
            search,
            start_eta,
            status: "building",
            updatedAt: admin.firestore.Timestamp.now(),
            // results : data,
        },
        {
            merge: true,
        }
    );

    // console.log(data);
    return new Response(JSON.stringify(data), {
        status: 200,
    });
}
