"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";

export default function Admin() {
  const router = useRouter();

  const onHandle = () => {
    router.push("/");
    localStorage.removeItem("token");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      localStorage.removeItem("token");
    }
  }, []);
  return (
    <main className="admin">
      <h1>Admin Page</h1>

      <Button variant="contained" size="large" onClick={onHandle}>
        Logout
      </Button>
    </main>
  );
}
