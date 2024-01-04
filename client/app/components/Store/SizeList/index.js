/**
 *
 * sizeList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const sizeList = props => {
  const { sizes } = props;

  return (
    <div className='size-list'>
      <h3 className='text-uppercase'>Size</h3>
      <hr />
      <Row className='flex-sm-row'>
        {sizes.map((size, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
            <Link
              to={`/shop/size/${size.slug}`}
              className='d-block size-box'
            >

              <h5>{size.name}</h5>
              <p className='size-desc'>{size.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default sizeList;
