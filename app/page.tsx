"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Home() {
  const currentPage = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (currentPage === "/admin" && !localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard Page</h1>

      <Button variant="contained" size="medium">
        <Link href="/login">Login</Link>
      </Button>
    </main>
  );
}
