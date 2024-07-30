import React from "react";
import ReactDOM from "react-dom/client";
import { Providers } from "./components/providers.tsx";
import "./styles/global.css";
import { AuthModalButton } from "./components/buttons/auth-modal-button.tsx";
import { LogoutButton } from "./components/buttons/logout-button.tsx";
import { UserAddress } from "./components/texts/user-address.tsx";
import { SuccessfullyTransactionHash } from "./components/texts/successfully-transaction-hash.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <AuthModalButton />
      <LogoutButton />
      <UserAddress />
      <SuccessfullyTransactionHash />
    </Providers>
  </React.StrictMode>
);
