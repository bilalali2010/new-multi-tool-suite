import { ChakraProvider } from "@chakra-ui/react";

export const metadata = {
  title: "AI Multi-Tool Suite",
  description: "Smart tools for writing & creativity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
