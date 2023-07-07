import Image from "next/image";
import { Dog } from "@/types/Dog";

interface DogCardProps {
  dog: Dog;
  selectedLanguage: string;
}

export const DogCard = ({ dog, selectedLanguage }: DogCardProps) => {
  const getUnit = (dog: Dog) => {
    const heightString =
      selectedLanguage === "en"
        ? `${dog.height.imperial} inches`
        : `${dog.height.metric} centimeters`;

    const weightString =
      selectedLanguage === "en"
        ? `${dog.weight.imperial} inches`
        : `${dog.weight.metric} centimeters`;

    return {
      height: heightString,
      weight: weightString,
    };
  };

  const { height, weight } = getUnit(dog);

  return (
    <div className="dog-card">
      <div className="dog-card__image">
        <Image
          src={dog.image.url}
          alt={dog.name}
          layout="responsive"
          width={300}
          height={200}
        />
      </div>
      <div className="dog-card__content">
        <h2>{dog.name}</h2>
        <div className="dog-card__content__details">
          <div className="dog-card__content__details__item">
            <strong>Height:</strong> {height}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Weight:</strong> {weight}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Breed Group:</strong> {dog.breed_group}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Bred For:</strong> {dog.bred_for}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Temperament:</strong> {dog.temperament}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Life Span:</strong> {dog.life_span}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Origin:</strong> {dog.origin}
          </div>
        </div>
      </div>
    </div>
  );
};
