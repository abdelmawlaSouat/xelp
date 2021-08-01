// import { Card } from '@material-ui/core';

import { AiOutlineStar } from 'react-icons/ai';
import { BiComment, BiPhone } from 'react-icons/bi';
import css from './BusinessCard.module.css';

const BusinessCard = ({ businessData }) => {
  function categoriesToString() {
    let categoriesString = '';
    const { categories } = businessData;

    categories.forEach((item) => {
      categoriesString += item.title;
      if (categories.indexOf(item) < categories.length - 1) {
        categoriesString += ', ';
      }
    });
    return categoriesString;
  }
  return (
    <div className={css.card}>
      <a href={businessData.url} target="_blank" rel="noreferrer">
        <img
          src={businessData.image_url}
          alt={businessData.name}
          className={css.imageUrl}
        />
        <div className={css.cardTextContainer}>
          <div>
            <span className={css.name}>{businessData.name}</span>
            <p className={css.categoriesAndPrice}>
              <span>{categoriesToString()}</span>
              {businessData.price && <span>{` - ${businessData.price}`}</span>}
            </p>
          </div>

          <div className={css.adresse}>
            {businessData.location.display_address.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={css.secondaryData}>
            <div className={css.rating}>
              <AiOutlineStar />
              <span>{businessData.rating}</span>
            </div>
            <div className={css.review}>
              <BiComment />
              <span>{businessData.review_count}</span>
            </div>
            {businessData.phone && (
              <div className={css.phone}>
                <BiPhone />
                <span>{businessData.phone}</span>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default BusinessCard;
