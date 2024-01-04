/**
 *
 * Addsize
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';

const Addsize = props => {
  const { sizeFormData, formErrors, sizeChange, addsize } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addsize();
  };

  return (
    <div className='add-size'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'size Name'}
              value={sizeFormData.name}
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
              value={sizeFormData.description}
              onInputChange={(name, value) => {
                sizeChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-size'}
              name={'isActive'}
              label={'Active?'}
              checked={sizeFormData.isActive}
              toggleCheckboxChange={value => sizeChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-size-actions'>
          <Button type='submit' text='Add size' />
        </div>
      </form>
    </div>
  );
};

export default Addsize;
