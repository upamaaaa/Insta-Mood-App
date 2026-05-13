// import React from 'react';
// import { useAppSelector } from '../app/hooks';
// import { PhotoCard } from '../components/PhotoCard';
// import { Heart } from 'lucide-react';

// export function MoodBoard() {
//   const likedPhotos = useAppSelector((state) => state.moodboard.likedPhotos);

//   return (
//     <div className="container mx-auto max-w-7xl px-4 py-8">
//       <div className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans text-neutral-900 dark:text-white flex items-center gap-4">
//           My Mood Board
//         </h1>
//         <p className="text-lg text-neutral-600 dark:text-neutral-400">
//           A personal collection of your favorite inspirations.
//         </p>
//       </div>

//       {likedPhotos.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-12 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 border-dashed dark:border-neutral-800">
//           <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
//              <Heart className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
//           </div>
//           <h3 className="text-xl font-semibold mb-2">No photos yet</h3>
//           <p className="text-neutral-500 max-w-sm">
//             Start exploring and click the heart icon on any photo to add it to your mood board.
//           </p>
//         </div>
//       ) : (
//         <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
//           {likedPhotos.map((photo) => (
//             <PhotoCard key={photo.id} photo={photo} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
