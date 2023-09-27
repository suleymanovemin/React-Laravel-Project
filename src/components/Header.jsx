import { NavLink } from "react-router-dom";
import { MainContext, useContext } from "../Context.js";
const Header = () => {
  const { user, setUser } = useContext(MainContext);
  const logOut = () => {
    setUser({});
    localStorage.removeItem("user");
  };
  // console.log(user);
  return (
    <div className="border">
      <div className="flex items-center justify-between container mx-auto max-w-5xl h-[70px]  p-3  ">
        <div>
          <NavLink to="/">Logo</NavLink>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-4 ">
            <li>
              <NavLink
                className="transition-all duration-300 [&.active]:text-sky-400 [&.active]:underline"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="transition-all	duration-300 [&.active]:text-sky-400 [&.active]:underline"
                to="/posts"
              >
                Posts
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          {!user.name ? (
            <ul className="flex items-center justify-center gap-4">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center justify-center gap-4">
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <button className="p-3 bg-yellow-400 text-white transition-all rounded hover:bg-red-500 hover:text-white" onClick={logOut}>
                  Log out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
