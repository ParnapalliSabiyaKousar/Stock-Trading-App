import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./StockChart.css";


const chartData = [
  {
    day: "Mon",
    price: 210,
  },
  {
    day: "Tue",
    price: 220,
  },
  {
    day: "Wed",
    price: 215,
  },
  {
    day: "Thu",
    price: 230,
  },
  {
    day: "Fri",
    price: 245,
  },
  {
    day: "Sat",
    price: 240,
  },
];


export default function StockChart() {

  const { id } = useParams();


  return (

    <div className="chart-page">

      <Link to="/stocks" className="back-btn">
        ← Back to Stocks
      </Link>


      <h1>
        📊 Stock Chart
      </h1>


      <h2>
        Stock ID : {id}
      </h2>


      <div className="chart-box">


        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />


            <Line
              type="monotone"
              dataKey="price"
              stroke="#0d6efd"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>


      </div>


    </div>

  );

}