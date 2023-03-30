"use client"
import { useRouter } from "next/navigation"


interface Props {
    params: {
        id: string
    }
}


// This page is rendered at DYNAMIC ROUTES /search/[id]/page

function page({params :{id}} : Props) {



  return (
    <div>
        <h1>
            Product Page {id}
        </h1>
    </div>
  )
}

export default page
