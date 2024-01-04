/**
 *
 * Minisize
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const Minisize = props => {
  const { sizes, toggleSize } = props;
  

  const handleMenuItemClick = () => {
    toggleSize();
  };

  return (
    <div className='mini-size-list'>
      <div className='d-flex align-items-center justify-content-between min-size-title'>
        <h4 className='mb-0 text-uppercase'>Shop By Size</h4>
        <Link
          to={'/sizes'}
          className='redirect-link'
          role='menuitem'
          onClick={handleMenuItemClick}
        >
          See all
        </Link>
      </div>
      <div className='mini-size-block'>
        {sizes.map((size, index) => (
          <div key={index} className='size-item'>
            <Link
              to={`/shop/size/${size.slug}`}
              className='size-link'
              role='menuitem'
              onClick={handleMenuItemClick}
            >
              {size.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minisize;
