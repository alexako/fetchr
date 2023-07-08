import Image from "next/image";
import { Dog } from "@/types/Dog";
import like from "../public/like.svg";
import dislike from "../public/dislike.svg";

interface DogCardProps {
  dog: Dog;
  selectedLanguage: string;
  handleLike: () => void;
  handleDislike: () => void;
}

export const DogCard = ({ dog, selectedLanguage, handleDislike, handleLike }: DogCardProps) => {
  const getUnit = (dog: Dog) => {
    const heightString =
      selectedLanguage === "en"
        ? `${dog.height.imperial} inches`
        : `${dog.height.metric} centimeters`;

    const weightString =
      selectedLanguage === "en"
        ? `${dog.weight.imperial} lbs`
        : `${dog.weight.metric} kg`;

    return {
      height: heightString,
      weight: weightString,
    };
  };

  const { height, weight } = getUnit(dog);

  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)


  return (
    <div className="dog-card">
      <div className="dog-card__image">
        <Image
          src={dog.image.url}
          alt={dog.name}
          layout="responsive"
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 200))}`}
        />
      </div>
      <div className="dog-card__content">
        <div className="dog-card__content__header">{dog.name}</div>
        <div className="dog-card__content__subheader">
          {dog.temperament}
        </div>
        <div className="dog-card__content__details">
          <div className="dog-card__content__details__item">
            <strong>Height:</strong> {height}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Weight:</strong> {weight}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Bred For:</strong> {dog.bred_for}
          </div>
          <div className="dog-card__content__details__item">
            <strong>Life Span:</strong> {dog.life_span}
          </div>
          { dog.origin && (
            <div className="dog-card__content__details__item">
              <strong>Origin:</strong> {dog.origin}
            </div>
          )}
          { dog.description && (
            <div className="dog-card__content__details__item">
              <strong>Description:</strong> {dog.description}
            </div>
          )}
        </div>
        <div className="dog-card__footer">
          <div className="dog-card__footer-buttons">

          <Image
            src={dislike}
            alt="Dislike"
            width={70}
            height={70}
            style={{
              cursor: "pointer",
              padding: "1rem",
              borderRadius: "100%",
              backgroundColor: "#fff",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleDislike} />
          <Image
            src={like}
            alt="Like"
            width={70}
            height={85}
            style={{
              cursor: "pointer",
              padding: "1rem",
              borderRadius: "100%",
              backgroundColor: "#fff",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleLike} />
          </div>
        </div>
      </div>
    </div>
  );
};
