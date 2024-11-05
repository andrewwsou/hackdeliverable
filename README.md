# Hack at UCI Tech Organizer Deliverable
 
Thank you for your interest in applying to the Hack at UCI Tech team!

In order for your application to be considered, you must complete this
deliverable. Please follow the instructions below.

## Setup

### Cloning

Clone this repository to your local machine by running the command below:

```bash
git clone https://github.com/HackAtUCI/tech-deliverable.git
```

If you are unfamiliar with `git`, we recommend that you become familiar
with it as soon as possible!

Once you've cloned this repository, you'll need to install some dependencies for the frontend client and the backend API.

### Frontend Setup

Install the dependencies in the frontend directory with `npm` or `yarn`:

```bash
cd frontend
npm ci
```

### Backend Setup

For the Python dependencies, we recommend creating a virtual enviroment:

```bash
python3 -m venv .venv
```

To activate the environment, run the appropriate command for your operating system:

#### Windows

```bat
.\.venv\Scripts\activate
```

#### macOS/Unix

```bash
source .venv/bin/activate
```

Finally, use `pip` to install the required libraries for the backend:

```bash
pip install -r requirements.txt
```

## Development

To start development, launch the development servers on the frontend and backend.
Both development servers also support hot reload, so the instances are refreshed
whenever relevant files are modified.

### Starting the frontend development server

```bash
cd frontend
npm run dev
```

This will start Vite's development server, and the frontend should now be
accessible at `http://localhost:5173`.

### Starting the backend development server

```bash
cd api
python3 src/main.py
```

This will start a Uvicorn server to run the FastAPI app on port 8000.

### Working between the frontend and backend servers

Any requests sent to `/api/*` on the frontend will automatically be forwarded to
the API with to the path prefix removed.
For example, accessing `http://localhost:5173/api/hello` will be the same as
accessing `http://localhost:8000/hello`.

## Tasks

Hack at UCI is currently working on setting up a quote book so its members can
post fun quotes made by one another. They need _your_ help to finish it!

The application is relatively simple. The home page will provide an interface
for users to submit quotes and display all of the existing quotes which are
stored in the "database" (This is in quotes because we use a dictionary and a
JSON file to simulate a database!) When a user submits a quote, it should
automatically appear on the home page after all the previous quotes.

The tech stack this application uses is React for the frontend with Vite used
as the build tool and FastAPI (Python). We've provided some basic components
for the homepage, but you'll need to design the component(s) for displaying
quotes and styling for the entire frontend. The way you choose to style this
application is completely up to you, so feel free to be as creative as you want!
For the backend, we've provided a route which handles the form submission for
creating a quote, but you'll also need to create a new API route which allows
the frontend to retrieve quotes from the database.

Our [deliverable requirements](https://hackatuci.notion.site/Hack-at-UCI-Tech-Deliverable-2024-2025-4b3080f485b24c60ba3c0da37aa1b972)
describe the full specifications of the deliverable along with additional notes
and resources.

**Note:** Feel free to customize the development environment however you want
(i.e. add formatters or linters to your liking). Just be sure to not modify any
of the starter code that we've provided for you (except for the web form)!

Once you feel as if your message board is complete, please create your own
GitHub repository, push your changes to there, and provide the link to it in
the Airtable form for your application. Once again, thank you for your interest
in applying to the Hack at UCI Tech team and we look forward to reviewing your
application!
