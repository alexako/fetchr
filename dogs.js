import axios from "axios";

const fetchDogs = async (page) => {
  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds?limit=5&${page},`,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data;
};

export default fetchDogs;
