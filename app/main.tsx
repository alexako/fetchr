"use client";

import { useState, useEffect } from "react";
import fetchDogs from "../dogs";
import { Dog } from "@/types/Dog";
import translate from "@/translate";
import { DogCard } from "./dogCard";
import MatchModal from "./matchModal";
import Image from "next/image";
import logo from "../public/logo.png";


export default function Main() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentDog, setCurrentDog] = useState<Dog | null>();
  const [page, setPage] = useState(0);
  const [match, setMatch] = useState<Dog | null>();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const getTranslation = async (text: string) => {
    try {
      return await translate(text, selectedLanguage);
    } catch (error) {
      console.error(error);
      return text;
    }
  };

  const loadDogs = () => {
    fetchDogs(page).then(async (dogs: Dog[]) => {
      const translatedDogs = dogs.map(async (dog: Dog) => {
        const translatedBredFor = dog.bred_for && await getTranslation(dog.bred_for);
        const translatedTemperament = dog.temperament && await getTranslation(dog.temperament);
        const translatedDescription = dog.description && await getTranslation(dog.description);
        return {
          ...dog,
          bred_for: translatedBredFor || dog.bred_for,
          temperament: translatedTemperament || dog.temperament,
          description: translatedDescription || dog.description,
        };
      });

      Promise.all(translatedDogs).then((translatedDogs: Dog[]) => {
        setDogs(() => translatedDogs);
        if (!!!currentDog) {
          const [dog1, dog2] = translatedDogs;
          setCurrentDog(dog2);
        };
      });
    });
  };

  useEffect(() => {
    if (dogs.length > 3) return;
    loadDogs();
    setPage(page => page + 1);
  }, [currentDog]);

  useEffect(() => {
    setCurrentDog(() => null);
    setDogs(() => []);
    setPage(() => 0)
    loadDogs();
  }, [selectedLanguage]);

  const update = () => {
    const updatedList = dogs.filter(dog => dog.id !== currentDog?.id);
    setDogs(() => updatedList);
    const [firstDog] = dogs;
    setCurrentDog(firstDog);
  }

  const handleLike = () => {
    const odds = (Math.random() * 100) < 10;
    if (odds) setMatch(currentDog);
    update();
  }

  const handleDislike = () => {
    update();
  }

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <main className="mx-auto max-w-7x1 py-6 sm:px-6 lg:px-8">
      <div>
        <select
          className="mb-4"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="flex justify-center w-full">
        <a className="block my-0 mx-auto" href="/">
          <Image src={logo} height={115} width={115} alt="fetchr logo" />
        </a>
      </div>

      { !!currentDog && 
        <DogCard
          key={currentDog.id}
          dog={currentDog}
          handleLike={handleLike}
          handleDislike={handleDislike}
          selectedLanguage={selectedLanguage} />
      }

      { !!!currentDog &&
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mt-10 mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      }

      { match && (
        <MatchModal match={match} setMatch={setMatch} />
      )}
    </main>
  );
}
