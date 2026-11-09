import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';

const ITEMS_PER_PAGE = 10;

const CustomerReports = () => {
  const { GetHighValueCustomersData, GetMedValueCustomersData } =
    useContext(SignContext);
  const [filterOption, setFilterOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [HighValueCustData, setHighValueCustData] = useState([]);
  const [MedValueCustData, setMedValueCustData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);

    
    if (selectedOption === "highValue") {
      setFilteredData(HighValueCustData);
    } else if (selectedOption === "medValue") {
      setFilteredData(MedValueCustData);
    }
  };

  const sortDataByTotalAmount = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => b.totalShoppingAmount - a.totalShoppingAmount);
    setFilteredData(sortedData);
  };

  const GethighValueCustomer = async () => {
    const res = await GetHighValueCustomersData();
    console.log(res);
    const transformedData = res.highValueCustomers.map((content) => {
      const { totalShoppingAmount, ...customerData } = content.customerData;
  
      return {
        ...customerData,
        totalShoppingAmount: content.totalShoppingAmount,
      };
    });
    
    console.log(transformedData);
    setHighValueCustData(transformedData);
  };

  const GetmedValueCustomer = async () => {
    const res = await GetMedValueCustomersData();
    console.log(res);
    const transformedData = res.highValueCustomers.map((content) => {
      const { totalShoppingAmount, ...customerData } = content.customerData;
  
      return {
        ...customerData,
        totalShoppingAmount: content.totalShoppingAmount,
      };
    });
  
    console.log(transformedData);
    setMedValueCustData(transformedData);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = HighValueCustData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    GethighValueCustomer();
    GetmedValueCustomer();
  }, []);
  // console.log(object)
  useEffect(() => {
    sortDataByTotalAmount();
  }, [filteredData])

  document.title = "Customer Report";
  

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Reports"
            child="CustomerReports"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Customer Reports</h4>
                  <div className="filter-dropdown">
                    {/* <label htmlFor="filterSelect">Filter:</label> */}
                    <select
                      className="form-select"
                      id="filterSelect"
                      value={filterOption}
                      onChange={handleFilterChange}
                    >
                      {/* <option value="all">All</option> */}
                      <option value="">Select Value</option>
                      <option value="medValue">Medium Value(₹15,000 - ₹40,000 )</option>
                      <option value="highValue">High Value(Above ₹50,000 )</option>
                    </select>
                  </div>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <Link
                        className="btn btn-primary add-btn me-1"
                        onClick={() => exportReport(filteredData, 'customer_report.csv')}
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
                            <th className="name">Username</th>
                            <th className="name">email</th>
                            <th className="name">Phone No.</th>
                            <th className="name">Total Amount</th>
                            <th className="name">Status</th>
                            {/* <th className="action">Action</th> */}
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {filteredData.map((customerData, key) => (
                            <tr key={customerData.id}>
                              <td className="product-name">{key + 1}</td>
                              <td className="product-name">
                                {customerData.username}
                              </td>
                              <td className="product-name">
                                {customerData.email}
                              </td>
                              <td className="product-name">
                                {customerData.phone}
                              </td>
                              <td className="product-name">
                                {customerData.totalShoppingAmount}
                              </td>
                              <td className="status">
                                {customerData.active === true ? (
                                  <div>
                                    <span className="badge badge-soft-success badge-border">
                                      Active
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="badge badge-soft-danger badge-border">
                                      InActive
                                    </span>
                                  </div>
                                )}
                              </td>

                              {/* Add other columns here as needed */}
                            </tr>
                          ))}
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
                      length: Math.ceil(
                        HighValueCustData.length / ITEMS_PER_PAGE
                      ),
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
                            Math.ceil(HighValueCustData.length / ITEMS_PER_PAGE)
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

export default CustomerReports;
