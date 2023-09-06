import Layout from "@/components/Layout";
import Transition from "@/components/Transition";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState(null);
    const [buttonText, setButtonText] = useState("Login");

    const handleLogin = async (e) => {
        e.preventDefault();
        toast('Logging in, Please Wait!',
        {
            icon: '👏',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
        }
        );
        setButtonText("Logging in...");
        const { email, password } = e.target.elements;
        try {
            const response = await fetch(`api/admins?action=login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setButtonText("Success!");
                toast('Login successful, redirecting to dashboard',
                {
                    icon: '👏',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
                localStorage.setItem("token", data.token);
                router.push("/dashboard");
            } else {
                setButtonText("Try Again");
                toast(data.message,
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
                setErrorMsg(data.message);
            }
        } catch (error) {
            toast(data.message,
            {
                icon: '❌',
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            }
            );
            setErrorMsg(error.message);
            setButtonText("Try Again");
        }
    };

  return (
    <>
    <Toaster />
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
            <p className={`text-gray-200 text-center pb-5`}>Login to access the admin dashboard</p>
            <form className={`flex flex-col space-y-2 border border-black bg-white bg-opacity-70 p-16`} onSubmit={handleLogin}>
                <p className={`text-red-500 text-center`}>{errorMsg}</p>
                <h1 className={`text-lg font-bold text-center text-gray-500`}>Login with credentials.</h1>
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Email</label>
                <input type="email" name="email" placeholder="Enter your Email" className={`px-4 py-2 bg-transparent border-2 border-black rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Password</label>
                <input type="password" name="password" placeholder="Enter Your Password" className={`px-4 border-black py-2 bg-transparent border-2 rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <button type="submit" className={`hover:bg-black hover:text-white pt-5 hover:border-gray-500 px-4 py-2 bg-transparent border-2 inline-block border-black text-black justify-center items-center`}>
                    <span className={``}>{buttonText}</span>
                </button>
            </form>
        </div>
        </div>
    <Footer />
    </>
  )
}
