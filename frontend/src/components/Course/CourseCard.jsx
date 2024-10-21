import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ doctor1, doctor2, doctor3, single = false }) => {
  if (!single) {
    const id1 = "/doctors/".concat(doctor1["id"]),
      id2 = "/doctors/".concat(doctor2["id"]),
      id3 = "/doctors/".concat(doctor3["id"]);

    return (
      <div className="h-[554.54px] justify-center items-center gap-[47px] inline-flex">
        <Link to={id1}>
          <div className="w-[324.04px] h-[462.11px] relative">
            <div className="w-[324.04px] h-[462.11px] left-0 top-0 absolute bg-white rounded-[32px] shadow" />
            <img
              className="w-[308.08px] h-[207.51px] left-[7.98px] top-[7.98px] absolute rounded-[22px]"
              src={doctor1["img"]}
            />
            <div className="w-[124.51px] h-[48.69px] left-[177.98px] top-[190.75px] absolute bg-[#0067ff] rounded-[15px]" />
            <div className="w-[279.34px] h-[30.33px] left-[23.15px] top-[278.54px] absolute text-black text-[24px] font-normal font-['Apple SD Gothic Neo']">
              {doctor1["name"]}
            </div>
            <div className="w-[279.34px] h-[30.33px] left-[23.15px] top-[324.84px] absolute text-black text-xs font-normal font-['Apple SD Gothic Neo']">
              {doctor1["description"]}
            </div>
            <div className="w-[90.19px] h-[30.33px] left-[51.88px] top-[231.46px] absolute text-black text-s font-normal font-['Apple SD Gothic Neo']">
              {doctor1["avgRating"]} ({doctor1["totalRating"]})
            </div>
            <div className="w-[90.19px] h-[30.33px] left-[194.74px] top-[202.33px] absolute text-center text-[#f2f2f2] text-l font-normal font-['Apple SD Gothic Neo']">
              {doctor1["price"]}
            </div>
            <div className="w-[24.74px] h-[24.74px] left-[20.75px] top-[233.05px] absolute" />
          </div>
        </Link>
        <Link to={id2}>
          <div className="w-[388.85px] h-[554.54px] relative">
            <div className="w-[388.85px] h-[554.54px] left-0 top-0 absolute bg-white rounded-[32px] shadow" />
            <img
              className="w-[369.69px] h-[249.02px] left-[9.58px] top-[9.58px] absolute rounded-[22px]"
              src={doctor2["img"]}
            />
            <div className="w-[149.41px] h-[58.42px] left-[213.58px] top-[228.90px] absolute bg-[#0067ff] rounded-[18px]" />
            <div className="w-[335.21px] h-[36.39px] left-[27.77px] top-[334.26px] absolute text-black text-[32px] font-normal font-['Apple SD Gothic Neo']">
              {doctor2["name"]}
            </div>
            <div className="w-[335.21px] h-[36.39px] left-[27.77px] top-[389.81px] absolute text-black text-l font-normal font-['Apple SD Gothic Neo']">
              {doctor2["description"]}
            </div>
            <div className="w-[108.23px] h-[36.39px] left-[62.25px] top-[277.75px] absolute text-black text-xl font-normal font-['Apple SD Gothic Neo']">
              {doctor2["avgRating"]} ({doctor2["totalRating"]})
            </div>
            <div className="w-[108.23px] h-[36.39px] left-[233.69px] top-[242.40px] absolute text-center text-[#f2f2f2] text-xl font-normal font-['Apple SD Gothic Neo']">
              {doctor2["price"]}
            </div>
            <div className="w-[29.69px] h-[29.69px] left-[24.90px] top-[279.66px] absolute" />
          </div>
        </Link>
        <Link to={id3}>
          <div className="w-[324.04px] h-[462.11px] relative">
            <div className="w-[324.04px] h-[462.11px] left-0 top-0 absolute bg-white rounded-[32px] shadow" />
            <img
              className="w-[308.08px] h-[207.51px] left-[7.98px] top-[7.98px] absolute rounded-[22px]"
              src={doctor3["img"]}
            />
            <div className="w-[124.51px] h-[48.69px] left-[177.98px] top-[190.75px] absolute bg-[#0067ff] rounded-[15px]" />
            <div className="w-[279.34px] h-[30.33px] left-[23.15px] top-[278.54px] absolute text-black text-[24px] font-normal font-['Apple SD Gothic Neo']">
              {doctor3["name"]}
            </div>
            <div className="w-[279.34px] h-[30.33px] left-[23.15px] top-[324.84px] absolute text-black text-xs font-normal font-['Apple SD Gothic Neo']">
              {doctor3["description"]}
            </div>
            <div className="w-[90.19px] h-[30.33px] left-[51.88px] top-[231.46px] absolute text-black text-s font-normal font-['Apple SD Gothic Neo']">
              {doctor3["avgRating"]} ({doctor3["totalRating"]})
            </div>
            <div className="w-[90.19px] h-[30.33px] left-[194.74px] top-[202.33px] absolute text-center text-[#f2f2f2] text-l font-normal font-['Apple SD Gothic Neo']">
              {doctor3["price"]}
            </div>
            <div className="w-[24.74px] h-[24.74px] left-[20.75px] top-[233.05px] absolute" />
          </div>
        </Link>
      </div>
    );
  }
};

export default CourseCard;
