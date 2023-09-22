import { useState, useEffect } from 'react';
import { tabs } from '@/components/Data';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import DashNav from '@/components/DashNav';
import ChatIcon from '@/components/ChatSupport';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function DashboardPage () {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('home');
  const { data: session, status } = useSession();
  const router = useRouter();

  const TabComponent = tabs.find(tab => tab.id === selectedTab)?.component;

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (status === 'loading') return;  // Wait until session status is resolved
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  console.log(session?.user?.image);
  console.log(session?.user?.name);
  console.log(session?.user?.email);
  console.log(session?.user?.id);
  // console.log(session);

  const handleLogout = async () => {
    // Call signOut to log the user out and clear the session
    await signOut();
    // Redirect the user to the login page
    router.push('/login');
  };

  return (
    <>
    <Head>
      <title>Boardrooms Dashboard</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Boardrooms Dashboard" />
      <meta name="keywords" content="Boardrooms Dashboard" />
      <meta name="author" content="Alfeco" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <DashNav />
    <div className="flex h-full bg-gray-200">
      {/* Sidebar */}
      <div className={`flex flex-col h-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white`}>
        {/* Menu toggle button */}
        <button
          className="flex items-center justify-center h-16 bg-gray-800 hover:bg-gray-700 transition-all"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {/* Menu toggle icon */}
          {isMenuOpen ? (
          <>
            <RiMenuFoldLine className="w-6 h-6 text-white" />
            <p className="ml-2 font-medium text-white">Close</p>
          </>
            ) : (
            <div className="group relative m-12 flex justify-center">
            <RiMenuUnfoldLine className="w-6 h-6"
            />
            <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Expand Menu</span>
            </div>
          )}
        </button>
        {/* Menu options */}
        <div className="flex flex-col flex-grow">
          {tabs.map(tab => (
            <button
            key={tab.id}
            className={`flex items-center ${
              isMenuOpen ? 'justify-start pl-8' : 'justify-center'
            } h-16 border-b border-gray-700 ${
              tab.id === selectedTab ? 'bg-gray-500 scale-110 transform transition-all duration-200' : ''
            } hover:bg-gray-700 transition-all`}
            onClick={() => {
              if (tab.id === 'logout') {
                // Handle logout when the "logout" tab is clicked
                handleLogout();
              } else {
                setSelectedTab(tab.id);
              }
            }}
          >
            {/* Menu option icon */}
            <tab.icon className={`w-6 h-6 text-gray-400 ${tab.id === selectedTab ? 'transition-all duration-200' : ''}`} />
            {isMenuOpen && <span className={`ml-4 ${tab.id === selectedTab ? 'transition-all duration-200' : ''}`}>{tab.name}</span>}
          </button>          
          ))}
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-grow p-8">
        {/* Render selected tab */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <TabComponent />
        </div>
      </div>
    </div>
    <ChatIcon />
    <Footer />
    </>
  );
};