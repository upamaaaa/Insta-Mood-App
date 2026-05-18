const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Search Photos
export const searchPhotos = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    },
  );

  const data = await response.json();

  return data.results;
};

// GET Access token from Unsplash server
export const getAccessToken = async (code: string) => {
  const response = await fetch("https://unsplash.com/oauth/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      client_id: "jAs2onJiWcW-Y1Kud5VerPftowQ1oEkQ6ocYz7YKNY4",

      client_secret: "n1JAseg1qXcUUNz1jCHtEovKNinxH5VTNHMEw6NG7g0",

      redirect_uri: "http://localhost:5173/auth/callback",

      code: code,

      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();

  console.log("FULL TOKEN RESPONSE:", data);

  return data;
};

// Add To Collection
export const addToCollection = async (photoId: string, accessToken: string) => {
  const response = await fetch(
    `https://api.unsplash.com/collections/7Scu8Zv9U9A/add?photo_id=${photoId}`,

    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  console.log("ADD RESPONSE:", data);

  return data;
};

// REMOVE From Collection
export const removeFromCollection = async (
  photoId: string,
  accessToken: string,
) => {
  const response = await fetch(
    `https://api.unsplash.com/collections/7Scu8Zv9U9A/remove?photo_id=${photoId}`,

    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  console.log("REMOVE RESPONSE:", data);

  return data;
};

// GET Collection Photos
export const getCollectionPhotos = async (accessToken: string) => {
  const response = await fetch(
    `https://api.unsplash.com/collections/7Scu8Zv9U9A/photos`,

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  console.log("COLLECTION PHOTOS:", data);

  return Array.isArray(data) ? data : [];
};
