# Car Dealer App

## Overview

The Car Dealer App is a Next.js web application designed for browsing and filtering vehicle models based on make and year. Users can explore available vehicle models from different car manufacturers and model years, all presented in a clean, interactive interface.

---

## Access the App

You can either run the app locally or access it online:

- **Run Locally**: Follow the steps in the "Running the Application" section to run the app on your machine.
- **Access Online**: You can also access the live version of the app hosted on Vercel by clicking the link below:

  - [Car Dealer App - Live Version](https://car-dealer-beta.vercel.app)

---

**Features**

- Browse vehicle models by make and year.
- Filter and display results dynamically.
- Elegant UI with interactive elements like hover effects and smooth transitions.

---

**Requirements**

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

**Installation**

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/car-dealer-app.git
   cd car-dealer-app
   ```

2. Install dependencies

   Using npm:

   ```
   npm install
   ```

   Or, if you prefer yarn:

   ```
   yarn install
   ```

3. Set up environment variables
   Make sure you have the required environment variables set up. You can create a .env.local file at the root of the project if necessary.

---

**Running the Application**

Start the application in development mode:

```
npm run dev
```

Or, using yarn:

```
yarn dev
```

This will start the app at http://localhost:3000. The development
server will automatically reload as you make changes to the source code.

---

**Screenshots**
Here are a few screenshots of the app in action:

- **Home page (Next Button disabled):** ![Home page](./app_screenshots/home.png)
- **Selecting Vehicle Type:** ![Selecting Vehicle Type](./app_screenshots/selecting_type.png)
- **Loading Make:** ![Loading Make](./app_screenshots/loading_make.png)
- **Next Button (Enabled):** ![Next Button Enabled](./app_screenshots/next_button_enabled.png)
- **Next Button (Redirecting):** ![Next Button Redirecting](./app_screenshots/next_button_redirecting.png)
- **Vehicle Model Results:** ![Vehicle Model Results](./app_screenshots/results_page.png)

**Usage**

1. Once the app is running, go to http://localhost:3000 in your browser.
2. Select a car manufacturer and a model year to view available vehicle models.
3. The app will dynamically fetch and display models for the selected make and year.
