import React, { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const AddBlog = () => {

const navigate = useNavigate();
const editor = useRef(null);

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState("");

const publish = async () => {
  const { error } = await supabase
    .from("blogs")
    .insert([
      {
        title,
        content,
        image
      }
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Blog Added");
  navigate("/admin/dashboard");
};

return (
  <div className="max-w-2xl mx-auto p-10">

    <h1 className="text-2xl font-bold mb-6">
      Add Blog
    </h1>

    <input
      className="border p-2 w-full mb-4"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <JoditEditor
      ref={editor}
      value={content}
      onBlur={(newContent) => setContent(newContent)}
      config={{
        readonly: false,
        height: 400,
      }}
    />

    <button
      onClick={publish}
      className="bg-black text-white px-6 py-2 rounded mt-4"
    >
      Publish
    </button>

  </div>
);
};

export default AddBlog;