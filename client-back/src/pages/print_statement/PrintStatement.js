import React from 'react'
import logo from '../../images/logo1.png'
const PrintStatement = () => {
  return (
    <div>
              <section class="pt-4 vmobile-tag-kl">

<div class="container">

    <div class="row">

        <div class="col-md-12">

            <h3 class="text-center inovice-mobile "> <span className='fs-4'>Order Statement </span> </h3>

        </div>

    </div>

</div>

</section>
      <section className="blog-area pt-4 pb-5">
  <div className="container">
    <div className="row m-0" id="printablediv">
      <div className="col-sm-12 checkout-login">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img src={logo} className="img-fluid center-block text-center" style={{width: 200}} />
          </div>
          <div className="col-md-7">
            <div className="invoice-address">
              <h4 className='mb-2'>Pushti Shangar</h4>
              <p> <strong>Address :</strong> Vadodara-390022,Gujarat</p>
              <p> <strong>Customer Care Email :</strong>pushtishangar@gmail.com</p>
              <p> <strong>Customer Care No. :</strong> +91 89808 08585</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-4">
            <h5 className="order-ttl">Order Details </h5>
            <table className="meta table table-bordered">
              <tbody className='text-start'>
                <tr>
                  <th>Order Date</th>
                  <td>
                    11/09/2023 12:10:37
                  </td>
                </tr>
                <tr>
                  <th>Order No</th>
                  <td>
                    JFO34210651
                  </td>
                </tr>
                <tr>
                  <th>Invoice No</th>
                  <td>
                    JFT34210651
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-8">
            <h5 className="order-ttl">Payment Details </h5>
            <table className="meta table table-bordered">
              <tbody className='text-start'>
                <tr>
                  <th>No of Items</th>
                  <td>
                    2
                  </td>
                </tr>
                <tr>
                  <th>Payment Details</th>
                  <td>
                    Online - CCAvenue - Debit Card
                  </td>
                </tr>
                <tr>
                  <th>Shipping Method </th>
                  <td>
                    Weight Based Shipping (Weight:1.000 Kg ) - ? 59.000( 3 to 6 working days delivery )
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="order-ttl">Billing Details </h5>
            <table className="meta-2 table table-bordered">
              <tbody className='text-start'>
                <tr>
                  <th>Name</th>
                  <td>
                    Rushil Patel
                  </td>
                </tr>
                <tr>
                  <th>Address </th>
                  <td>
                    Darpan Apartment, 305, next to Express Hotel, Alkapuri, Vadodara, Gujarat 390005
                  </td>
                </tr>
                <tr>
                  <th>Email Id</th>
                  <td>
                    rushil@barodaweb.net
                  </td>
                </tr>
                <tr>
                  <th>Mobile No</th>
                  <td>
                    +91 98242 81021
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h5 className="order-ttl xs-sp-add">Shipping Address </h5>
            <table className="meta-2 table table-bordered">
              <tbody className='text-start'>
                <tr>
                  <th>Name</th>
                  <td>
                    Rushil Patel
                  </td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>
                    Darpan Apartment, 305, next to Express Hotel, Alkapuri, Vadodara, Gujarat 390005
                  </td>
                </tr>
                <tr>
                  <th>Email Id</th>
                  <td>
                    rushil@barodaweb.net
                  </td>
                </tr>
                <tr>
                  <th>Mobile No</th>
                  <td>
                    +91 98242 81021
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-sm-12">
            <h2 className="order-ttl text-center">Order Summary </h2>
            <div className="table table-responsive">
              <table className="meta-1 table table-bordered order-summary mb-0">
                <tbody className='text-start'>
                  <tr>
                    <th>Sr.No </th>
                    <th style={{width: '10%'}}>Image </th>
                    <th>Item Description </th>
                    <th>HSN </th>
                    <th>Unit Price </th>
                    <th className="text-center">Quantity </th>
                    <th className="text-center">Total Price </th>
                  </tr>
                  <tr>
                    <td className="text-center">
                      1
                    </td>
                    <td>
                      <div className="img-dlt text-center">
                        <img src="assets/img/order-statement/1.jpg" width={70} className="img-responsive center-block" />
                      </div>
                    </td>
                    <td>
                      <div className="description-p">
                        <p className="product-category">Shringar</p>
                        <p className="product-name">God Atttar-500 gm</p>
                        <p className="product-code">( <b>Code : </b>JF150162 )</p>
                      </div>
                    </td>
                    <td>2106</td>
                    <td>
                      ₹ 142.86
                    </td>
                    <td className="text-center">
                      1
                    </td>
                    <td className="text-end">
                      ₹ 142.86
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      2
                    </td>
                    <td>
                      <div className="img-dlt text-center">
                        <img src="assets/img/order-statement/2.jpg" width={70} className="img-responsive center-block" />
                      </div>
                    </td>
                    <td>
                      <div className="description-p">
                        <p className="product-category">Vastra</p>
                        <p className="product-name">Zari 1 Vastra</p>
                        <p className="product-code">( <b>Code : </b>JF162819 )</p>
                      </div>
                    </td>
                    <td>2106</td>
                    <td>
                      ₹ 161.90
                    </td>
                    <td className="text-center">
                      1
                    </td>
                    <td className="text-end">
                      ₹ 161.90
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-left" />
                    <td colSpan={2} className="text-end fw-bold">Subtotal : </td>
                    <td className="text-end">
                      ₹ 304.76
                    </td>
                  </tr>
                  <tr id>
                    <td colSpan={4} className="text-left" />
                    <td colSpan={2} className="text-end fw-bold">CGST  (+)  : </td>
                    <td className="text-end">
                      ₹ 00.00
                    </td>
                  </tr>
                  <tr id>
                    <td colSpan={4} className="text-left" />
                    <td colSpan={2} className="text-end fw-bold">SGST  (+)  : </td>
                    <td className="text-end">
                      ₹ 00.00
                    </td>
                  </tr>
                  <tr id>
                    <td colSpan={4} className="text-left" />
                    <td colSpan={2} className="text-end fw-bold">IGST  (+)  : </td>
                    <td className="text-end">
                      ₹ 15.24
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="text-end">
                      <p className="text-left fw-bold">
                        <span className="text-color fs-13">*</span>  ^ Order Item Weight or Price Modified Signs
                      </p>
                      <p className="fw-bold text-end mb-0 d-block">
                        Weight Based Shipping (Weight:1.000 Kg) - ? 59.000  (3 to 6 working days delivery) (+) :
                      </p>
                    </td>
                    <td className="text-end">
                      ₹ 59.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-left" />
                    <td colSpan={2} className="text-end fw-bold">Discount (-) : </td>
                    <td className="text-end">
                      ₹ 0.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-left">
                      <b>Total Invoice Value (In Words) : </b>
                      Three Hundred Seventy Nine  Only
                    </td>
                    <td colSpan={2} className="text-end fw-bold">Total (=) : </td>
                    <td className="text-end">
                      ₹ 379.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-sm-12">
            <div className="mlr-20 offer-panel">
              <p className="text-center" style={{fontSize: 11}}>This is system generated invoice statement, It's not required any Digital signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default PrintStatement
