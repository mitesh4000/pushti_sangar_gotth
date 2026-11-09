import React from 'react'
import './TrackOrder.css'
import Header from '../../components/Header'
import MidFooter from '../../components/MidFooter'
import { Link } from 'react-router-dom'
import MobileSidebar from '../../components/MobileSidebar'

const TrackOrder = () => {
  return (
    <div>
        <Header/>
        <MobileSidebar/>
        <section class="pt-4 vmobile-tag-kl">

        <div class="container">

            <div class="row">

                <div class="col-md-12">

                    <h3 class="text-center fs-4"> Track Order </h3>

                </div>

            </div>

        </div>

    </section>
     <section className="blog-area ptb-50">
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-4">
        <aside className="widget-area" id="secondary">
          <section className="widget widget_categories with-my">
            <h3 className="widget-title text-start">Account Dashboard</h3>
            <ul className='text-start'>
              <li>
                <Link to="/my-account">My Account</Link>
              </li>
              <li>
                <Link to="/my-order">My Orders</Link>
              </li>
              <li>
                <Link to="/my-address">My Addresses</Link>
              </li>
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
              <li>
                <Link to="/ticket-support">Support Ticket</Link>
              </li>
              <li>
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
      <div className="col-lg-9 col-md-8">
        <div className="my-desc">
          <div className="part-1 mb-5 text-start">
            <h5>Track Your Order</h5>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="billing-details">
                  <div className="form-group">
                    <label>
                      Order No
                      <span className="required">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-start">
                  <Link to="#" className="default-btn">
                    Track Now
                    <span style={{top: '47.2px', left: '-15.1px'}} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="part-2">
            <h5>Order History</h5>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div className="order-table table-responsive">
                  <table className="table table-bordered bg-white">
                    <thead className='text-start'>
                      <tr className='fw-bold'>
                        <th scope="col" width="15%">Date</th>
                        <th scope="col" width="15%">Order Status</th>
                        <th scope="col" width="70%">Comment</th>
                      </tr>
                    </thead>
                    <tbody className='text-start'>
                      <tr>
                        <td className="product-name">
                          10/9/2020 12:27:33 PM
                        </td>
                        <td className="product-name">
                          <span className="text-success">Processing</span>
                        </td>
                        <td className="product-name">
                          CCworkingKey: 32D3069EE972D109D242D706D7270C42 CCmerchant_id: 101170 CCstrAccessCode: AVZK65DF64AU30KZUA Txnid: PST34210651 currency: INR PromoCode: Amount: 379.00 Product Info: PushtiShangar Myhpayid: 109983836437 Status: Success merchant_param1_txnID: 34210651 merchant_param2_DeliveryCharge: 59.00 merchant_param3_Amount: 379.00 merchant_param4_OrderNo: PSO34210651 merchant_param5_OfferChage: 0.00 Payment By: CCAvenue Bank Ref No: 202064886688192 additionalCharges: No Additional Charges PG_TYPE: CCAvenue Error:
                        </td>
                      </tr>
                      <tr>
                        <td className="product-name">
                          10/9/2020 12:20:10 PM
                        </td>
                        <td className="product-name">
                          <span className="text-color">Fail</span>
                        </td>
                        <td className="product-name">
                          No Data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<MidFooter/>

    </div>
  )
}

export default TrackOrder
