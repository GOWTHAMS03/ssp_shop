/**
 *
 * Editsize
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import { ROLES } from '../../../constants';

const EditSize = props => {
  const {
    user,
    size,
    sizeChange,
    formErrors,
    updatesize,
    deletesize,
    activatesize
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updatesize();
  };

  return (
    <div className='edit-size'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Size link </label>
        <Link to={`/shop/size/${size.slug}`} className='default-link'>
          {size.slug}
        </Link>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'size Name'}
              value={size.name}
              onInputChange={(name, value) => {
                sizeChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'size Slug'}
              value={size.slug}
              onInputChange={(name, value) => {
                sizeChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'size Description'}
              value={size.description}
              onInputChange={(name, value) => {
                sizeChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={size.isActive}
              tooltipContent={`Disabling ${size.name} will also disable all ${size.name} products.`}
              id={`enable-size-${size._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={size.isActive}
              toggleCheckboxChange={value => activatesize(size._id, value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            disabled={user.role === ROLES.Merchant}
            onClick={() => deletesize(size._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSize;
