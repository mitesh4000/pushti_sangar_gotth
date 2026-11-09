import React from 'react';

import './Blog.css';
import image1 from '../../images/b1.png'
import image2 from '../../images/b2.png'
import image3 from '../../images/b3.png'
import image4 from '../../images/b1.png'
import image5 from '../../images/b1.png'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Subscribe from '../../components/Subscribe';
import Featured from '../../components/Featured';
import MidFooter from '../../components/MidFooter';
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import MobileSidebar from '../../components/MobileSidebar';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Devotional Insights & Spiritual Guidance',
      date: '25 April 2022',
      readTime: 'Pushti Shangar',
      image: image1,
    },
    {
      id: 2,
      title: 'The Sacred Art of Pushtimarg Shangar',
      date: '28 April 2022',
      readTime: 'Pushti Shangar',
      image: image2,
    },
    {
      id: 3,
      title: 'Traditional Vastra Making & Divine Fabrics',
      date: '02 May 2022',
      readTime: 'Pushti Shangar',
      image: image3,
    },
    {
      id: 4,
      title: 'Significance of Attar & Fragrance in Seva',
      date: '08 May 2022',
      readTime: 'Pushti Shangar',
      image: image4,
    },
    {
      id: 5,
      title: 'Festive Celebrations & Utsav Shringar',
      date: '14 May 2022',
      readTime: 'Pushti Shangar',
      image: image5,
    },
    {
      id: 6,
      title: 'Sacred Ornaments for Shri Mastak & Shri Karna',
      date: '20 May 2022',
      readTime: 'Pushti Shangar',
      image: image1,
    },
    {
      id: 7,
      title: 'Pearl Adornments in Pushti Tradition',
      date: '25 May 2022',
      readTime: 'Pushti Shangar',
      image: image2,
    },
    {
      id: 8,
      title: 'Preserving Sacred Heritage in Modern Times',
      date: '01 June 2022',
      readTime: 'Pushti Shangar',
      image: image4,
    },
  ];

  return (
    <div>
      <Header />
      <MobileSidebar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home
            </Link>
            <AiOutlineRight className="rightIcon" /> <span /> Blogs <span />{" "}
          </div>
        </div>
      </div>
      <div className="page-content mb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-product-fillter mb-4 mt-3">
                <div className="totall-product">
                  <h2>Blogs</h2>
                </div>
              </div>
              <div className="loop-grid">
                <div className="row">
                  {blogPosts.map((post) => (
                    <article key={post.id} className="col-xl-3 col-lg-4 col-md-6 text-center hovr-up animated mb-2">
                      <div className="post-thumb">
                        <Link to='/blog-details'>
                          <img className="border-radius-15" src={post.image} alt="" />
                        </Link>
                      </div>
                      <div className="entry-content-2">
                        <h4 className="post-title mb-15 text-start">
                          <Link to='/blog-details'>{post.title}</Link>
                        </h4>
                        <div className="entry-meta font-xs color-grey mt-10 pb-10 ">
                          <div className='d-flex justify-content-between'>
                            <span className="post-on ">{post.date}</span>
                            <span className="">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-start">
                    <li className="page-item">
                      <Link className="page-link" to="#"><i className="fi-rs-arrow-small-left bi bi-arrow-left"></i></Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link dot" to="#">...</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                    <li className="page-item">
                      <Link className="page-link" to="#"><i className="fi-rs-arrow-small-right bi bi-arrow-right"></i></Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Subscribe/>
      <Featured/>
      <MidFooter/>
    </div>
  );
}

export default Blog;
