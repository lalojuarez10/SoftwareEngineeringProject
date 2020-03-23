// Product component that we want to render on the UI
// Concept: Components let you split UI into independed pieces
//          props are inputs
//          Return what we want to appear on the screen
import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import { connect } from 'react-redux'; // connect the product store to the react component
import { getProducts } from '../actions/productActions';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import CheckoutModal from './CheckoutModal';


class ProductsList extends Component {
  // State of the component
  state = {
    modal: false,
    name: '',
    userID: ''
  }

  // prop-types to document the intended types of properties passed to components
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
  };

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  openModal = (itemName, id) => {
    this.setState({
      name: itemName,
      userID: id
    });

    this.toggle();
  }

  onSubmit = (itemName, event) => {
    event.preventDefault();
    const newItem = {
      name: this.state.name,
      userID: this.props.user._id
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close Modal
    this.toggle();
  }

  // Product component is rendered for the first time
  componentDidMount() {
    this.props.getProducts();
  }

  // Here we define the actual product component we want to render to the UI
  render() {
    const { products } = this.props.products;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="products-list">
            {products.map(({ productID, name }) => (
              <CSSTransition key={productID} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="addToCart-btn"
                    color="dark"
                    size="sm"
                    onClick={this.openModal.bind(productID, name)}>
                    {name}
                  </Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Add item to Shopping Cart?</ModalHeader>
                    <ModalBody>
                      <Button
                        className="yes"
                        color="dark"
                        size="sm"
                        onClick={(e) => this.onSubmit(name, e)}>
                        YES
                        </Button>
                    </ModalBody>
                  </Modal>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// Mapping the desired redux states(stores) from index.js to this component
const mapStateToProps = (state) => ({
  products: state.product,                 // property: index reducer
  user: state.auth.user                    // property: index reducer
});

// Connect the Store to this component
export default connect(mapStateToProps, { getProducts, addItem })(ProductsList);