"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";

export default function Admin() {
  const currentPage = usePathname();
  console.log(currentPage);

  const router = useRouter();
  console.log(router);

  const onHandle = () => {
    router.push("/");
    localStorage.removeItem("token");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      localStorage.removeItem("token");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Admin Page</h1>

      <Button variant="contained" size="large" onClick={onHandle}>
        Logout
      </Button>
    </main>
  );
}
