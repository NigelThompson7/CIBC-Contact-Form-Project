# CIBC-Contact-Form-Project
## Setup Instructions

### Prerequisites

Need Node.js and PostgreSQL

### Installation

1. Clone the repository to your local machine and navigate to it:

    git clone https://github.com/your-username/contact-form-project.git
    cd "CIBC Contact Form Project"

2. Install the required Node.js packages:

    npm install

### Database Setup

1. Open PostgreSQL and create a new database with your username:

    psql -U yourusername -h localhost
    CREATE DATABASE contactdb;
    \q

2. Create a `.env` file in the root directory of the project with the following content:

    DB_USER=yourusername
    DB_HOST=localhost
    DB_DATABASE=contactdb
    DB_PASSWORD=yourpassword
    DB_PORT=5432

    Replace `yourusername` and `yourpassword` with your actual PostgreSQL username and password.

### Running the Application

1. Start the Node.js server:

    node server.js

2. Open your browser and navigate to:

    http://localhost:3000

## Usage

1. Fill out the contact form with your first name, last name, email, and phone number.
2. Click the "Submit" button.
3. Check the browser console for confirmation that the contact was saved.
4. Verify the data in the PostgreSQL database.
