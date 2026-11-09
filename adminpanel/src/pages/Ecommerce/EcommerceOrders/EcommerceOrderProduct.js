import React from "react";

const EcommerceOrderProduct = (props) => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  console.log(url)


  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
              <img
                src={`${url}/products/${props.product.product.imageGallery[0]}`}
                alt=""
                className="img-fluid d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-15">
                <a
                  href="apps-ecommerce-product-details"
                  className="link-primary"
                >
                  {props.product.product.name}
                </a>
              </h5>
                  {props.product.product.sku}
              <p className="text-muted mb-0">
                {/* Color: <span className="fw-medium">{props.product.color}</span> */}
              </p>
              <p className="text-muted mb-0">
                {/* Size: <span className="fw-medium">{props.product.size}</span> */}
              </p>
            </div>
          </div>
        </td>
        <td>{props.product.product.prices.discounted?props.product.product.prices.discounted : props.product.product.prices.calculatedPrice}</td>
        <td>{props.product.quantity}</td>
        <td>
        {props.product.product.gst} %
        </td>
        {/* <td className="fw-medium text-end">{props.product.amount}</td> */}
      </tr>
    </React.Fragment>
  );
};

export default EcommerceOrderProduct;
