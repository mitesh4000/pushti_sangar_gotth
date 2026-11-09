import React, { useState } from 'react';
import './TicketSupport.css';
import Header from '../../components/Header';
import MidFooter from '../../components/MidFooter';
import { CiMedicalCross } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import MobileSidebar from '../../components/MobileSidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TicketSupport = () => {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketNumber: 'TKT-843285',
      date: '8/4/2020 9:21:15 AM',
      title: 'Order delayed',
      status: 'Closed',
    },
    {
      id: 2,
      ticketNumber: 'TKT-843286',
      date: '8/5/2020 10:15:30 AM',
      title: 'Product inquiry',
      status: 'Open',
    },
  ]);

  const validationSchema = Yup.object({
    subject: Yup.string().required('Subject is required'),
    department: Yup.string().required('Department is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      subject: '',
      department: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form values:', values);
      const newTicket = {
        id: tickets.length + 1,
        ticketNumber: `TKT-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toLocaleString(),
        title: values.subject, // You can use the subject as the title
        status: 'Open',
      };
      setTickets([...tickets, newTicket]);
      setShowAddTicket(false);
    },
  });

  const handleToggleAddTicket = () => {
    setShowAddTicket(!showAddTicket);
  };

  return (
    <div>
      <Header />
      <MobileSidebar />
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center fs-4"> Support Tickets </h3>
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
                <Link to="#">Logout</Link>
              </li>
            </ul>
          </section>
              </aside>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="my-desc">
                <div className="part-1 mb-5">
                  <h5 className="text-start">Please Check Support Tickets below.</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-start">
                        <button
                          className="default-btn"
                          data-toggle="collapse"
                          data-target="#SupportTicket"
                          onClick={handleToggleAddTicket}
                        >
                          <i className="bx bx-plus-medical" />
                          <CiMedicalCross /> Add Support Ticket
                          <span />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {showAddTicket && (
                  <div className="part-1 mb-5">
                    <div className="row">
                      <div className="col-md-12">
                        <div id="SupportTicket" className="collapse show mt-3 mb-3">
                          <div className="billing-details row">
                            <div className="form-group col-md-6">
                              <label>
                                SUBJECT
                                <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject}
                              />
                              {formik.touched.subject && formik.errors.subject ? (
                                <div className="error">{formik.errors.subject}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                DEPARTMENT
                                <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="department"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.department}
                              />
                              {formik.touched.department && formik.errors.department ? (
                                <div className="error">{formik.errors.department}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-12">
                              <label>
                                DESCRIPTION
                                <span className="required">*</span>
                              </label>
                              <textarea
                                placeholder
                                className="form-control"
                                rows={2}
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                              />
                              {formik.touched.description && formik.errors.description ? (
                                <div className="error">{formik.errors.description}</div>
                              ) : null}
                            </div>
                            <div className="col-md-12">
                              <button
                                className="default-btn"
                                onClick={formik.handleSubmit}
                              >
                                Submit Now
                                <span />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="part-2">
                  <h5 className="text-start">Support Tickets</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="order-table table-responsive">
                        <table className="table table-bordered bg-white">
                          <thead className="fw-bold">
                            <tr>
                              <th scope="col">Sr.No</th>
                              <th scope="col">Ticket / Date</th>
                              <th scope="col">Title</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tickets.map((ticket) => (
                              <tr key={ticket.id}>
                                <td className="product-name">{ticket.id}</td>
                                <td className="product-name">
                                  <b className="fw-bold">{ticket.ticketNumber}</b> ({ticket.date})
                                </td>
                                <td className="product-name">{ticket.title}</td>
                                <td>
                                  <span className={`bg-${ticket.status === 'Closed' ? 'success' : 'info'} text-white p-2 d-inline-block`}>
                                    {ticket.status}
                                  </span>
                                </td>
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

      <MidFooter />
    </div>
  );
};

export default TicketSupport;
