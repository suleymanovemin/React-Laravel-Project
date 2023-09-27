import axios from "axios";
import { MainContext, useContext } from "../Context";
import { Navigate } from "react-router-dom";
import { useRef } from "react";

const Profile = () => {
  const { user } = useContext(MainContext);
  const a = JSON.parse(localStorage.getItem("user"));
  const imageRef = useRef();
  if (!a) {
    return <Navigate to="/login" />;
  }

  console.log(user);
  
  const addPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append("user_id", user.id);
console.log(formData);
    axios
      .post("http://localhost:8000/api/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res));
  };

  return (
    <div className="container mx-auto">
      <div className="w-[60%] mx-auto  my-[50px] flex items-center justify-content-center flex-col">
        <div className="flex mx-auto items-center justify-content-center gap-4">
          <div className="rounded-full border w-[80px] h-[80px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:8000/uploads/profile/${user?.profile_image}`}
              alt=""
            />
          </div>
          <div className="text-center">
            <p>
              Xoş gəldiz 
              
              
              <span className="text-sky-400 font-medium font-sans underline ml-2">
                {user?.name} 
                {user?.surname}
              </span>
            </p>
          </div>
          <form
            onSubmit={addPhoto}
            method="POST"
            className="flex items-center justify-content-between gap-2"
          >
            <label
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"
              htmlFor="image"
            >
              Şəkil yükə
              <input
                id="image"
                style={{ display: "none" }}
                type="file"
                ref={imageRef}
                name="image"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
              />
            </label>
            <button
              className="mt-1 block w-full px-3 py-2 bg-white border border-green-300 rounded-md text-sm shadow-sm"
              type="submit"
            >
              Dəyiş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
