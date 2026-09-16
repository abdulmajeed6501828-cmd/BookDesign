import React from "react";
import { ApiContext, submitContact, submitOrder } from "./apiClient";

export function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={{ submitOrder, submitContact }}>
      {children}
    </ApiContext.Provider>
  );
}
