import { useState, useEffect } from "react";

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
		<h1>Hack at UCI Tech Deliverable</h1>

		<h2>Submit a quote</h2>
		{/* TODO: implement custom for submission logic to not refresh the page */}
		<form onSubmit={handleSubmit}>
		<label htmlFor="input-name">Name</label>
		<input type="text" name="name" id="input-name" required />
		<label htmlFor="input-message">Quote</label>
		<input type="text" name="message" id="input-message" required />
		<button type="submit">Submit</button>
		</form>

		<h2>Filter Quotes</h2>
		<div>
			<button onClick={() => handleLimitClick("Last Week")}>Last Week</button>
			<button onClick={() => handleLimitClick("Month")}>Last Month</button>
			<button onClick={() => handleLimitClick("Year")}>Last Year</button>
			<button onClick={() => handleLimitClick("All")}>All</button>
		</div>

		<h2>Previous Quotes</h2>
		<div className="messages">
		{quotes.map((quote, index) => (
			<div key={index}>
			<p><span className="time">{quote.time}</span> <span className="highlight">{quote.name}</span>: {quote.message}</p>
			</div>
		))}
		</div>
	</div>
  );
}

export default App;
