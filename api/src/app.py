from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase
import json


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]: # initializes database
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse: # adds quotes to database
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)
    
    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)

@app.get("/quote")
def get_quotes(limit: str): # retrieves quotes based on limiter
    current_date = datetime.now()
    week_ago = current_date - timedelta(weeks = 1)
    month_ago = current_date - timedelta(days = 31)
    year_ago = current_date - timedelta(days = 365)

    if limit == "Last Week":
        json_data = [x for x in database["quotes"] if datetime.fromisoformat(x["time"]) >= week_ago]
        return {"quotes": json_data}    
    elif limit == "Month":
        json_data = [x for x in database["quotes"] if datetime.fromisoformat(x["time"]) >= month_ago]
        return {"quotes": json_data}  
    elif limit == "Year":
        json_data = [x for x in database["quotes"] if datetime.fromisoformat(x["time"]) >= year_ago]
        print(f"Filtered {limit} quotes: {len(json_data)} quotes found")
        return {"quotes": json_data}    
    else:
        return {"quotes": database["quotes"]}
