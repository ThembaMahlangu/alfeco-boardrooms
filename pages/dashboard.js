import { useEffect, useState } from 'react';
import { tabs } from '@/components/Data';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import DashNav from '@/components/DashNav';
import { toast, Toaster } from 'react-hot-toast';
import ChatIcon from '@/components/ChatSupport';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('home');
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token') === null) {
            toast('You are not logged in, redirecting to login page',
            {
                icon: '❌',
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            }
            );
            router.push('/login');
        }
    }
  }, []);

  const TabComponent = tabs.find(tab => tab.id === selectedTab)?.component;

  return (
    <>
    <Toaster />
    <DashNav />
    <div className="flex h-full bg-gray-200">
      {/* Sidebar */}
      <div className={`flex flex-col h-screen transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-64' : 'w-16'} bg-[#ff9933] text-gray-500`}>
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
              tab.id === selectedTab ? 'bg-[#00ffc7] scale-110 transform transition-all duration-200' : ''
            } hover:bg-gray-700 transition-all`}
            onClick={() => setSelectedTab(tab.id)}
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

export default DashboardPage;