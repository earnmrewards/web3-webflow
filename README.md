# Alchemy Web3 Embed System for Webflow

This project blends Web3 and Web2 technologies to enhance a Webflow application with new blockchain capabilities. By integrating Web3 features and retaining classic Web2 functionalities like data fetching and external API communication.

---

## **Adding a New Feature**

To test a new feature mode, you need to:

1. **Create a new HTML file** in the root directory. For example:  
   `new-feature.html`

2. **Manually add a new script in the `package.json`:**

   Open `package.json` and add a new entry under `scripts`:

   ```json
   "dev:new-feature": "vite --mode new-feature --port 3000"
   ```

3. **Run the command** for the new feature:

   ```bash
   pnpm run dev:new-feature
   ```

4. **URL for the new feature:**  
   [http://localhost:3000/new-feature](http://localhost:3000/new-feature)

---

## **Running the Application**

### **Feature Modes**

Each feature requires a specific **command and URL**. When you run a command, the browser will **automatically open** with the correct URL.

#### 1. **Sales Feature**

To start the app in **sales mode**, run:

```bash
pnpm run dev:sales
```

- **URL for Sales Mode:** [http://localhost:3000/sales](http://localhost:3000/sales)

#### 2. **Partner Dashboard Feature**

To start the app in **partner-dashboard mode**, run:

```bash
pnpm run dev:partner-dashboard
```

- **URL for Partner Dashboard Mode:** [http://localhost:3000/partner-dashboard](http://localhost:3000/partner-dashboard)

> **Note:** Both modes use the same port (`3000`). Make sure only **one instance** is running at a time to avoid conflicts.

---

## **How to Test Different Features**

1. **Stop any running instance** by closing the terminal or stopping the process.
2. **Run the appropriate command** for the feature you want to test (see the commands above).
3. The browser will **automatically open** the correct URL for the selected feature.

---

## **Testing and Code Quality**

To run the tests, use the following command:

```bash
pnpm run test
```

This will execute the entire test suite and display the results.

---
