import Transition from "@/components/Transition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Transition />
      <Navbar />
      {/* Title, Description, and Login Form */}
      <div
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/A9QFr4W.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",  // Set minimum height to cover the viewport
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 25,
        }}
      >
        <div className={`flex flex-col items-center justify-center h-screen space-y-4 p-10 text-white`}>
          <h1 className={`text-4xl font-bold text-center text-gray-100`}>Alfeco Boardroom Management</h1>
          <p className={`text-gray-200 text-center pb-5`}>Login to access the dashboard</p>
          <form className={`flex flex-col space-y-2 border border-black bg-white bg-opacity-70 p-16`}>
            <h1 className={`text-lg font-bold text-center text-gray-500`}>Login with your work email.</h1>
            <button 
              type="submit" 
              className="hover:bg-black hover:text-white pt-5 hover:border-gray-500 px-4 py-2 bg-transparent border-2 inline-block border-black text-black justify-center items-center" 
              onClick={(e) => { e.preventDefault(); signIn("microsoft", { callbackUrl: '/dashboard' }); }}> <span className={``}>Login with Microsoft</span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
