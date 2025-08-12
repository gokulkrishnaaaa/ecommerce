import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
        <nav className="flex space-x-8">
          <Link
            href="/admin/addproduct"
            className="hover:text-blue-400 transition-colors"
          >
            Add Product
          </Link>
          <Link
            href="/admin/manageproduct"
            className="hover:text-blue-400 transition-colors"
          >
            Manage Products
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default Layout;
