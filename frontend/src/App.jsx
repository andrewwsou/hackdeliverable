import { useState, useEffect } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes function
  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quote?limit=All");
      if (response.ok) {
        const data = await response.json();
        setQuotes(data.quotes); // Update quotes state
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

//   const handleSubmit = async = (event) => {
//     event.preventDefault();
	

  return (
    <div className="App">
		{/* TODO: include an icon for the quote book */}
		<h1>Hack at UCI Tech Deliverable</h1>

		<h2>Submit a quote</h2>
		{/* TODO: implement custom for submission logic to not refresh the page */}
		<form method="post" action="/api/quote">
		<label htmlFor="input-name">Name</label>
		<input type="text" name="name" id="input-name" required />
		<label htmlFor="input-message">Quote</label>
		<input type="text" name="message" id="input-message" required />
		<button type="submit">Submit</button>
		</form>

		<h2>Previous Quotes</h2>
		<div className="messages">
		{quotes.map((quote, index) => (
			<div key={index}>
			<p><span className="highlight">{quote.name}</span>: {quote.message}</p>
			</div>
		))}
		</div>
	</div>
  );
}

export default App;
