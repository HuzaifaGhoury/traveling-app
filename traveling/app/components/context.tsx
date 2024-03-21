// "use client"
// import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// export interface Experience {
//   id: string;
//   mainImageUrl: string;
//   name: string;
//   highlights: string;
//   averageRating: string;
//   location: string;
//   duration: string;
//   experienceDate: { price: number }[];
// }

// interface AppContextState {
//   searchTerm: string;
//   setSearchTerm: Dispatch<SetStateAction<string>>;
//   experiences: Experience[];
//   setExperiences: Dispatch<SetStateAction<Experience[]>>;
// }

// const AppContext = createContext<AppContextState | undefined>(undefined);

// export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   console.log(experiences , 'contextexperiencestate')
//   const contextValue: AppContextState = {
//     searchTerm,
//     setSearchTerm,
//     experiences,
//     setExperiences,
//   };
// // console.log(searchTerm , "jk")
//   return (
//     <AppContext.Provider value={{ ...contextValue }} >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = (): AppContextState => {
//   const context = useContext(AppContext);

//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }

//   return context as AppContextState;
// };


// SearchContext.tsx

import React from 'react'

const context = () => {
  return (
    <div>context</div>
  )
}

export default context