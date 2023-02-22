import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

import { Badge } from "antd";

const Menu = () => {
  // context
  const [auth, setAuth] = useAuth();
 
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>       

        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORIES
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>

              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

      
   

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}

export default Menu;