"use client";

import { useRouter } from "next/navigation";
import { Pokemon } from '@/types/pokemon';
import Image from "next/image";
import { useState } from "react";

type PokemonListProps = {
  error?: Error | null;
  pokemon?: Pokemon;
};

const PokemonList: React.FC<PokemonListProps> = ({ error, pokemon }) => {
  const router = useRouter();
  const [loading2 , setLoading2] = useState(false);

  const handleEvolutionClick = (evolutionName: string) => {
    setLoading2(true)
    setTimeout(() => router.push(`/pokemon/${evolutionName}`), 100);
  };

  const emoji: Record<string, string> = {
    "Electric": "⚡",
    "Fight": "🥊",
    "Fighting": "🥊",
    "Flying": "🕊️",
    "Fly": "🕊️",
    "Rock": "🗿",
    "Fire": "🔥",
    "Grass": "🌿",
    "Poison": "🧪",
    "Psychic": "🤯",
    "Ghost": "👻",
    "Steel": "🦾",
    "Water": "🌊",
    "Ice": "🧊",
    "Ground": "🏜️",
    "Bug": "🦗",
    "Dragon": "🐉",
    "Fairy": "🧚",
    "Wood": "🧚",
  }

  if(!pokemon){
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="w-[95%] md:w-[50%] lg:w-[35%] px-10 border border-white p-4 shadow-xl bg-white rounded-3xl">
          <div className="flex flex-col justify-center items-center mt-5">
            <Image 
              src="/images/cry.png"
              width={250} height={250} 
              alt="crying pokemon" 
              className="w-[50vw] object-contain mr-2 rounded-2xl" 
            />
            { 
              error ? (
                <>
                  <h2 className="text-2xl font-bold mt-6 mb-5 text-red-500 " style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    Error ❗
                  </h2>
                  <div className="flex text-center text-xl mb-3">
                    {error.message}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mt-6 mb-5 text-red-500 " style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    Not found Pokemon ❗
                  </h2>
                </>
              )
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="w-[95%] md:w-[50%] lg:w-[35%] px-10 border border-white p-4 shadow-xl bg-white rounded-3xl">
        <div>
          <div className="flex flex-col justify-center items-center mt-5">
            {
              loading2 ? 
              (
                <>
                  <div className="w-[250px] h-[250px] bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="w-40 h-10 bg-gray-300 animate-pulse rounded-md mt-6 mb-5"></div>
                </>
              )
              : pokemon ? (
                <>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={250}
                    height={250}
                    className="w-[250px] h-[250px]"
                    priority
                  />
                  <h2 className="text-5xl font-bold mt-6 mb-5 text-blue-500 " style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>{pokemon.name}</h2>
                </>
              ) :
              null
            }
          </div>
          <div className="flex gap-3 px-5">
            {
              loading2 ? 
              (
                <>
                  <div className="w-[80%]">
                    <div className="h-4 bg-gray-300 animate-pulse rounded-full"></div>
                  </div>
                  <div className="w-[80%]">
                    <div className="h-4 bg-gray-300 animate-pulse rounded-full"></div>
                  </div>
                </>
              )
              : pokemon ? (
                <>
                  <div className="w-[80%]">
                    <span className="ml-2 font-semibold text-gray-700" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>MaxHP : {pokemon.maxHP}</span>
                    <div className="relative h-4 bg-gray-300 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-red-400 rounded-full"
                        style={{ width: `${pokemon.maxHP/35}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-[80%]">
                  <span className="ml-2 font-semibold text-gray-700" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>MaxCP : {pokemon.maxCP}</span>
                    <div className="relative h-4 bg-gray-300 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-400 rounded-full"
                        style={{ width: `${pokemon.maxCP/35}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              ) :
              null
            }
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            {
              loading2 ? 
              (
                <>
                  <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
                </>
              )
              : pokemon ? (
                <>
                  <div className="flex flex-col justify-center px-4 items-center mt-1 border-4 py-3 rounded-md mb-4">
                    <p className="font-semibold text-2xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    🔥 Type 💦
                    </p>
                    <div className="flex justify-center gap-1 mb-1 flex-wrap">
                      {pokemon.types?.map((type) => (
                        <button 
                          key={type} 
                          className="
                           hover:scale-105 
                           transition duration-100 
                           cursor-pointer 
                           bg-gray-200 
                           font-semibold px-5
                          text-gray-700 
                            md:text-xl py-1 
                            rounded-full 
                            mt-3
                          " 
                          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
                        >
                          <span className="mr-1">{ emoji[type] || "❓"}</span>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-2xl mt-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    💥 Attacks 💥
                  </p>
                </>
              ) :
              null
            }
          </div>
          {
            loading2 ? 
            (
              <>
                <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="w-full h-12 bg-gray-300 animate-pulse rounded-xl"></div>
                  ))}
                </div>
              </>
            )
            : pokemon && pokemon.evolutions ? (
              <>
                <span className="flex ml-7 font-semibold text-gray-700 mt-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                  FAST <p className="ml-2">👇🏻</p>
                </span>
                <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                  {pokemon.attacks?.fast.map((fast) => (
                    <div key={fast.name}
                      className="
                        flex flex-col justify-center items-center text-center
                        bg-gray-200 text-sm
                        text-gray-700 px-2 rounded-xl 
                        font-semibold py-3
                        hover:scale-105
                        transition
                        duration-100
                        cursor-pointer
                      "  
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >
                      {fast.name} <br />
                      <span className="bg-red-500 text-white px-2 py-1 mt-1 text-xs rounded-lg">{fast.damage} Damage</span>
                    </div>
                  ))}
                </div>
              </>
            ) :
            (
              <div 
                className="
                  flex flex-col justify-center items-center text-center
                  bg-gray-200 text-sm
                  text-gray-700 px-2 rounded-xl 
                  font-semibold py-3
                  mt-2
                "  
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
              >
                Dont have Fast Attacks
              </div>
            )
          }
          
          {
            loading2 ? 
            (
              <>
                <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="w-full h-12 bg-gray-300 animate-pulse rounded-xl"></div>
                  ))}
                </div>
              </>
            )
            : pokemon ? (
              <>
                <span className="flex ml-7 font-semibold text-gray-700 mt-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                  Special <p className="ml-2">👇🏻</p>
                </span>
                <div className="grid grid-cols-3 mt-2 gap-2 mb-1">
                  {pokemon.attacks?.special.map((special) => (
                    <div key={special.name}
                      className="
                        flex flex-col justify-center items-center text-center
                        bg-gray-200 text-sm
                        text-gray-700 px-2 rounded-xl 
                        font-semibold py-3
                        hover:scale-105
                        transition
                        duration-100
                        cursor-pointer
                      "  
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >
                      {special.name} <br />
                      <span className="bg-red-500 text-white px-2 py-1 mt-1 text-xs rounded-lg">{special.damage} Damage</span>
                    </div>
                  ))}
                </div>
              </>
            ) :
            (
              <div 
                className="
                  flex flex-col justify-center items-center text-center
                  bg-gray-200 text-sm
                  text-gray-700 px-2 rounded-xl 
                  font-semibold py-3
                  mt-2
                "  
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
              >
                Dont have Special Attacks
              </div>
            )
          }

          {
            loading2 ? 
            (
              <>
                <div className="flex flex-col justify-center items-center mt-5 mb-4 bg-gray-200 py-3 w-full rounded-md">
                  <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="flex flex-row mt-2 gap-2 mb-1">
                    {[...Array(2)].map((_, index) => (
                      <div key={index} className="w-20 h-10 bg-gray-300 animate-pulse rounded-3xl"></div>
                    ))}
                  </div>
                </div>
              </>
            )
            : pokemon ? (
              <>
                <div className="flex flex-col justify-center items-center mt-5 bg-gray-200 py-3 w-full rounded-md mb-4">
                  <p className="font-semibold text-2xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>🧬 Evolutions 🧬</p>
                  <hr />
                  {pokemon.evolutions ? (
                    <div className="flex justify-center mt-2 gap-2 mb-1 flex-wrap">
                      {pokemon.evolutions?.map((evo) => (
                        <button 
                          key={evo.id} 
                          className="
                            bg-blue-500 
                            text-white px-4 rounded-3xl 
                            font-semibold py-1
                            hover:bg-blue-600 
                            hover:scale-105
                            transition 
                            duration-100
                          "  
                          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                          onClick={() => handleEvolutionClick(evo.name)}
                        >
                          {evo.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button 
                      className="
                        bg-gray-400 
                        text-white px-4 rounded-3xl 
                        font-semibold py-1
                        hover:bg-gray-500
                        hover:scale-105
                        transition 
                        duration-100
                      "  
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >
                      No evolution
                    </button>
                  )}
                </div>
              </>
            ) :
            null
          }
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
