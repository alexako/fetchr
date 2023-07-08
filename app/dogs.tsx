"use client";

import { useState, useEffect } from "react";
import fetchDogs from "../dogs";
import { Dog } from "@/types/Dog";
import translate from "@/translate";
import { DogCard } from "./dogCard";
import Image from "next/image";
import itsamatch from "../public/itsamatch.png";

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentDog, setCurrentDog] = useState<Dog | null>();
  const [currentDogIndex, setCurrentDogIndex] = useState<number>(0);
  const [match, setMatch] = useState<Dog | null>();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {

    const getTranslation = async (text: string) => {
      try {
        const translation = await translate(text, selectedLanguage);

        return translation;
      } catch (error) {
        console.error(error);
        return text;
      }
    };

    fetchDogs().then(async (dogs: Dog[]) => {
      const translatedDogs = dogs.map(async (dog: Dog) => {
        const translatedBreedGroup = await getTranslation(dog.breed_group);
        const translatedBredFor = await getTranslation(dog.bred_for);
        const translatedTemperament = await getTranslation(dog.temperament);
        const translatedDescription = dog.description ? await getTranslation(dog.description) : "";
        return {
          ...dog,
          breed_group: translatedBreedGroup,
          bred_for: translatedBredFor,
          temperament: translatedTemperament,
          description: translatedDescription,
        };
      });

      Promise.all(translatedDogs).then((translatedDogs: Dog[]) => {
        setDogs(translatedDogs);
        setCurrentDog(translatedDogs[currentDogIndex])
      });
    });
  }, [selectedLanguage]);

  const handleLike = () => {
    const odds = (Math.random() * 100) < 10;
    if (odds) setMatch(currentDog);

    setCurrentDogIndex(currentDogIndex => currentDogIndex + 1);
    setCurrentDog(dogs[currentDogIndex]);
  }

  const handleDislike = () => {
    setCurrentDogIndex(currentDogIndex => currentDogIndex + 1);
    setCurrentDog(dogs[currentDogIndex]);
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

      <a className="logo" href="/">
        <Image src={logo} height={115} width={115} alt="fetchr logo" />
      </a>

      { currentDog && 
        <DogCard
          key={currentDog.id}
          dog={currentDog}
          handleLike={handleLike}
          handleDislike={handleDislike}
          selectedLanguage={selectedLanguage} />
      }

      {match && (
        <div className="match-container">
          <Image src={itsamatch} alt="It's a match" height={75} width={200} />

          <Image src={match.image.url} alt={match.name} height={300} width={300} />
          <strong>{match.name}</strong>
          <p>{match.description || match.temperament}</p>

          <button type="button" onClick={() => setMatch(null)}>
            WOOF!
          </button>
        </div>
      )}
    </main>
  );
}
