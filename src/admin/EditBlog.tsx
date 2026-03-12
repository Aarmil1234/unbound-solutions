import React,{useEffect,useState} from "react"
import { useParams,useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

const EditBlog = () => {

const { id } = useParams()
const navigate = useNavigate()

const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const [image,setImage] = useState("")

useEffect(()=>{

const getBlog = async () => {

const { data } = await supabase
.from("blogs")
.select("*")
.eq("id",id)
.single()

if(data){
setTitle(data.title)
setContent(data.content)
setImage(data.image)
}

}

getBlog()

},[id])

const updateBlog = async () => {

const { error } = await supabase
.from("blogs")
.update({
title,
content,
image
})
.eq("id",id)

if(error){
alert(error.message)
return
}

alert("Blog Updated")

navigate("/admin/dashboard")

}

return (

<div className="max-w-2xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Edit Blog
</h1>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 w-full mb-4"
/>

<input
value={image}
onChange={(e)=>setImage(e.target.value)}
className="border p-2 w-full mb-4"
/>

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
className="border p-2 w-full mb-4 h-40"
/>

<button
onClick={updateBlog}
className="bg-black text-white px-6 py-2 rounded"
>
Update Blog
</button>

</div>

)

}

export default EditBlog