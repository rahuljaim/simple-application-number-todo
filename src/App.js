import { useState } from "react";
import "./App.css";
import mock from "./mock";

const App = () => {
  const [input, setInput] = useState("");
  const [ticketdata, setTicketdata] = useState([]);
  const [isdis, setIsdis] = useState(false);

  function handler(e) {
    console.log("top", input);
    const num = Number(e.target.value);
    if (num <= 9 && input.length !== 6) {
      setInput(input.concat(e.target.value));
    }
    if (input.length > 6) {
      setIsdis(true);
    }
    if (e.target.value === "DELETE") {
      console.log(e.target.value);
      setInput("");
    }
    if (e.target.value === "RESET") {
      let tempVal = input.slice(0, -1);

      console.log(e.target.value);
      setInput(tempVal);
    }
  }

  function addTicketHandler() {
    if (ticketdata.length !== 5) {
      let tempArr = ticketdata.concat(input);
      setTicketdata(tempArr);
    }
    if (ticketdata.length === 5) {
      alert("Ticket Limit Reached");
    }
  }
  function deleteHandler(id) {
    let another = ticketdata.filter((e, i) => i !== id);
    setTicketdata(another);
  }
  function randomGenerator() {
    if (ticketdata.length !== 5) {
      let newvalue = parseInt(Math.random() * 100000) * 10;
      let tempArr = ticketdata.concat(newvalue);

      setTicketdata(tempArr);
    }
    if (ticketdata.length === 5) {
      alert("Ticket Limit Reached");
    }
  }

  console.log(ticketdata);
  let item = mock.keys.map((e, i) => (
    <>
      {/* {console.log(e.value)} */}
      <div
        className={`col bg-light ${e.border}`}
        style={{ height: "50px", textAlign: "center", padding: "4px" }}
        key={i}
      >
        <button
          type="button"
          className="btn btn-light"
          id={e.id}
          value={e.value}
          style={{ boxShadow: "none" }}
          key={e.id}
          onClick={handler}
          disabled={isdis}
        >
          {e.label}
        </button>
      </div>
    </>
  ));
  return (
    <div className="container">
      <div
        className="card text-bg-primary mb-3"
        style={{ maxWidth: "650px", margin: "20px auto", padding: "5px" }}
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="card" style={{ width: "18rem", color: "black" }}>
              <div className="card-body">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Enter 6 Digits"
                    value={input}
                    disabled
                    style={{
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "white",
                    }}
                  />

                  <label htmlFor="floatingPassword">
                    <span
                      className="badge rounded-pill text-bg-danger text-wrap"
                      style={{ width: "6rem" }}
                    >
                      Enter 6 Digits
                    </span>
                  </label>
                </div>

                <div className="row row-cols-3">{item}</div>
                <div className="row">
                  <div
                    className="col bg-light border"
                    style={{
                      height: "50px",
                      textAlign: "center",
                      padding: "4px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-light"
                      style={{ boxShadow: "none" }}
                      onClick={addTicketHandler}
                    >
                      <i className="fa-regular fa-square-plus"></i> ADD TICKET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">
                Click the circle to generate random tickets
              </h5>
              <button
                type="button"
                className="btn btn-primary rounded-circle"
                onClick={randomGenerator}
              >
                <div
                  className="spinner-border"
                  style={{
                    width: " 3rem",
                    height: "3rem",
                    textAlign: "center",
                    padding: "7rem",
                    marginLeft: "1rem",
                  }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
              <p className="card-text">Ticket number range: 100000 - 999999</p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div class="row row-cols-3">
            {ticketdata.map((item, index) => {
              return (
                <>
                  <div
                    className="card border-primary mb-3"
                    style={{ maxWidth: "18rem" }}
                  >
                    <button
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                      value={item}
                      style={{ boxShadow: "none" }}
                      onClick={function () {
                        return deleteHandler(index);
                      }}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <div className="card-body text-primary">
                      <h5 className="card-title">Ticket #{index}</h5>
                      <p className="card-text">{item}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
