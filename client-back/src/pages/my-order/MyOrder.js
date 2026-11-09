import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import MidFooter from '../../components/MidFooter'
import './MyOrder.css'
import { Link, useParams } from 'react-router-dom'
import MobileSidebar from '../../components/MobileSidebar'
import SignContext from '../../contextAPI/Context/SignContext'



const MyOrder = () => {
  const { id } = useParams();
  const { GetorderHistorybyId } = useContext(SignContext);
  const [OrderData, setOrderData] = useState([]);


  const getOrderHistorybyId = async (id) => {
    const res = await GetorderHistorybyId(id);
    console.log(res)
    if (res.success) {
      setOrderData(res.orderHistory);
    }
  };

  useEffect(() => {
    getOrderHistorybyId(id);
  }, [id]);




  return (
    <div>
      <Header/>
      <MobileSidebar/>
      <section class="pt-4 vmobile-tag-kl">

        <div class="container">

            <div class="row">

                <div class="col-md-12">

                    <h3 class="text-center fs-4"> My Orders</h3>

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
              <li className="active">
                <Link to="/my-order">My Orders</Link>
              </li>
              {/* <li>
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
              </li> */}
              <li>
                <Link to="#">Logout</Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
      <div className="col-lg-9 col-md-8">
        <div className="my-desc">
          <div className="part-1 mb-5">
            <h5>Your Order information below.</h5>
            <hr />
            {/* <div className="row">
              <div className="col-md-12">
                <div className="no-order">
                  <h6 className="vible text-center mb-3">There are no items in your Order History</h6>
                  <div className="text-center">
                    <Link to="#" className="default-btn">
                      Proceed to Checkout
                      <span style={{top: '12.4px', left: '196.462px'}} />
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="part-2">
            <div className="row">
              <div className="col-md-12">
                <div className="order-table table-responsive">
                  <table className="table table-bordered bg-white">
                    <thead>
                      <tr className='fw-bold'>
                        <th scope="col">Order #</th>
                        <th scope="col">Ordered On</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Total</th>
                        {/* <th scope="col">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                    {OrderData.slice(-4).map((order, index) => (
                              <tr key={index}>
                                <td className="product-name">{order._id}</td>
                                <td className="product-name">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                <td className="product-name">
                 
                                    {order.status}
                                 
                                </td>
                                <td className="product-name">₹ {order.totalAmount}</td>
                                {/* <td className="product-subtotal">
                                  <Link to={`/order-details/${order.id}`} className="show">
                                    <i className="bx bx-bullseye bi bi-bullseye" />
                                  </Link>
                                </td> */}
                              </tr>
                            ))}
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

export default MyOrder
