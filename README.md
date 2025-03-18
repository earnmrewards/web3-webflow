# Alchemy Web3 Embed System for WebFlow

This project blends Web3 and Web2 technologies to enhance a WebFlow application with new blockchain capabilities. By integrating Web3 features and retaining classic Web2 functionalities like data fetching and external API communication.

---

## **Adding a New Feature**

To create a new feature mode, you need to:

1. **Create a new HTML file** in the root directory, for example `new-feature.html`, and add the `feature` attribute to the `body` tag:

```html
<body feature="new-feature">
  ...
</body>
```

2. **Create the feature component** in the `/features` directory and associate the feature id:

```tsx
export function NewFeature() {
  return <h1>Hello World</h1>;
}

NewFeature.featureId = "new-feature";
```

3. **Add the feature component** to the features list in the `/features/index.tsx` file

4. **Manually add a new script in the `package.json`:**

   Open `package.json` and add a new entry under `scripts`:

   ```json
   "dev:new-feature": "vite --mode new-feature --port 3000"
   ```

5. **Run the command** for the new feature:

   ```bash
   pnpm run dev:new-feature
   ```

6. **URL for the new feature:**  
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

- **URL for Sales Mode:** [http://localhost:3000/sales.html](http://localhost:3000/sales.html)

#### 2. **Partner Dashboard Feature**

To start the app in **partner-dashboard mode**, run:

```bash
pnpm run dev:partner-dashboard
```

- **URL for Partner Dashboard Mode:** [http://localhost:3000/partner-dashboard.html](http://localhost:3000/partner-dashboard.html)

#### 3. **Token Exchange Feature**

To start the app in **token exchange mode**, run:

```bash
pnpm run dev:token-exchange
```

- **URL for Token Exchange Mode:** [http://localhost:3000/token-exchange.html](http://localhost:3000/token-exchange.html)

#### 4. **Staking Feature**

To start the app in **staking mode**, run:

```bash
pnpm run dev:staking
```

- **URL for Staking Mode:** [http://localhost:3000/staking.html](http://localhost:3000/staking.html)

> **Note:** All modes use the same port (`3000`). Make sure only **one instance** is running at a time to avoid conflicts.

## **Building & Deploying the app**

In order to build correctly, it is necessary to configure the 3 environments:

- `.env.local` → Used for running locally
- `.env.development` → Used whenever you build in dev (staging) mode
- `.env.production` → Used whenever you build without a specific environment

> **Note:** To access the envs for each environment and for more updates, please access the vault (`1Password`).

After this pre-stage, you need to:

1. **Update the project version** in `package.json`

   - Follow [Semantic Versioning](https://semver.org/) to maintain a structured versioning system. This ensures automatic cache updates on [jsDelivr](https://www.jsdelivr.com/)

2. **Build the project** for the desired environment:
   - For **staging**, run:
     ```sh
     pnpm run build:dev
     ```
   - For **production**, run:
     ```sh
     pnpm run build
     ```
3. **Commit & push** the built files to the feature branch.

4. **Update WebFlow version** to ensure that the correct version within the `Custom Code` section in the page settings is set correctly

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
