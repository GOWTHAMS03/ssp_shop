/**
 *
 * sizeList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const SizeList = props => {
  const { sizes, user } = props;

  return (
    <div className='b-list'>
      {sizes.map((size, index) => (
        <Link
          to={`/dashboard/size/edit/${size._id}`}
          key={index}
          className='d-block mb-3 p-4 size-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{size.name}</h4>
          </div>
          <p className='size-desc mb-2'>{size.description}</p>
          {size?.merchant && size?.merchant?._id !== user?.merchant && (
            <div className='d-flex'>
              <label>By</label>
              <p className='size-merchant mb-0 ml-2 text-primary'>
                {size.merchant.name}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default SizeList;
