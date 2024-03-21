"use client";
import { ReactNode } from "react";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import  getApolloClient  from "../app/lib/client";
// import { SearchProvider } from "./components/context";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const client = getApolloClient();
  return (
    <html lang="en"> 
      
      <body> 
      
        <ApolloProvider client={client}>
         
          {children}
        
          </ApolloProvider>
 
      </body>
    </html>  

)
};