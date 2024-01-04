import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Container } from 'reactstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ROLES } from '../../../constants';
import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';
import OrderTrack from '../OrderTrack';
import QRCode from 'qrcode.react';

const OrderDetails = (props) => {
  const { order, returnOrder, user, users, cancelOrder, updateOrderItemStatus, onBack } = props;

  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (order.total < 500) {
      setShippingPrice(50);
    } else {
      setShippingPrice(0);
    }
  }, [order.total]);

  const final = order.total + shippingPrice;

  const invoiceDetails = {
    from: {
      company: 'SSP TRENDS',
      address: '6-44,Pattan Street,Mallikundam Mecheri,Tamil Nadu, 636458',


      email: 'ssptrendss@gmail.com'
    },
    to: {
      orderdate: order.created,
      address: order.addressFormData.address,
      city: order.addressFormData.city,
      state: order.addressFormData.state,
      zipcode: order.addressFormData.zipCode,
      country: order.addressFormData.country,
      phone: order.addressFormData.phonenumber,
      name: order.userName,
      paymentMethod: order.paymentMethod

    }
  };

  const qrCodeValue = JSON.stringify(invoiceDetails);

  const pdfContentRef = useRef(null);
  const generateInvoiceContent = () => {
    return (
      <div id="invoice-container" className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
           
            <div className="card">
              <div className="card-body">

                <div className="row mb-4">
                  <div className="col-md-12 text-center">
                    <img src="/images/invoicelogo.png" alt="Company Logo" width="150" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h5>From:</h5>
                    <address>
                      {invoiceDetails.from.company}<br />
                      {invoiceDetails.from.address}<br />
                      Email: {invoiceDetails.from.email}
                    </address>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <h5>To:</h5>
                    <span>{invoiceDetails.to.name}</span>
                    <address>

                      {invoiceDetails.to.address}<br />
                      {invoiceDetails.to.city}<br />
                      {invoiceDetails.to.state}<br />
                      {invoiceDetails.to.zipcode}<br />
                      {invoiceDetails.from.country}<br />
                      {invoiceDetails.to.phone}<br />
                      {invoiceDetails.to.paymentMethod}
                    </address>
                  </div>
                </div>
                <div className="text-right">
                  <QRCode value={qrCodeValue} size={100} />
                </div>
                <table className="table table-bordered mt-4">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody>

                    {order.products.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product.name}</td>
                        <td className="text-right">₹{item.product.price}</td>
                      </tr>
                    ))}

                  </tbody>
                  <tfoot>
                    {shippingPrice >= 50 && (
                      <tr>
                        <th className="text-right">Shipping</th>
                        <td className="text-right">₹{shippingPrice}</td>
                      </tr>
                    )}
                    <tr>
                      <th className="text-right">Total:</th>

                      <td className="text-right">₹{final.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <h1 className="text-center">Thank you for your order</h1>
          </div>
        </div>
      </div>
    );
  };
  
  const generatePDFContent = async () => {
    const element = document.getElementById('invoice-container');
    const canvas = await html2canvas(element);
  
    // Determine the device type based on screen width
    const isMobile = window.innerWidth < 768; // Adjust this threshold as needed
  
    const pdf = new jsPDF({
      unit: 'px',
      format: isMobile ? 'a5' : 'a4', // Use a smaller format for mobile, a larger one for web
    });
  
    pdf.addImage(canvas, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    return pdf;
  };
  
  
  
  
  
  const handleDownload = async () => {
  const content = generateInvoiceContent();
  const pdf = await generatePDFContent(content);
  pdf.save('invoice.pdf');
};


  return (
    <div className="order-details " >
      <div id="order-details">
        <Row id="order-details-page">
          <Col xs="12" md="12"  >
            <OrderMeta order={order} users={users} cancelOrder={cancelOrder} onBack={onBack} />
          </Col>
        </Row>
        <Row className="mt-5" id="order-details-container">
          <Col xs="12" lg="8">
            <OrderItems order={order} user={user} updateOrderItemStatus={updateOrderItemStatus} />
          </Col>
          <Col xs="12" lg="4" className="mt-5 mt-lg-0">
            <OrderSummary order={order} />
          </Col>
        </Row>
      </div>
      {/* <Row>
        <Col xs="12" lg="12" className="mt">
          <OrderTrack order={order} />
        </Col>
      </Row> */}
      {user.role === ROLES.Admin && (


        <Row>
          {generateInvoiceContent()}
          <Col xs="12" lg="12" className="mt-3">
            <button onClick={handleDownload}>Download PDF</button>
          </Col>



        </Row>


      )}


    </div>
  );
};

export default OrderDetails;