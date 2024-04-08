import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import MessageProvider from "./providers/MessageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MessageProvider>
      <MainLayout>
        <App />
      </MainLayout>
    </MessageProvider>
  </BrowserRouter>
);
