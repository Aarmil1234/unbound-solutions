import React,{useState} from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {

const navigate = useNavigate()

const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const [image,setImage] = useState("")

const publish = async () => {

const { error } = await supabase
.from("blogs")
.insert([
{
title,
content,
image
}
])

if(error){
alert(error.message)
return
}

alert("Blog Added")

// redirect to dashboard
navigate("/admin/dashboard")

}

return (

<div className="max-w-2xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Add Blog
</h1>

<input
className="border p-2 w-full mb-4"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
className="border p-2 w-full mb-4"
placeholder="Image URL"
value={image}
onChange={(e)=>setImage(e.target.value)}
/>

<textarea
className="border p-2 w-full mb-4 h-40"
placeholder="Content"
value={content}
onChange={(e)=>setContent(e.target.value)}
/>

<button
onClick={publish}
className="bg-black text-white px-6 py-2 rounded"
>
Publish
</button>

</div>

)

}

export default AddBlog