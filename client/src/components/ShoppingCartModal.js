// React component to store a user's selected items to a cart modal
import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

//Container = component that's hooked to redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import uuid from 'react-uuid';
import ShoppingList from './ShoppingList';
import CheckoutModal from './CheckoutModal';

class ShoppingCartModal extends Component {
  state = {
    modal: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    this.toggle();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Shopping Cart
          <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <ModalHeader toggle={this.toggle}>Shopping Cart</ModalHeader>
              <ModalBody>
                <ShoppingList />
                <CheckoutModal />
              </ModalBody>
            </Modal>
          </Button>
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(ShoppingCartModal);