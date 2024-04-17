import { IRating } from "../interfaces";
import './styling/StarRating.css';

interface StarRatingProps {
  rating: IRating;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const { ratingType, stars } = rating;
  const category = ratingType;
  return (
    <div className="flex flex-row my-2 justify-right">
      {/* rating display */}
      <div className="rating-static mr-3">
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type="radio"
            readOnly
            name={`rating-${category}`}
            className="mask mask-star-2 bg-orange-400"
            checked={stars === index + 1}
          />
        ))}
      </div>

      {/* rating label */}
      <span className="mb-1 mr-10">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
    </div>
  );
};
