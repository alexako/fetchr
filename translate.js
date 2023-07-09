import axios from 'axios';

const translate = async (text, targetLanguage) => {
  const response = await axios.post('https://translate.argosopentech.com/translate', {
    q: text,
    source: 'en',
    target: targetLanguage,
  }, {
    headers: { 'content-type': 'application/json', }
  });

  return response.data.translatedText;
};

export default translate;
