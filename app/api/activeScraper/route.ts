export async function POST(request: Request) {
    const body = await request.json();

    const {success,search,dataset_file,id,collector_id,start_eta}  = body;


    const url = `https://api.brightdata.com/dca/trigger?collector=c_lfte6txdybl1uuxhb&queue_next=1`;

    const config = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KEY_BRIGHTDATA}`,
    };

    const res = await fetch(url, {
        method: "POST",
        headers: config,
        body: JSON.stringify({ success,search,dataset_file,id,collector_id,start_eta }),
    });

    const data = await res.json();

    console.log(data)
    return new Response(JSON.stringify(data), {
      status: 200,
  });

}
