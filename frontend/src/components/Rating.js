import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({value, text}) => {
  return (
    <div>
        {[1,2,3,4,5].map((star)=>{
            return (
            <span className='rating' key={star}>
                {value >= star ? <FaStar /> : value >= star - 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>)
        })}
        <span className='rating-text'>{text && text}</span>

        {/* <span className='rating'>
            {value>=1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='rating'>
            {value>=1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='rating'>
            {value=>1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='rating'>
            {value>=1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='rating'>
            {value>=1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='rating-text'>{text ? text : null}</span> */}
    </div>
  )
}

export default Rating