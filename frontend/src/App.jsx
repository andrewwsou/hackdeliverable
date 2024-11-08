import { useState, useEffect } from "react";
import Quote from "./Quote";
import "./App.css";
import { quotebooklogo } from "../Assets";

function App() {
  const [quotes, setQuotes] = useState([]); // set the quotes to quotes
  const [selectedLimit, setSelectedLimit] = useState("All"); // set default state of quotes displayed to all

  const fetchQuotes = async (limit) => { // get quotes from database using api endpoint to display
    try {
      const response = await fetch(`/api/quote?limit=${limit}`);
      if (response.ok) {
        const data = await response.json();
        setQuotes(data.quotes);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => { // actually fetch the quotes of the selected limiter
    fetchQuotes(selectedLimit);
  }, [selectedLimit]);

  const handleLimitClick = (limit) => { // determine which limiter is selected
    setSelectedLimit(limit);
  };
  const handleSubmit = async (event) => { // prevent page reload when submitting data but still display new quotes
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const message = form.message.value;

    try {
      const response = await fetch("/api/quote", { // post quote into database using api endpoint
        method: "POST",
        body: new URLSearchParams({
          name,
          message,
        }),
      });
      if (response.ok) {
        fetchQuotes(selectedLimit);
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
    form.reset();
  };
	

  return (
    <div className="App">
		{/* TODO: include an icon for the quote book */}
		<div className="logo-container">
        <img src={quotebooklogo} alt="Quote Book Logo" className="quote-logo" />
      </div>
	
	<div className="AppTitle">
		<h1>Hack at UCI Tech Deliverable</h1>
	</div>
		<h2>Submit a quote</h2>
		{/* TODO: implement custom for submission logic to not refresh the page */}
		<form onSubmit={handleSubmit}>
		<label htmlFor="input-name" className="form-label">Name</label>
		<input type="text" name="name" id="input-name" required />
		<label htmlFor="input-message" className="form-label">Quote</label>
		<input type="text" name="message" id="input-message" required />
		<button type="submit">Submit</button>
		</form>
		
		<h2>Quotes</h2>
		<div className="dropdownMenu">
			<select value={selectedLimit} onChange={(e) => handleLimitClick(e.target.value)}>
				<option value="Last Week">Last Week</option>
				<option value="Month">Last Month</option>
				<option value="Year">Last Year</option>
				<option value="All">All</option>
			</select>
		</div>


		<div className="messages" key={selectedLimit}>
		{quotes.map((quote, index) => (
          <Quote key={index} quote={quote} />
		))}
		</div>
	</div>
  );
}

export default App;
