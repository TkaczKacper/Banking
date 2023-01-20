import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Form } from "./components/form/Form";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Form />
    </QueryClientProvider>
  );
};

export default App;
