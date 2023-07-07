"use client";

import { useState, useEffect } from "react";
import fetchDogs from "../dogs";
import { Dog } from "@/types/Dog";
import translate from "@/translate";
import { DogCard } from "./dogCard";

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    fetchDogs().then(async (dogs: Dog[]) => {
      const translatedDogs = dogs.map(async (dog: Dog) => {
        const translatedBreedGroup = await getTranslation(dog.breed_group);
        const translatedBredFor = await getTranslation(dog.bred_for);
        const translatedTemperament = await getTranslation(dog.temperament);
        return {
          ...dog,
          breed_group: translatedBreedGroup,
          bred_for: translatedBredFor,
          temperament: translatedTemperament,
        };
      });

      Promise.all(translatedDogs).then((translatedDogs: Dog[]) => {
        setDogs(translatedDogs);
        console.log(dogs);
      });
    });
  }, [selectedLanguage]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const getTranslation = async (text: string) => {
    try {
      const translation = await translate(text, selectedLanguage);

      return translation;
    } catch (error) {
      console.error(error);
      return text;
    }
  };

  return (
    <div>
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
      <h1>Dogs</h1>
      <ul>
        {dogs.map((dog: Dog) => (
          <DogCard key={dog.id} dog={dog} selectedLanguage={selectedLanguage} />
        ))}
      </ul>
    </div>
  );
}
