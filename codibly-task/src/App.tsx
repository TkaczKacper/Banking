import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Form } from './components';

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
     <h1>Hello!</h1>
     <Form />
    </QueryClientProvider>
  )
}

export default App