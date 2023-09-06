import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={`transition-colors duration-500`}>
      <footer className={`text-center py-4 bg-gray-900 text-gray-400`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <Link href="#">
              <FaTwitter className={`hover:text-blue-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaFacebook className={`hover:text-blue-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaInstagram className={`hover:text-pink-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaLinkedin className={`hover:text-blue-400 text-white`} size={24} />
            </Link>
          </div>
        </div>
        <div className="pt-3">
          &copy; {new Date().getFullYear()} Alfeco Holdings. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
