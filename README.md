## Overview of the Functionality

This application allows users to enter a **source** and **destination** in input fields and fetches the **formatted addresses** along with the **distance** between them using an API.

### **Key Features:**

- Users enter **source** and **destination** addresses.
- On clicking the **"Calculate Distance"** button, an API request is called. The button text will change to "Loading..." after clicking it and we cannot click the button if the previous request is pending.
- The API returns:
  - **Formatted Source Address**
  - **Formatted Destination Address**
  - **Distance in Kilometers**
- If the source and destination are unique, the entry is **saved in the database** for admin use.
- Previously searched distances are **stored locally using Redux** and displayed below the input fields as **Previous Searches**.
- Users can view their past searches without re-fetching from the API.

### **Technologies Used:**

- **Frontend:** React, Redux, Axios
- **Backend:** Django (with OpenStreetMap API for geocoding)
- **State Management:** Redux for caching search history

# Project Setup Instructions

## Frontend Setup

1. **Node Version**:  
   Ensure you are using Node.js version `18.18.0`.  
   If you're using Node Version Manager (nvm), run:
   ```bash
   nvm use 18.18.0
   ```
2. Install Dependencies:
   Run the following command to install all necessary packages:
   ```bash
   npm install
   ```
3. Start the Development Server:
   Start the frontend project with:
   ```bash
   npm start
   ```

## Backend Setup for login

1. **Create a Superuser**:
   Run the following command to create a superuser for the Django admin panel:
   ```bash
   python manage.py createsuperuser
   ```
2. **Login with Superuser Credentials**:
   Access the admin panel at `http://127.0.0.1:8000/admin` and log in using the credentials of the superuser you just created.
   Also login to frontent app using this credentials

## Backend (Django)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Database Setup

1. Create a MYSQL database and user.

   ```sql
   CREATE DATABASE ChannelFactoryTask;
   ```

   **Give Privileges**

   ```sql
   GRANT ALL PRIVILEGES ON ChannelFactoryTask.* TO 'root'@'localhost';
   ```

   ex. GRANT ALL PRIVILEGES ON ChannelFactoryTask.\* TO 'root'@'localhost' WITH GRANT OPTION;

   **Save changes**

   ```sql
   FLUSH PRIVILEGES;
   ```

   **Verify Privileges**:

   ```
   SHOW GRANTS FOR 'root'@'localhost';
   ```

2. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Running the Server

1. Create a superuser for admin access:
   ```bash
   python manage.py createsuperuser
   ```
2. Start the development server:
   ```bash
   python manage.py runserver
   ```
3. The API will be available at `http://127.0.0.1:8000/`.

4. Access the admin panel at `http://127.0.0.1:8000/admin`.
