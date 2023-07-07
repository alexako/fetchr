import axios from "axios";

const fetchDogs = async () => {
  const response = await axios.get(
    "https://api.thedogapi.com/v1/breeds?limit=5",
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
