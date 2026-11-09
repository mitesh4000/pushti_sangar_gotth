import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BlogDetails.css";
import Header from "../../components/Header";
import Subscribe from "../../components/Subscribe";
import Featured from "../../components/Featured";
import MidFooter from "../../components/MidFooter";
import bdetail from "../../images/bt1.jpg";
import cmt from "../../images/comment1.png";
import author from "../../images/author-1.png";
import sideimage from "../../images/side-image.jpg";
import logo from "../../images/favIcon.png";
import { Link, useParams } from "react-router-dom";

import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import MobileSidebar from "../../components/MobileSidebar";

import SignContext from "../../contextAPI/Context/SignContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { getBlogbyId ,getBlogCategories, GetHotDeals } = useContext(SignContext);
  const [BlogData, setBlogData] = useState([]);
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [selectedBlogPost, setSelectedBlogPost] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetHotDeals();
    if (res.success) {
      setContentData(res.content);
    }
  };



  const Getcategories = async () => {
    const res = await getBlogCategories();
    console.log(res);
    setCategoryData(res.blogCategories);
  };

  const getAllBlogs = async (id) => {
    const res = await getBlogbyId(id);
    console.log(res)
    if (res && res.recordExists) {
      setBlogData(res.recordExists);
      setSelectedBlogPost(res.recordExists);
    }
  };

  useEffect(() => {
    if (BlogData.length === 0) {
      getAllBlogs(id);
    }
    Getcategories();
    getaboutUsContent();
  }, [id, BlogData]);



  return (
    <div>
      <Header />
      <MobileSidebar />
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
            <AiOutlineRight className="rightIcon" />
            <span>Blog Details</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ transform: "none" }}>
        <div className="row" style={{ transform: "none" }}>
          <div
            className="col-xl-11 col-lg-12 m-auto"
            style={{ transform: "none" }}
          >
            <div className="row" style={{ transform: "none" }}>
              <div className="col-lg-9">
                <div className="single-page pt-50 pr-30">
                  <div className="single-header style-2">
                    <div className="row">
                      <div className="col-xl-10 col-lg-12 m-auto">
                        <h2 className="mb-10 text-start ">
                          {selectedBlogPost.blogTitle}
                        </h2>
                        <div className="single-header-meta">
                          <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                            {/* <Link className="author-avatar" to="#">
                              <img className="img-circle"
                              src={`${url}/blog-images/${selectedBlogPost.imagePath}`}
                                alt />
                            </Link> */}
                            <span className="post-by">
                              By <Link to="#">{selectedBlogPost.blogFeed}</Link>
                            </span>
                            <span className="post-on has-dot">
                              {" "}
                              {new Date(
                                selectedBlogPost.date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            {/* <span className="time-reading has-dot">
                              8 mins read
                            </span> */}
                          </div>
                          {/* <div className="social-icons single-share">
                            <ul className="text-grey-5 d-flex">
                              <li className="mx-2">
                                <Link to="#">
                                  <i class="bi bi-bookmark"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="#">
                                  <i class="bi bi-heart"></i>
                                </Link>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <figure className="single-thumbnail">
                    <img
                      src={`${url}/blog-images/${selectedBlogPost.imagePath}`}
                      alt=""
                    />
                  </figure>
                  <div className="single-content">
                    <div className="row">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedBlogPost.blog,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 primary-sidebar sticky-sidebar pt-50">
                <div className="theiaStickySidebar">
                  <div className="widget-area">
                    <div className="sidebar-widget widget-category-2 mb-50">
                      <h5 className="section-title style-1 mb-30">Category</h5>
                      <ul>
                        {CategoryData?CategoryData.map((category, index) => (
                          <li key={index}>
                            <Link to={`/blog/${category._id}`}>
                              <img src={logo} alt />
                              {category.name}
                            </Link>
                          </li>
                        )):null}
                      </ul>
                    </div>

                    <div
                      className="banner-img wow fadeIn mb-0 animated d-lg-block d-none animated"
                      style={{ visibility: "visible", minHeight: "300px" }}
                    >
                      <img src={sideimage} alt />
                      <div className="baner-text">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ContentData ? ContentData.content : null,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
            </div>
          </div>
        </div>
      </div>

      <Subscribe />
      <Featured />
      <MidFooter />
    </div>
  );
};

export default BlogDetails;
