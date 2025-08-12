"use client";
import React from "react";
import { useRouter } from "next/navigation";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            onClick={() => router.push("/dashboard")}
            className="text-lg font-semibold cursor-pointer"
          >
            ShopEase
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} My eCommerce Store
      </footer>
    </div>
  );
};

export default UserLayout;
