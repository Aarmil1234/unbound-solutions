import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

const Blogs: React.FC = () => {

  const [blogs,setBlogs] = useState<Blog[]>([])

  useEffect(()=>{

    const getBlogs = async () => {

      const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at",{ascending:false})

      if(data){
        setBlogs(data)
      }

    }

    getBlogs()

  },[])

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Blogs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {blogs.map((blog)=>(
          <div
          key={blog.id}
          className="border rounded-lg overflow-hidden shadow"
          >

            <img
            src={blog.image}
            className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h2 className="text-xl font-bold">
                {blog.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {blog.description}
              </p>

              <Link
              to={`/blogs/${blog.id}`}
              className="text-blue-600 mt-3 block"
              >
                Read More →
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>

  )

}

export default Blogs