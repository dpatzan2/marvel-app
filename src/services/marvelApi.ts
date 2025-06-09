import CryptoJS from 'crypto-js';

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public';

if (!PUBLIC_KEY || !PRIVATE_KEY) {
  throw new Error('Marvel API keys are not configured. Please check your .env file.');
}

const generateAuthParams = () => {
  const ts = Date.now().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  
  return {
    ts,
    apikey: PUBLIC_KEY,
    hash
  };
};

export const fetchMarvelCharacters = async (limit: number = 20, offset: number = 0, nameStartsWith?: string) => {
  const authParams = generateAuthParams();
  const url = new URL(`${BASE_URL}/characters`);
  
  // Add auth parameters
  url.searchParams.append('ts', authParams.ts);
  url.searchParams.append('apikey', authParams.apikey);
  url.searchParams.append('hash', authParams.hash);
  
  // Add query parameters
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());
  
  if (nameStartsWith) {
    url.searchParams.append('nameStartsWith', nameStartsWith);
  }

  console.log('Fetching from Marvel API:', url.toString());
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Marvel API Error:', errorData);
    throw new Error(`Error de la API de Marvel: ${errorData.message || response.statusText}`);
  }
  
  return response.json();
};
