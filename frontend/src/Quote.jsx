import React from "react";

function Quote({ quote }) {
  return (
    <div>
      <p>
        <span className="time">{quote.time}</span>{" "}
        <span className="highlight">{quote.name}</span>: {quote.message}
      </p>
    </div>
  );
}

export default Quote;