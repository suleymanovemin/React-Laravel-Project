import axios from "axios";
import { useRef, useState } from "react";
import { MainContext, useContext } from "../Context";


const Posts = () => {
  const [titleErr, setTitleErr] = useState();
  const [descriptionErr, setDescErr] = useState();
  const [imageErr, setImageErr] = useState();
  const [userErr, setUserErr] = useState();
  const [message, setMessage] = useState("");
  const [errmessage, setErrMessage] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  // user
  const { user } = useContext(MainContext);

  const addPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("image", imageRef.current.files[0]);
    formData.append("user_id", user.id);

    try {
      const response = await axios.post("http://localhost:8000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.status === 200) {
        setMessage("Post added successfully");
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        imageRef.current.value = "";
      }
    }catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        const errorData = error.response.data.errors;
        setTitleErr(errorData.title ? errorData.title[0] : "");
        setDescErr(errorData.description ? errorData.description[0] : "");
        setImageErr(errorData.image ? errorData.image[0] : "");
        setUserErr(errorData.user_id ? errorData.user_id[0] : "");
      } else {
        setMessage("Xəta baş verdi");
        console.error(error);
      }
    }

  };
  return (
    <div className="container mx-auto max-w-md">
      {" "}
      <h1 className="text-center my-5 text-[22px]">LOGIN</h1>
      <form className="text-center" onSubmit={addPost}>
        <div className="text-green-500">{message}</div>
        <div className="text-red-500">{userErr?"Əvvəlcə giriş edin!!":""}</div>
        <div className="text-red-500">{errmessage}</div>
        <label className="block my-4">
          <span className="my-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Title
          </span>
          <input
            ref={titleRef}
            type="text"
            name="title"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Title"
          />
          <div className="text-red-500">{titleErr}</div>
        </label>
        <label className="block my-4">
          <span className="my-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Description
          </span>
          <textarea
            ref={descriptionRef}
            name="description"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Description"
          ></textarea>
          <div className="text-red-500">{descriptionErr}</div>
        </label>
        <label className="block my-4">
          <span className="my-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Description
          </span>
          <input
            ref={imageRef}
            name="image"
            type="file"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
          <div className="text-red-500">{imageErr}</div>
        </label>

        <button className="w-full rounded p-4 bg-blue-500 text-[#fff] transition-all hover:bg-green-500">
          Add
        </button>
      </form>
    </div>
  );
};

export default Posts;
