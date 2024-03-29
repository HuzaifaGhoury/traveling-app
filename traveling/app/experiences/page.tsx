  "use client"
  import React, { useState, useEffect } from 'react';
  import Layout from '../layout';
  import { useQuery } from '@apollo/client'; 
  import { GetExperienceFilter } from '../graphql/queries';
  import FilterSidebar from '../../components/filtersidebar';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
  import StarRating from '../../components/starrating';
  import roadimg from '../../public/Images/roadimg.jpg';
  import Image from 'next/image';
  
  interface Experience {
    id: string;
    mainImageUrl: string;
    name: string;
    highlights: string[];
    averageRating: string | null;
    location: string;
    duration: string;
    experienceDate: { price: number }[];
  }
  
  const getDurationRange = (duration: string): number[] => {  
    const [start, end] = duration.split('-').map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };  
  
  // const getDefaultDurationRange = (): [number, number] => {
  //   // Default range: 1-31
  //   return [1, 31];
  // }; 
  
  const Page: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [initialExperiences, setInitialExperiences] = useState<Experience[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    const { loading, error, data } = useQuery(GetExperienceFilter, {
      variables: {
        search: searchTerm,
        ...(selectedDuration && { durations: getDurationRange(selectedDuration) }),
      },
    });
  
    useEffect(() => {
      if (data && data.experienceFilter) {
        setInitialExperiences(data.experienceFilter);
        setExperiences(data.experienceFilter);
      }
    }, [data]);
  
    useEffect(() => {
      filterExperiencesByDuration(selectedDuration)
    }, [selectedDuration]);
  
    const handleFilterChange = (duration: string) => {
      setSelectedDuration(duration);
    };
  
    const filterExperiencesByDuration = (duration: string) => {
      if (!duration) {
        setExperiences(initialExperiences);
        return; 
      }
  
      const filteredExperiences = initialExperiences.filter((experience) => {
        const experienceDuration = parseInt(experience.duration, 10);
        const [min, max] = getDurationRange(duration);
        return experienceDuration >= min && experienceDuration <= max;
      });
  
    setExperiences(filteredExperiences);

    };
  
    const handleClearSearch = () => {
      setSearchTerm('');
      setExperiences(initialExperiences);
    };
  
    const handleSelectExperience = (selectedExperience: string) => {
      setSearchTerm(selectedExperience);
    };
  
    const [likedImages, setLikedImages] = useState<string[]>([]);
  
    const handleLike = (experienceId: string) => {
      if (likedImages.includes(experienceId)) {
        setLikedImages((prevLikedImages) => prevLikedImages.filter((id) => id !== experienceId));
      } else {
        setLikedImages((prevLikedImages) => [...prevLikedImages, experienceId]);
      }
    };
  
    const getMinimumPrice = (prices: { price: number }[]): number | string => {
      if (prices.length === 0) {
        return 'No price available';
      }
      
      let minPrice = prices[0].price;
      for (let i = 1; i < prices.length; i++) {
        if (prices[i].price < minPrice) {
          minPrice = prices[i].price;
        }
      }
      
      return minPrice; 
    };

    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
  
      return (
        <ul className="pagination flex gap-2 justify-center align-middle">
  {pageNumbers.map((number) => (
    <li key={number}>
      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600  flex justify-center align-middle" onClick={() => handlePageChange(number)}>{number}</button>
    </li>
  ))}
</ul>
)
}
  
    const experiencesPerPage = 4;
    const indexOfLastExperience = currentPage * experiencesPerPage;
    const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
    const currentExperiences = experiences.slice(indexOfFirstExperience, indexOfLastExperience);
  
    const totalPages = Math.ceil(experiences.length / experiencesPerPage);
  
    const handlePageChange = (page: number) => {                             
      setCurrentPage(page);
    };

    return (
      <Layout>
        <div>
          <div className='relative w-full h-screen'>
            <Image src={roadimg} alt='bg-image' className='w-full h-full object-cover' />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <h1 className='text-6xl font-bold'>Trust Our Experiences</h1>
              <p className='mt-10 text-2xl'>Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit</p>
              <div className='flex relative'>
                <input
                  className='w-96 h-11 pl-6'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.currentTarget.value)}
                />
                {searchTerm && (
                  <FontAwesomeIcon 
                    icon={faTimes}
                    className='absolute right-2 top-3 text-xl cursor-pointer text-gray-500'
                    onClick={handleClearSearch}
                  />
                )} 
              </div>
              {searchTerm && (
                <div className="absolute z-10  bg-white rounded border border-gray-300 shadow-md w-96  mt-80">
                  {experiences.map((experience: Experience) => (
                    <div
                      key={experience.id}
                      onClick={() => handleSelectExperience(experience.name)} 
                      className="cursor-pointer hover:bg-gray-200 px-3 py-2 "
                    >
                      {experience.name}
                    </div>
                  ))}  
                </div>
              )}  
            </div>
          </div>
  
          <div className="flex gap-6 ">
            <div>
              <FilterSidebar handleFilterChange={handleFilterChange} selectedDuration={selectedDuration} />
            </div>
            <div className=' flex gap-7 flex-col pb-3 pt-3'>
              {currentExperiences.map((experience: Experience) => (
                <div className="flex" key={experience.id}>
                  <div className="relative border border-solid border-gray-300 rounded-xl w-60 h-52">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`absolute top-2 right-2 text-xl cursor-pointer ${likedImages.includes(
                        experience.id
                      ) ? 'text-red-500' : 'text-white '}`}
                      onClick={() => handleLike(experience.id)}
                    />
                    <img
                      src={experience.mainImageUrl}
                      alt={`Experience ${experience.id}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-bold">{experience.name}</h2>
                      </div> 
                      <div>
                        {experience.experienceDate.map((date, index) => (
                          <p>Price: ${getMinimumPrice(experience.experienceDate)}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        {experience.averageRating !== null ? (
                          <StarRating rating={parseFloat(experience.averageRating)} />
                        ) : (
                          <p>No Rating</p>
                        )}
                      </div>
                      <div>
                        <p>{experience.location}</p>
                      </div>
                    </div>
  
                    <div>
                      {experience.highlights.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {experience.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No highlights available</p>
                      )}
                    </div>
                    <div>
                      <p>{experience.duration} Days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {renderPagination()}
        </div>
      </Layout>
    );
  };
    
  export default Page;