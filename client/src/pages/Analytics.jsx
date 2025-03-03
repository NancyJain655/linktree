import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { FaCalendarAlt } from "react-icons/fa"; // Calendar icon
import { Line, Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

import axios from 'axios'

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {


  const [trafficData, setTrafficData] = useState([]);
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Clicks on Links",
        data: [1200, 1900, 3000, 2500, 4000, 3500, 4200],
        borderColor: "#28A263",
        backgroundColor: "rgba(40, 162, 99, 0.2)",
        tension: 0.4,
      },
    ],
  };


  const apiUrl = import.meta.env.VITE_BASEURL;
  useEffect(() => {
    axios.get(apiUrl + "/api/analytics", { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setTrafficData(res.data)
      }, {
        withCredentials: true
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  // Prepare data for the Bar Chart (Traffic by Device)
  const deviceData = trafficData.reduce((acc, item) => {
    item.deviceStats.forEach((deviceStat) => {
      if (acc[deviceStat.device]) {
        acc[deviceStat.device] += deviceStat.clicks;
      } else {
        acc[deviceStat.device] = deviceStat.clicks;
      }
    });
    return acc;
  }, {});

  const deviceLabels = Object.keys(deviceData);
  const deviceClicks = Object.values(deviceData);

  const barChartData = {
    labels: deviceLabels,
    datasets: [
      {
        label: 'Clicks by Device',
        data: deviceClicks,
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the Pie Chart (Traffic by Site)
  const pieChartData = {
    labels: trafficData.map((item) => item.title),
    datasets: [
      {
        data: trafficData.map((item) => item.totalClicks),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
        hoverOffset: 4
      }
    ]
  };



  // Prepare chart data from API response
  const trafficBarChartData = {
    labels: trafficData.map(item => item.title),  // Get the title of each link
    datasets: [
      {
        label: 'Total Clicks',
        data: trafficData.map(item => item.totalClicks),  // Get the totalClicks for each link
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalClicks = trafficData.reduce((acc, link) => acc + link.totalClicks, 0);
  const shopTitles = trafficData.filter(link => link.type === 'shop').map(link => link.title);
  const totalClicksShop = trafficData.reduce((acc, link) => {
    if (shopTitles.includes(link.title)) {
      acc += link.totalClicks;
    }
    return acc;
  }, 0);

  // FIXME:
  const viewsPerMonth = []

  return (
    <div className={styles.analyticsContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <Main />
        </div>
        {/* Overview Header & Calendar */}
        <div className={styles.contentWrapper}>
          <div className={styles.overviewHeader}>
            <h3>Overview</h3>
            <div className={styles.calendar}>
              <FaCalendarAlt className={styles.calendarIcon} />
              <span>Feb 9th to Feb 15th</span>
            </div>
          </div>

          {/* Overview Metrics */}
          <div className={styles.overviewSection}>
            {/* Clicks on Links */}
            <div className={styles.card}>
              <p>Clicks on Links</p>
              <h2>{totalClicks}</h2> {/* Replace with actual total clicks data */}
            </div>
            {/* Click on Shop */}
            <div className={`${styles.card} ${styles.lightGreen}`}>
              <p>Click on Shop</p>
              <h2>{totalClicksShop}</h2> {/* Replace with actual shop clicks data */}
            </div>
            {/* CTA */}
            <div className={`${styles.card} ${styles.lightGreen}`}>
              <p>CTA</p>
              <h2>156</h2> {/* Use static or dynamic CTA data as needed */}
            </div>
          </div>

          {/* Line Chart - Full Width */}
          <div className={styles.chartFullWidth}>
            <Line
              data={{
                labels: viewsPerMonth.map((data) => data.month), // Assuming 'viewsPerMonth' contains month-wise data
                datasets: [{
                  label: 'Views Per Month',
                  data: viewsPerMonth.map((data) => data.views), // Assuming each object in viewsPerMonth contains the 'views' data
                  borderColor: '#36A2EB',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: true,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { backgroundColor: 'white' },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { padding: 30 }
                  },
                  y: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { padding: 30 }
                  }
                }
              }}
            />
          </div>


          <div className={styles.chartRow}>
            {/* Traffic by Device - Bar Chart */}
            <div className={`${styles.chartHalf} ${styles.barChart}`}>
              <h3 className={styles.chartTitle}>Traffic by Device</h3>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: "white" }
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      border: { display: false },
                      ticks: { padding: 20, font: { size: 16 } }
                    },
                    y: {
                      grid: { display: false },
                      border: { display: false },
                      ticks: { padding: 20, font: { size: 16 } }
                    },
                  },
                  elements: {
                    bar: {
                      borderRadius: 10,
                      borderSkipped: false,
                    },
                  },
                }}
              />
            </div>

            {/* Traffic by Site - Pie Chart */}
            <div className={`${styles.chartHalf} ${styles.pieChart}`}>
              <h3 className={styles.chartTitle}>Site</h3>
              <Doughnut
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%", // Ring effect
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        font: { size: 18 },
                      },
                    },
                    tooltip: {
                      backgroundColor: "white",
                      titleColor: "#333",
                      bodyColor: "#333",
                      borderWidth: 1,
                      borderColor: "#ddd",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Traffic by Links - Full Width */}
          <div className={styles.chartFullWidth2}>
            <h3 className={styles.chartTitle2}>Traffic by Links</h3>
            <Bar
              data={trafficBarChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { backgroundColor: "white" }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { padding: 0, font: { size: 16 } }
                  },
                  y: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { padding: 30, font: { size: 16 } }
                  },
                },
                elements: {
                  bar: {
                    borderRadius: 10, // Adjust this value for more or less rounding
                    borderSkipped: false, // Ensures all edges are rounded
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
