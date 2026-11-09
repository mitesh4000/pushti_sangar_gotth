import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import AddStocks from "./AddStocks";
import FeatherIcon from "feather-icons-react";

const ITEMS_PER_PAGE = 10;

function Stocks() {
  const { GetStocks, DeleteStocks } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);
  const [allContentData, setAllContentData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [ContentToDelete, setContentToDelete] = useState(null);
  const [StockForUpdate, setStockForUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const Getstocks = async () => {
    const res = await GetStocks();
    console.log(res);

    const transformedData = res.stocks.map((content, index) => ({
      ...content,
      id: index + 1,
    }));
    setContentData(transformedData);
    setAllContentData(transformedData);
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(allContentData, inputVal);
    setContentData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const handleDeleteStocks = async (id) => {
    const res = await DeleteStocks(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setContentToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getstocks();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  // const handleEditStock = (stockId) => {
  //   setEditingStockId(stockId);

  //   // Assuming ContentData is the array containing stock data
  //   const editedStock = ContentData.find((stock) => stock.id === stockId);

  //   setStocksData({
  //     ProductId: editedStock.ProductId,
  //     quantity: editedStock.quantity,
  //     currentPricePerUnit: editedStock.currentPricePerUnit,
  //     date: editedStock.date,
  //   });
  // };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = ContentData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    Getstocks();
  }, []);

  document.title = "Stocks";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="Inventory" child="Stocks" />

          <Card>
           

            <CardHeader className="d-flex justify-content-between align-items-center">
             
                    <h4 className="card-title mb-0">Product Stock Management</h4>
                    <Row className="align-items-center">
                      <Col className="col-lg-auto">
                        <div className="search-box">
                          <input
                            type="text"
                            id="searchTaskList"
                            className="form-control search"
                            placeholder="Search by product name"
                            onKeyUp={(e) => searchList(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                     
                    </Row>
                  
                </CardHeader>
            <CardBody>
              <AddStocks
                refreshTable={Getstocks}
                StockForUpdate={StockForUpdate}
                setStockForUpdate={setStockForUpdate}
              />
              <div id="todo-task">
                <div className="table-responsive table-card mt-3 mb-3">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th className="name">Index</th>
                        <th className="name">Product-Name</th>
                        <th className="name">Product-Color</th>
                        <th className="name">Product-Size</th>
                        <th className="name">Quantity</th>
                        <th className="name">Price</th>
                        <th className="name">Date</th>
                        <th className="action">Action</th>
                      </tr>
                    </thead>

                    <tbody className="list form-check-all" >
                      {currentItems.map((content, key) => (
                        <tr key={content.id}>
                          <td className="product-name">{key + 1}</td>
                          <td className="product-name">{content.name}</td>
                          <td className="product-name">{content.color || "NA"}</td>
                          <td className="product-name">{content.size || "NA"}</td>
                          <td className="product-name">{content.quantity}</td>
                          {/* <td className="product-name">
                                {content.quantity}
                              </td> */}
                          <td className="product-name">
                            {content.currentPricePerUnit}
                          </td>
                          <td className="product-name">
                            {new Date(content.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </td>

                          {/* <td className="product-name">
                                {content.contentType}
                              </td> */}

                          {/* Add other columns here as needed */}

                          <td>
                            <div className="hstack gap-2">
                              {/* <button
                                className="btn btn-sm btn-soft-info edit-list"
                                onClick={() => {
                                  setStockForUpdate(content);
                                  console.log(content)
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button> */}

                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => {
                                  toggledeletemodal();
                                  setContentToDelete(content);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="py-4 mt-4 text-center"
                id="noresult"
                style={{ display: "none" }}
              >
                <h1>
                  <FeatherIcon icon="search" />
                </h1>
                <h5 className="mt-4">Sorry! No Result Found</h5>
              </div>
              <Pagination>
                <PaginationItem>
                  <PaginationLink
                    previous
                    onClick={() =>
                      setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
                    }
                  />
                </PaginationItem>
                {Array.from({
                  length: Math.ceil(ContentData.length / ITEMS_PER_PAGE),
                }).map((_, index) => (
                  <PaginationItem
                    key={index + 1}
                    active={index + 1 === currentPage}
                  >
                    <PaginationLink onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    next
                    onClick={() =>
                      setCurrentPage((prev) =>
                        prev === Math.ceil(ContentData.length / ITEMS_PER_PAGE)
                          ? prev
                          : prev + 1
                      )
                    }
                  />
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Container>
      </div>

      {/* modal Delete Content */}
      <Modal
        isOpen={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={toggledeletemodal}
      >
        <ModalHeader
          toggle={() => {
            setDeleteModal(!deletemodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Stocks ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteStocks(ContentToDelete._id);
                setDeleteModal(false);
              }}
            >
              Yes, Delete It!
            </button>
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Stocks;
