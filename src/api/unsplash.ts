const ACCESS_KEY=import.meta.env.VITE_UNSPLASH_ACCESS_KEY
export const searchPhotos = async (
  query: string
) => {
  const response = await fetch(
`https://api.unsplash.com/search/photos?query=${query}`,
{
  headers: {
    Authorization:
`Client-ID ${ACCESS_KEY}`,
  },
}
  );


const data = await response.json();

  return data.results;
};