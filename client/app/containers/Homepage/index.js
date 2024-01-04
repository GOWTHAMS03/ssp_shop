import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import NotFound from '../../components/Common/NotFound';
import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import ProductList from '../../components/Store/ProductList';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Homepage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
    this.props.fetchAllProducts();
  }

  handleSizeClick = (slug) => {
    this.props.history.push(`/shop/size/${slug}`);
   
  };

  render() {
    const {
      storesizes,
      products,
      product,
      storeProducts,
      isLoading,
      authenticated,
      updateWishlist,
    } = this.props;





    // const totalProduct = Array.isArray(product) ? product.map(item => item.quantity) : [];

    let totalQuantity = 0;

    if (Array.isArray(product)) {
      totalQuantity = product.reduce((total, item) => total + (item.quantity || 0), 0);
    }

    const displayProducts = storeProducts && storeProducts.length > 0;
    const sizeArray = Array.isArray(product) ? product.map((p) => p.size) : [];
   
    const sizeArrayLength = sizeArray.length;

    // Get the newest products and limit to five
    const newestProducts = storeProducts && storeProducts.slice(0, 6);

    return (
      <div>
        <div className="homepage">
          <Row className="flex-row">
            <Col>
              <div className="home-carousel">
                <CarouselSlider
                  swipeable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={true}
                  slides={banners}
                  responsive={responsiveOneItemCarousel}
                >
                  {banners.map((item, index) => (
                    <img key={index} src={item.imageUrl} alt={`Banner ${index}`} />
                  ))}
                </CarouselSlider>
              </div>
            </Col>
          </Row>
          {/* <div className="parent-container">
            <div>
              <h1>Sizes</h1>
            </div>
            <div className="mini-size-block round-2 mt-4 px-4 d-inline-flex p-2">
              <div className="row mt-4 px-4">
                {storesizes.map((size, index) => {
                  // Ensure that product is always an array
                  const productsArray = Array.isArray(product) ? product : [];

                  // Find products matching the current size
                  const sizeProducts = productsArray.filter((product) => product.size === size._id);
                  const sizeProductsLength = sizeProducts.length;

                  return (
                    <div key={index}>
                      <div className="size-item px-2  mb-4 ml-4 mr-4" onClick={() => this.handleSizeClick(size.slug)}>
                        <h2 className={`size-text${window.innerWidth <= 768 ? ' px-2' : 'px-4'}`}>
                          {size.name}
                        </h2>
                        <hr />
                        <p>{sizeProductsLength}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
          <div>
            <p className="parent-container">Total Product Count <h1>{totalQuantity}</h1></p>
            <h1 className="parent-container">Latest Products</h1>
          </div>
          <div className="products-shop">
            {isLoading && <LoadingIndicator />}
            {displayProducts && (
              <ProductList products={newestProducts} authenticated={authenticated} updateWishlist={updateWishlist} />
            )}
            {!isLoading && !displayProducts && <NotFound message="No products found." />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    products: state.product.storeProducts,
    storesizes: state.size.storesizes,
    storeProducts: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(Homepage);