import React, { useEffect, useState,useContext } from 'react';

import './Blog.css';
import SignContext from '../../contextAPI/Context/SignContext';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Subscribe from '../../components/Subscribe';
import Featured from '../../components/Featured';
import MidFooter from '../../components/MidFooter';
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import MobileSidebar from '../../components/MobileSidebar';



const Blog = () => {
  const {
    GetBlogbyCategoryId
  } = useContext(SignContext);
  const { id } = useParams();
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogData, setBlogData] = useState([]);
  const recordsPerPage = 12;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = BlogData?BlogData.slice(indexOfFirstRecord, indexOfLastRecord):null;

  const totalPages = Math.ceil(BlogData?BlogData.length / recordsPerPage:null) || 1;


  const [blogPosts,setBlogPosts] = useState([]);
 

  const getAllBlogs = async (id) => {
    const res = await GetBlogbyCategoryId(id);
    console.log(res);

    setBlogData(res.data);
  };



  useEffect(() => {
    // Check if BlogData is empty, and if it is, call the function to fetch all blogs
    if (BlogData && BlogData.length === 0) {
      getAllBlogs(id);
    } else {
      // If BlogData is not empty, set it, and log it
      setBlogPosts(BlogData);
      console.log(BlogData);
    }
  }, [id, BlogData]);

  
  return (
    <>
    <div>
        <Header/>
        <MobileSidebar/>  
        <div class="page-header breadcrumb-wrap">
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
                  <h2>
                   
                    Blogs
                  </h2>
                </div>
            
              </div>
              <div className="loop-grid">
                <div className="row">
                  {currentRecords?currentRecords.map((post) => (
                    
                          <article key={post._id} className="col-xl-3 col-lg-4 col-md-6 text-center hovr-up  animated mb-2">
                      <div className="post-thumb">
                      <Link to={`/blog-details/${post._id}`}>
                          <img className="border-radius-15" src={`${url}/blog-images/${post.imagePath}`} alt="" />
                        </Link>
                       
                      </div>
                      <div className="entry-content-2">
                        {/* <h6 className="mb-10 font-sm"><Link className="entry-meta text-muted" to='#'>{post.category}</Link></h6> */}
                        <h4 className="post-title mb-15 text-start">
                          <Link to={`/blog-details/${post._id}`}>{post.blogTitle}</Link>
                        </h4>
                        <div className="entry-meta font-xs color-grey mt-10 pb-10 ">
                          <div className='d-flex justify-content-between'>
                            <span className="post-on ">{post.blogFeed}</span>
                            {/* <span className="hit-count has-dot mr-10">{post.views}</span> */}
                            <span className="">{new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  
                  
                  )):null}
                </div>
              </div>
              <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-start">
                                    <li className="page-item">
                                        <Link className="page-link"onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}><i className="fi-rs-arrow-small-left bi bi-arrow-left"></i></Link>
                                    </li>
                                    <span> <li class="page-item"><Link className="page-link">{currentPage}</Link></li></span>
                                    {/* <li class="page-item">of</li>
                                    <span> <li class="page-item"><a class="page-link">{totalPages}</a></li></span> */}

                                    <li className="page-item">
                                        <Link className="page-link" onClick={() => {
                        const nextPage = currentPage + 1;
                        const hasRecordsOnNextPage = nextPage <= totalPages;
                        if (hasRecordsOnNextPage) {
                            setCurrentPage(nextPage);
                        }
                    }} disabled={currentPage === totalPages}><i className="fi-rs-arrow-small-right bi bi-arrow-right"></i></Link>
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
    </>
  );
}

export default Blog;
