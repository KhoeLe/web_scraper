export async function POST (request: Request){

    const body = await request.json();

   console.log("API",body)


    const res = await fetch(`https://7nvpx4v7ya2lzltbkb54ynqcku0qcnct.lambda-url.ap-southeast-1.on.aws`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
  });
}
