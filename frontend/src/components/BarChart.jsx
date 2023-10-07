import React from "react";
import Chart from "react-apexcharts";
import Linechart from "./LineChart";

function Barchart() {
  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        {/* <h3 className="text-center mt-3 mb-3">Bar Chart in ReactJS</h3> */}

        <Chart
          type="bar"
          width={800}
          height={500}
          series={[
            {
              // name: "Social Media Subscriber",
              data: [65, 67, 32, 98, 23, 51, 24],
            },
          ]}
          options={{
            title: {
              text: "BarChar",
              style: { fontSize: 30 },
            },

            subtitle: {
              // text: "This is BarChart Graph",
              style: { fontSize: 18 },
            },

            colors: ["#f90000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "English",
                "Hindi",
                "Mathematics",
                "Science",
                "Marathi",
                "Geography",
                "History",
              ],
              title: {
                text: "Your Progress",
                style: { color: "#f90000", fontSize: 30 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#f90000"] },
              },
              title: {
                text: "Marks",
                style: { color: "#f90000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
        <Barchart/>
       
      </div>
    </React.Fragment>
  );
}

export default Barchart;