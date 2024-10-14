import React, { Component } from 'react'
import ProductUpload from './ProductUpload'
import ProductGet from './ProductGet';

export class Admin extends Component {
  render() {
    return (
      <>
        <div>Admin</div>
        <ProductUpload />
        <ProductGet />
      </>
    )
  }
}

export default Admin;
