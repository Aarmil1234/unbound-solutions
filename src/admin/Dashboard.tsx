import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [blogs, setBlogs] = useState<any[]>([])

    useEffect(() => {

        const getBlogs = async () => {

            const { data } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false })

            setBlogs(data || [])

        }

        getBlogs()

    }, [])

    const deleteBlog = async (id: number) => {

        const { error } = await supabase
            .from("blogs")
            .delete()
            .eq("id", id)

        if (error) {
            alert(error.message)
            return
        }

        setBlogs((prev) => prev.filter((blog) => blog.id !== id))

    }

    return (

        <div className="max-w-6xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <Link
                to="/admin/add-blog"
                className="bg-black text-white px-4 py-2 rounded"
            >
                Add Blog
            </Link>

            <div className="mt-8">

                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="border p-4 mb-4 flex justify-between"
                    >

                        <div>
                            <h2 className="font-bold">
                                {blog.title}
                            </h2>
                        </div>

                      <div className="flex gap-4">

<Link
to={`/admin/edit-blog/${blog.id}`}
className="text-blue-500"
>
Edit
</Link>

<button
onClick={()=>deleteBlog(blog.id)}
className="text-red-500"
>
Delete
</button>

</div>

                    </div>
                ))}

            </div>

        </div>

    )

}

export default Dashboard