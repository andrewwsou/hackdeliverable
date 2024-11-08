// Quote.js
import React from "react";
import "./Quote.css";

function Quote({ quote }) {
  return (
    <div className="quote-container">
      <p>
        <span className="time">{quote.time}</span>
        <span className="name"><span className="name">{quote.name}:</span>
        <span className="message"> {quote.message}</span></span>
      </p>
    </div>
  );
}

export default Quote;
