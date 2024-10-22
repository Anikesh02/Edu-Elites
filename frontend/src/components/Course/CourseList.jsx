import React from "react";
import { doctors } from "../../assets/data/courses";
import CourseCard from "./CourseCard";

class CourseList extends React.Component {
  state = {
    idx: 1
  };

  _next = () => {
    if (this.state.idx < doctors.length - 2)
      this.setState({
        idx: this.state.idx + 1
      });
    else
      this.setState({
        idx: 1
      });
  };

  _prev = () => {
    if (this.state.idx > 1)
      this.setState({
        idx: this.state.idx - 1
      });
    else
      this.setState({
        idx: doctors.length - 2
      });
  };

  _set = i => {
    this.setState({
      idx: i
    });
  };

  render() {
    return (
      <div className="w-[100%] h-[60vh] mt-20 absolute flex justify-center items-center">
        <div
          className="absolute w-[50px] h-[80%] left-[50px] top-[120px] items-center justify-center align-middle flex"
          onClick={this._prev}
        >
          <svg
            className="rotate-180"
            fill="#000000"
            height="50px"
            width="50px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
          >
            <path
              id="XMLID_222_"
              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                   	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                   	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                   	C255,161.018,253.42,157.202,250.606,154.389z"
            />
          </svg>
        </div>
        <div
          className="absolute w-[50px] h-[80%] right-[50px] top-[120px] items-center justify-center align-middle flex"
          onClick={this._next}
        >
          <svg
            fill="#000000"
            height="50px"
            width="50px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
          >
            <path
              id="XMLID_222_"
              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                     	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                     	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                     	C255,161.018,253.42,157.202,250.606,154.389z"
            />
          </svg>
        </div>
        <div className="pt-20 flex justify-center items-center gap-[30px] overflow-x-hidden">
          {[...Array(doctors.length).keys()].map(idx => {
            return (
              <div
                className={
                  this.state.idx - 1 <= idx && idx <= this.state.idx + 1
                    ? "block"
                    : "hidden"
                }
              >
                <CourseCard
                  info={doctors[idx]}
                  scale={idx == this.state.idx ? "normal" : "small"}
                />
              </div>
            );
          })}
        </div>
        <div className="absolute top-[65vh] w-[40%] h-3 justify-center items-center gap-[15px] flex">
          {[...Array(doctors.length - 2).keys()].map(idx => {
            return idx + 1 == this.state.idx ? (
              <div
                className="grow shrink basis-0 h-3 bg-[#0067ff] rounded-xl"
                onClick={() => this._set(idx + 1)}
              />
            ) : (
              <div
                className="grow shrink basis-0 h-3 opacity-70 bg-[#d5dae5] rounded-xl"
                onClick={() => this._set(idx + 1)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CourseList;
