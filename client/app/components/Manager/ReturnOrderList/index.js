import React from 'react';
import { Link } from 'react-router-dom';
import { ORDERRETURN_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import { getRandomColors } from '../../../utils';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';
import { ROLES } from '../../../constants';
const ReturnOrderList = props => {
  const { user, returnOrder, approveReturnOrder, rejectReturnOrder, deleteReturnOrder } = props;


  const getAvatar = returnOrder => {
    const color = getRandomColors();

    return (
      <div
        className='d-flex flex-column justify-content-center align-items-center fw-normal text-white avatar'
        style={{ backgroundColor: color ? color : 'red' }}
      >
        {user.firstName.charAt(0)}
      </div>
    );
  };

  const getProduct = returnOrder => {
 
    if (returnOrder) {
      const product = returnOrder;
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            src={`${
              product.imageUrl ? product.imageUrl : '/images/placeholder-image.png'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className='r-list'>
      {returnOrder.map((returnOrder, index) => (
        <div key={index} className='review-box'>
          <div className='mb-3 p-4'>
            <div className='d-flex flex-row mx-0 mb-2 mb-lg-3 align-items-center justify-content-between'>
              <div className='review-content'>
                <div className='d-flex flex-row mx-0 mb-2 align-items-center justify-content-between'>
                  <p className='mb-0 fw-medium fs-16 text-truncate'>{returnOrder.reason}</p>
                  <div className='d-block d-lg-none'>{getAvatar(returnOrder)}</div>
                </div>
                <p className='mb-0 fw-normal fs-14 word-break-all'>{returnOrder.upinumber}</p>
              </div>
              <div className='d-none d-lg-block'>{getAvatar(returnOrder)}</div>
            </div>
            <div className='d-flex flex-column flex-lg-row mx-0 mb-3 align-items-start justify-content-between'>
              <div className='w-100 mb-3 mb-lg-0 review-product-box'>
                {returnOrder.order ? (
                  <Link to={`/order/${returnOrder.order}`} className='default-link'>
                    order
                  </Link>
                ) : (
                  <p>Product is not available.</p>
                )}
              </div>
              {getProduct(returnOrder)}
            </div>
            <label className='text-black'>{`Order Return Request Added on ${formatDate(
              returnOrder.createdAt
            )}`}</label>
            <hr />
            {user.role === ROLES.Admin ? ( // Check user role here
              returnOrder.status === ORDERRETURN_STATUS.Approved ? (
                <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                  <div className='d-flex flex-row mx-0'>
                    <CheckIcon className='text-green' />
                    <p className='ml-2 mb-0'>Approved</p>
                  </div>
                  <Button
                    className='mt-3 mt-lg-0'
                    text='Delete'
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteReturnOrder(returnOrder._id)}
                  />
                </div>
              ) : returnOrder.status === ORDERRETURN_STATUS.Rejected ? (
                <>
                  <div className='d-flex align-items-center mb-3'>
                    <RefreshIcon className='text-primary' />
                    <p className='fw-medium ml-3 mb-0'>Re Approve Return Order</p>
                  </div>
                  <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                    <Button
                      className='text-uppercase'
                      variant='primary'
                      size='md'
                      text='Approve'
                      onClick={() => approveReturnOrder(returnOrder)}
                    />
                    <Button
                      className='mt-3 mt-lg-0'
                      text='Delete'
                      icon={<TrashIcon width={15} />}
                      onClick={() => deleteReturnOrder(returnOrder._id)}
                    />
                  </div>
                </>
              ) : (
                <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                  <div className='d-flex flex-column flex-lg-row mx-0'>
                    <Button
                      variant='dark'
                      className='text-uppercase'
                      size='md'
                      text='Approve'
                      onClick={() => approveReturnOrder(returnOrder)}
                    />
                    <Button
                      variant='danger'
                      className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                      size='md'
                      text='Reject'
                      onClick={() => rejectReturnOrder(returnOrder)}
                    />
                  </div>
                  <Button
                    className='mt-3 mt-lg-0'
                    text='Delete'
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteReturnOrder(returnOrder._id)}
                  />
                </div>
              )
            ) : (
              // If user is not an Admin
              <p>{returnOrder.status}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnOrderList;
