import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ info, scale = "normal" }) => {
  return (
    <div
      className={
        scale == "normal"
          ? "justify-center items-center gap-[47px] inline-flex"
          : "justify-center items-center gap-[47px] inline-flex scale-75"
      }
    >
      <Link to={"/doctors/".concat(info["id"])}>
        <div className="w-[25vw] aspect-card relative bg-white rounded-[1.8rem] shadow p-[0.5vw]">
          <img
            className="w-[24vw] h-[45%] rounded-[1.5rem]"
            src={info["img"]}
          />
          <div className="w-[40%] h-[11%] right-[1.5vw] -translate-y-1/2 absolute bg-[#0067ff] rounded-[1rem] flex items-center justify-center text-[#f2f2f2] text-[0.95rem] font-normal font-['Apple SD Gothic Neo']">
            {info["price"]}
          </div>
          <div className="pt-[5%] pl-[1.8vw] flex-inline align-middle justify-center items-start">
            <svg
              className="float-left"
              width="20"
              height="20"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5623 10.4536L14.7757 3.98087C15.1881 3.14993 16.3799 3.14993 16.7924 3.98087L20.0057 10.4536L27.1919 11.498C28.1139 11.632 28.4813 12.7589 27.8139 13.4053L22.6149 18.4402L23.8418 25.553C23.9994 26.4665 23.0351 27.163 22.2101 26.7316L15.784 23.3715L9.35794 26.7316C8.53297 27.163 7.56864 26.4665 7.7262 25.553L8.95314 18.4402L3.75428 13.4053C3.08677 12.7589 3.45425 11.632 4.37625 11.498L11.5623 10.4536Z"
                stroke="#FFD16F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="pl-[10px] float-left text-black text-[1rem] font-normal font-['Apple SD Gothic Neo']">
              {info["avgRating"]} ({info["totalRating"]})
            </span>
          </div>
          <br />
          <div className="pt-[7%] pl-[1.8vw] text-black text-[1.5rem] font-normal font-['Apple SD Gothic Neo']">
            {info["name"]}
          </div>
          <div className="w-[24vw] pt-[5%] pl-[1.8vw] text-black text-[0.8rem] font-normal font-['Apple SD Gothic Neo']">
            {info["description"]}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
