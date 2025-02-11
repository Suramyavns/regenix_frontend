import { Provider } from "@/components/ui/provider";
import "./globals.css";

export const metadata = {
  title: {
    default: "Regenix",
    template: "Regenix - %s"
  },
  description: "The only sustainable guidance app you need!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
