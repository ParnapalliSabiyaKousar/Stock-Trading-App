import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./AdminStockChart.css";

export default function AdminStockChart() {

  const [stocks, setStocks] = useState([]);

  const [form, setForm] = useState({
    companyName: "",
    symbol: "",
    currentPrice: "",
    changePercent: "",
  });


  useEffect(() => {
    loadStocks();
  }, []);


  const loadStocks = async () => {

    try {

      const res = await axiosInstance.get("/stocks");

      setStocks(res.data.stocks);

    } catch(err){

      console.log(err);

    }

  };


  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };


  const addStock = async()=>{

    try{

      await axiosInstance.post("/stocks",form);

      alert("Stock Added");

      setForm({
        companyName:"",
        symbol:"",
        currentPrice:"",
        changePercent:""
      });

      loadStocks();

    }
    catch(err){

      console.log(err);

    }

  };



  const deleteStock = async(id)=>{

    try{

      await axiosInstance.delete(`/stocks/${id}`);

      alert("Stock Deleted");

      loadStocks();

    }
    catch(err){

      console.log(err);

    }

  };



  const updatePrice = async(stock)=>{


    const price = prompt(
      "Enter new price",
      stock.currentPrice
    );


    if(!price) return;


    try{


      await axiosInstance.put(
        `/stocks/${stock._id}`,
        {
          currentPrice:price
        }
      );


      alert("Price Updated");

      loadStocks();


    }
    catch(err){

      console.log(err);

    }

  };



  return (

    <>

      <Navbar />


      <div className="admin-chart-page">


        <Sidebar />


        <div className="admin-content">


          <h1>
            Admin Stock Management
          </h1>



          <div className="add-stock">


            <h2>
              Add New Stock
            </h2>



            <input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
            />



            <input
              name="symbol"
              placeholder="Stock Symbol"
              value={form.symbol}
              onChange={handleChange}
            />



            <input
              name="currentPrice"
              placeholder="Current Price"
              value={form.currentPrice}
              onChange={handleChange}
            />



            <input
              name="changePercent"
              placeholder="Change %"
              value={form.changePercent}
              onChange={handleChange}
            />



            <button onClick={addStock}>
              Add Stock
            </button>


          </div>





          <div className="stock-table">


            <h2>
              Market Stocks
            </h2>



            {
              stocks.map((stock)=>(


                <div 
                className="admin-stock-card"
                key={stock._id}
                >


                  <div>

                    <h3>
                      {stock.companyName}
                    </h3>


                    <p>
                      Symbol:
                      {" "}
                      {stock.symbol}
                    </p>


                    <p>
                      Price:
                      ₹ {stock.currentPrice}
                    </p>


                    <p>
                      Change:
                      {stock.changePercent}%
                    </p>


                  </div>




                  <div className="admin-buttons">


                    <button
                    className="edit"
                    onClick={()=>updatePrice(stock)}
                    >
                      Edit Price
                    </button>



                    <button
                    className="delete"
                    onClick={()=>deleteStock(stock._id)}
                    >
                      Delete
                    </button>


                  </div>


                </div>


              ))
            }



          </div>


        </div>


      </div>


    </>

  );

}