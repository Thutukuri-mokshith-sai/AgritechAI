import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import TodaysPrices from '../TodaysPrices'

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

const Dashboard = () => {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstanceRef = useRef(null); // Reference to store the chart instance

  useEffect(() => {
    // Cleanup previous chart instance when component unmounts or re-renders
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous chart
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new ChartJS(ctx, {
      type: 'bar', // Set chart type
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Sales Volume',
          data: [120, 150, 180, 200, 220],
          backgroundColor: 'rgba(0, 123, 255, 0.7)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales Volume Over the Past Months',
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 123, 255, 0.2)',
            }
          }
        }
      }
    });

    // Store the chart instance in the ref for future cleanup
    chartInstanceRef.current = chartInstance;

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy chart when component is removed
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Container fluid className="mt-5">

      {/* User Profile Section */}
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <FaUserCircle size={50} className="mr-3" />
          <span className="h4">Welcome, Admin</span>
        </Col>
      </Row>

      {/* Dashboard Cards */}
      <Row className="mb-4">
        <Col lg={4} md={6} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>📦 Total Inventory</Card.Title>
              <Card.Text>15,450 Units</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>📊 Market Trends</Card.Title>
              <Card.Text>Steady Growth 📈</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>🌍 Trade Volume</Card.Title>
              <Card.Text>12,600 Tons</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TodaysPrices/>

      {/* Sales Chart */}
      <Row className="mb-4">
        <Col>
          <h4 className="mb-3">Sales Volume Over the Past Months</h4>
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
        </Col>
      </Row>

      {/* Interactive Sections */}
      <Row className="mb-4">
        <Col md={6} sm={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>📌 Inventory Management</Card.Title>
              <Card.Text>Monitor and manage stock levels efficiently.</Card.Text>
              <Button variant="primary" size="lg" block>Manage Inventory</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>📊 Market Trends</Card.Title>
              <Card.Text>Stay updated with latest market movements.</Card.Text>
              <Button variant="primary" size="lg" block>View Insights</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default Dashboard;
