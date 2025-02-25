"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import logo from "../../public/images/logo.png"
import ball from "../../public/images/ball.png"
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (trimmedSearch != '' && pathname !== `/pokemon/${trimmedSearch}`) {
      if(pathname === '/'){
        setIsSearching(true)
      }

      router.push(`/pokemon/${trimmedSearch}`);
    }
  };

  if (!isClient) return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row mb-5">
        <div className="w-[35vw] h-[50px] bg-gray-300 animate-pulse rounded-md mr-2"></div>
      </div>
      <form className="mb-4 flex flex-row gap-4">
        <div className="w-[35vw] h-[40px] bg-gray-300 animate-pulse rounded-xl mb-4"></div>
        <button type="button" className="w-[120px] h-[40px] bg-gray-300 animate-pulse rounded-xl"></button>
      </form>
    </div>
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row mb-5">
          <Link href="/" passHref>
            <Image 
              src={logo} 
              alt="logo-iamge" 
              className="w-[35vw] object-contain mr-2" 
            />
          </Link>
          <Link href="/" passHref>
            <Image 
              src={ball} 
              alt="ball-iamge" 
              className="w-[12vw] object-contain mt-3" 
            />
          </Link>
        </div>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Enter Pokémon Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 border-2 border-blue-300 p-2 rounded-xl"
          />
          <button type="submit" className="px-4 font-bold rounded-xl ml-2 bg-blue-500 text-white p-2 hover:bg-blue-600 transition duration-100">
            Search
          </button>
        </form>
      </div>
      {
        isSearching && (
          <div className="flex justify-center items-center mt-3">
            <div className="w-[93%] md:w-[60%] lg:w-[40%] px-10 border border-white p-4 shadow-xl bg-white rounded-3xl">
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-[250px] h-[250px] bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-40 h-10 bg-gray-300 animate-pulse rounded-md mt-6 mb-5"></div>
              </div>
              <div className="flex gap-3 px-5">
                <div className="w-[80%]">
                  <div className="h-4 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
                <div className="w-[80%]">
                  <div className="h-4 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-6">
                <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
              <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full h-12 bg-gray-300 animate-pulse rounded-xl"></div>
                ))}
              </div>
              <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full h-12 bg-gray-300 animate-pulse rounded-xl"></div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center mt-5 bg-gray-200 py-3 w-full rounded-md">
                <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="flex flex-row mt-2 gap-2 mb-1">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="w-20 h-10 bg-gray-300 animate-pulse rounded-3xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Search;
