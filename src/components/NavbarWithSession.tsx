"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function NavbarWithSession() {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
}
