import Layout from "@/components/Layout";
import Transition from "@/components/Transition";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Add_Admin() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState(null);
    const [buttonText, setButtonText] = useState("Register");

    const handleRegister = async (e) => {
        e.preventDefault();
        toast('Registering, Please Wait!',
        {
            icon: '👏',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
        }
        );
        setButtonText("Registering...");
        const { name, phone, email, password, confirmPassword } = e.target.elements;
        try {
            const response = await fetch(`api/admins?action=register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.value,
                    phone: phone.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setButtonText("Success!");
                toast('Registration successful, redirecting to dashboard',
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
        {/* Title, Description, and Registration Form */}
        <div
          style={{
            backgroundImage: "url('https://wallpapercave.com/wp/A9QFr4W.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh", 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop : 25,
          }}
        >
        <div className={`flex flex-col items-center justify-center h-screen space-y-4 my-40 p-10 text-white`}>
            <h1 className={`text-4xl font-bold text-center text-gray-100`}>Alfeco Boardroom Management</h1>
            <p className={`text-gray-200 text-center pb-5`}>Register to access the admin dashboard</p>
            <form className={`flex flex-col space-y-2 border bg-white bg-opacity-70 border-black p-16`} onSubmit={handleRegister}>
                <p className={`text-red-500 text-center`}>{errorMsg}</p>
                <h1 className={`text-lg font-bold text-center text-gray-500`}>Register with credentials.</h1>
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Full Name</label>
                <input name="name" required type="text" placeholder="Enter your Full Name" className={`px-4 py-2 bg-transparent border-2 border-black rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Phone Number</label>
                <input name="phone" required type="number" placeholder="Enter your Phone Number" className={`px-4 py-2 bg-transparent border-2 border-black rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Email</label>
                <input name="email" required type="email" placeholder="Enter your Email" className={`px-4 py-2 bg-transparent border-2 border-black rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Password</label>
                <input name="password" required type="password" placeholder="Enter Your Password" className={`px-4 border-black py-2 bg-transparent border-2 rounded-lg text-black`} />
                <h2 className={`h-1 w-full bg-gray-500`}></h2>
                <label className={`text-gray-500`}>Confirm Password</label>
                <input name="confirmPassword" required type="password" placeholder="Confirm Your Password" className={`px-4 border-black py-2 bg-transparent border-2 rounded-lg text-black`} />
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
