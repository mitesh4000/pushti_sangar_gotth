import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { saveAs } from "file-saver";
import { Card, CardBody, CardHeader, Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const ProductsReports = () => {

  const { TopSellingProducts } = useContext(SignContext);
  const [TopSellingProductData, SetTopSellingProductData] = useState([]);
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

    const GettopSellingProducts = async () => {
        const res = await TopSellingProducts();
        console.log(res);
        const topSellingProductsData = res.topSellingProducts.map((item) => {
            return {
                name: item.product.name,
                sku: item.product.sku,
                calculatedPrice: item.product.prices.calculatedPrice || item.product.prices.discounted,
                totalQuantityOrdered: item.totalQuantityOrdered,
            };
        });
        SetTopSellingProductData(topSellingProductsData);
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = TopSellingProductData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    GettopSellingProducts();
  }, []);

  document.title = "Product Report";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="Reports" child="Product Reports" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Top Selling Products</h4>

                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <Link
                        className="btn btn-primary add-btn me-1"
                        id="create-btn"
                        onClick={() => exportReport(TopSellingProductData, 'product_report.csv')}
                      >
                        {" "}
                        Export Report
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
                            <th className="name">name</th>
                            <th className="name">sku</th>
                            <th className="name">Sold Price</th>
                            <th className="name">Total Quantity Ordered</th>
                            
                            {/* <th className="action">Action</th> */}
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
  {currentItems.map((product, key) => (
    <tr key={key}>
      <td className="product-name">{key + 1}</td>
      <td className="product-name">{product.name}</td>  
      <td className="product-name">{product.sku}</td>  
      <td className="product-name">
        {product.calculatedPrice
          ? product.calculatedPrice
          : product.discounted}
      </td>  
      <td className="product-name">{product.totalQuantityOrdered}</td>  
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
                      length: Math.ceil(TopSellingProductData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(TopSellingProductData.length / ITEMS_PER_PAGE)
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

export default ProductsReports;
