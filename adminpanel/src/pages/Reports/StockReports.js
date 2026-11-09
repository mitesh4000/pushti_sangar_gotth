import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { Card, CardBody, CardHeader, Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';


const ITEMS_PER_PAGE = 10;


const StockReports = () => {
  const {
    getStockbyweightTypeId,
    getStockbyCategoryId,
    getCategories,
    GetPriceUpdates,
  } = useContext(SignContext);

  const [CategoryData, setCategoryData] = useState([]);
  const [PriceUpdatesData, setPriceUpdatesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceUpdate, setSelectedPriceUpdate] = useState("");
  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = stockData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportReport = (data, filename) => {
    const csvData = arrayToCSV(data);
  
   
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  
    saveAs(blob, filename);
  };
  
  const arrayToCSV = (data) => {
    const header = Object.keys(data[0]);
    const csv = [header.join(',')];
    data.forEach((row) => {
      const rowValues = header.map((field) => row[field]);
      csv.push(rowValues.join(','));
    });
    return csv.join('\n');
  };


  const fetchStockData = async () => {
    if (selectedCategory) {
      const res = await getStockbyCategoryId(selectedCategory);
      // console.log(res);
      if (res !== undefined) {
        setStockData(res.stockEntries);
      }
    } else if (selectedPriceUpdate) {
      const res = await getStockbyweightTypeId(selectedPriceUpdate);
      // console.log(res);
      if (res !== undefined) {
        setStockData(res.stockEntries);
      }
    }
  };


  const Getcategories = async () => {
    const res = await getCategories();
    if (res !== undefined) {
      setCategoryData(res);
    }
  };

  const GetpriceUpdates = async () => {
    const res = await GetPriceUpdates();
    if (res !== undefined) {
      setPriceUpdatesData(res.prices);
    }
  };



  useEffect(() => {
    Getcategories();
    GetpriceUpdates();
  }, []);

  document.title = "Stock Reports";

  useEffect(() => {
    if (selectedCategory || selectedPriceUpdate) {
      fetchStockData();
    }
  }, [selectedCategory, selectedPriceUpdate]);

  // console.log(stockData)
  document.title = "Stocks Report";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="Reports" child="StockReports" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Stocks</h4>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {CategoryData.map((category) => (
                          <option key={category.id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col className="col-lg-auto">
                      <select
                        value={selectedPriceUpdate}
                        onChange={(e) => setSelectedPriceUpdate(e.target.value)}
                      >
                        <option value="">Select ProductType</option>
                        {PriceUpdatesData.map((priceUpdate) => (
                          <option key={priceUpdate.id} value={priceUpdate._id}>
                            {priceUpdate.ProductType}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col className="col-lg-auto">
                      <Link
                        className="btn btn-primary add-btn me-1"
                        onClick={() => exportReport(stockData, 'stock_report.csv')}
                        id="create-btn"
                      >
                       Export
                        Report
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div id="contentList">
                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="name">Index</th>
                            <th className="name">Product Name</th>
                            <th className="name">Product Color</th>
                            <th className="name">Product Size</th>

                            <th className="name">Stock</th>
                            <th className="name">Date</th>
                            
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                        {currentItems?currentItems.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.color || "NA"}</td>
                              <td>{item.size || "NA"}</td>
                              <td>{item.quantity}</td>
                              <td>{new Date(item.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}</td>
                            </tr>
                          )):null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        previous
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev === 1 ? prev : prev - 1
                          )
                        }
                      />
                    </PaginationItem>
                    {Array.from({
                      length: Math.ceil(stockData.length / ITEMS_PER_PAGE),
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
                            prev ===
                            Math.ceil(stockData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default StockReports;
