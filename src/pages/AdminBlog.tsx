import React, { useState } from "react";
import { supabase } from "../lib/supabase";

interface BlogForm {
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
}

const AdminBlogs: React.FC = () => {

  const [form, setForm] = useState<BlogForm>({
    title: "",
    description: "",
    content: "",
    category: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addBlog = async () => {

    if (!form.title || !form.content) {
      alert("Title and Content are required");
      return;
    }

    try {

      setLoading(true);

      const { data, error } = await supabase
        .from("blogs")
        .insert([form])
        .select();

      if (error) {
        console.error("Insert Error:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      console.log("Inserted Data:", data);

      alert("Blog Added Successfully!");

      // reset form
      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        image: ""
      });

    } catch (err) {

      console.error("Unexpected Error:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-2xl font-bold mb-6">
          Admin Blog Panel
        </h1>

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* Category */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* Image */}
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* Content */}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Blog Content"
          className="border p-3 w-full mb-4 rounded h-40"
        />

        {/* Button */}
        <button
          onClick={addBlog}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full hover:bg-gray-800 transition"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>

      </div>

    </div>
  );
};

export default AdminBlogs;