import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Collapse } from 'reactstrap';
import actions from '../../actions';
import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedButton: null // Track which button is expanded
    };
  }

  handleCategoryClick = (link, size) => {
    this.props.toggleMenu();
    this.props.fetchProductsBySize(link.name, size.name);
  };

  toggleSubMenu = (linkName) => {
    this.setState((prevState) => ({
      expandedButton: prevState.expandedButton === linkName ? null : linkName
    }));
  };

  render() {
    const { categories, isMenuOpen, toggleMenu, sizes, products } = this.props;
    const { expandedButton } = this.state;

    return (
      <div className='navigation-menu'>
        <div className='menu-header'>
          {isMenuOpen && (
            <Button
              borderless
              variant='empty'
              ariaLabel='close the menu'
              icon={<CloseIcon />}
              onClick={toggleMenu}
            />
          )}
        </div>
        <div className='menu-body'>
          <h3 className='menu-title'>Shop By Category</h3>
          {categories.map((link, index) => (
            <li key={index} className='menu-item list-unstyled'>
              <Button
                text={link.name}
                className={`${isMenuOpen ? 'menu-panel' : 'menu-panel collapse'} w-100`}
                ariaExpanded={isMenuOpen ? 'true' : 'false'}
                onClick={() => this.toggleSubMenu(link.name)} // Pass link.name to toggle function
              />
              <Navbar color='light' light expand='md'>
                <Collapse isOpen={expandedButton === link.name} navbar> {/* Only expand the clicked button */}
                  <ul className={`sizes-dropdown list-unstyled`}>
                    {sizes.map((size, sizeIndex) => (
                      <li className="" key={sizeIndex}>
                        <NavLink
                          onClick={() => this.handleCategoryClick(link, size)}
                          to={'/shop/' + link.name + '/' + size.name}
                          activeClassName='active-link'
                          exact
                          className='nav-link'
                        >
                         
                          {size.name}
                         
                          
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </Navbar>
            </li>
          ))}
        </div>
        {/* Display the products */}
        <div>
          {products.map((product, index) => (
            <div key={index}>{/* Render the product details */}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sizes: state.size.storesizes,
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.category.storeCategories,
    products: state.product.products, // Retrieve the products from the Redux store
    error: state.product.error // Retrieve the error from the Redux store
  };
};

export default connect(mapStateToProps, actions)(NavigationMenu);
