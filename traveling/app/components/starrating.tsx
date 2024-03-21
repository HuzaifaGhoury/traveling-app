import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface StarRatingProps {
  rating: number | null;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const filledStars = rating ? Math.floor(rating) : 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />);
      }
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default StarRating;
