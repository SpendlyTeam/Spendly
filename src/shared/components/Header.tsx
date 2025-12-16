import Image from "next/image";
import Link from "next/link";
import logow from "../../../public/logow.svg";
export const Header = () => {
  return (
    <header className="fixed top-4 left-4 right-4 flex justify-between items-center bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-999">
      <div className="flex items-center space-x-3">
        <Image
          src={logow}
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-auto object-contain"
        />
        <p className="font-bold text-lg leading-none flex items-center m-0 h-10">
          <span className="text-white">Spend</span>
          <span className="text-logoGreen">ly</span>
        </p>
      </div>
      <ul className="hidden lg:flex lg:space-x-6">
        <li className="hover:scale-110 transition-transform">
          <Link href="/" className="protected-link">
            Placeholder
          </Link>
        </li>
        <li className="hover:scale-110 transition-transform">
          <Link href="/" className="protected-link">
            Placeholder
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <Link
          href="/auth"
          className="hidden lg:block bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200"
        >
          Account
        </Link>
      </div>
    </header>
  );
};
