import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface Blog{
id:number
title:string
content:string
image:string
category:string
}

const BlogDetail:React.FC = () => {

const {id} = useParams()

const [blog,setBlog] = useState<Blog | null>(null)

useEffect(()=>{

const getBlog = async () => {

const { data } = await supabase
.from("blogs")
.select("*")
.eq("id",id)
.single()

if(data){
setBlog(data)
}

}

getBlog()

},[id])

if(!blog){
return <div className="p-10">Loading...</div>
}

return (

<div className="max-w-4xl mx-auto p-10">

<img
src={blog.image}
className="w-full h-80 object-cover rounded"
/>

<h1 className="text-4xl font-bold mt-6">
{blog.title}
</h1>

<p className="mt-6 text-gray-700 leading-relaxed">
{blog.content}
</p>

</div>

)

}

export default BlogDetail