import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useUser } from "../../UserContext.jsx";

const Header = () => {
  const { user, updateUser } = useUser();

  let navLinks = [
    {
      path: "/home",
      display: "Home"
    },
    {
      path: "/doctors",
      display: "Explore"
    },
    {
      path: "/myCourses",
      display: "Courses"
    },
    {
      path: "/test",
      display: "Test"
    },
    {
      path: "/studentProfile",
      display: "Progress"
    },
    {
      path: "/personal",
      display: "Recommendations"
    }
  ];

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  return (
    <header className="w-[100%] flex top-5 fixed z-10 mx-auto justify-center items-center">
      <div className="w-[90%] h-[60px] relative z-10 flex-inline">
        <div className="w-[100%] h-[60px] rounded-[124px] shadow-inner backdrop-blur-xl">
          <div className="w-[100%] h-[60px] mix-blend-overlay bg-white rounded-[124px] shadow-inner opacity-40 absolute -z-10" />
          <div className="w-[100%] h-[60px] flex lg:justify-start justify-center items-center pl-[30px] pr-[15px] gap-2">
            <img
              className="w-[120px] h-[21px] absolute lg:relative"
              src={logo}
            />
            <div
              className="hidden lg:inline-flex w-[100%] h-[100%] pl-[5%] pr-2.5 py-2.5 rounded-[124px] justify-start items-center gap-[20px] navigation"
              ref={menuRef}
              onClick={toggleMenu}
            >
              <ul className="flex menu items-start gap-[2.7rem]">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={navClass =>
                        navClass.isActive
                          ? "text-center text-black text-[1.1vw] font-normal font-['Apple SD Gothic Neo']"
                          : "text-center text-black text-[1.1vw] font-normal font-['Apple SD Gothic Neo']"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/register">
              <div className="hidden lg:block w-[8vw] h-[35px] top-[12px] z-10 rounded-[4vw] border border-[#0067ff] float-right">
                <div className="text-center text-[#0067ff] text-[1.1vw] font-normal leading-[32px] font-['Apple SD Gothic Neo']">
                  Sign up
                </div>
              </div>
            </Link>
            <Link to="/login">
              <div className="hidden lg:block w-[8vw] h-[35px] top-[12px] z-10 bg-[#0067ff] rounded-[4vw] float-right">
                <div className="text-center text-[#f2f2f2] text-[1.1vw] font-normal leading-[32px] font-['Apple SD Gothic Neo']">
                  Log in
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
