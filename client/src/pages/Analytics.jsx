import React from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
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

  const barChartData = {
    labels: ["Linux", "Mac", "iOS", "Windows", "Android", "Other"],
    datasets: [
      {
        label: "Traffic",
        data: [2000, 3000, 2200, 2800, 1500, 1800],
        backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
      },
    ],
  };

 
  const pieChartData = {
    labels: ["YouTube", "Facebook", "Instagram", "Other"],
    datasets: [
      {
        data: [520, 220, 130, 110],
        backgroundColor: ["#005F4B",  "#77DD77", "#00A86B", "#A7F432"],
        borderWidth: 2,
        hoverOffset: 10, // Creates spacing when hovered
      },
    ],
  };
  
  const trafficBarChartData = {
    labels: ["Link 1", "Link 2", "Link 3", "Link 4", "Link 5", "Link 6"],
    datasets: [
      {
        label: "Clicks",
        data: [1200, 2500, 1800, 3000, 1300, 2200],
        backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
      },
    ],
  };

  return (
    <div className={styles.analyticsContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.headerContainer}>
        <Main/>
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
          <div className={styles.card}>
            <p>Clicks on Links</p>
            <h2>2,318</h2>
          </div>
          <div className={`${styles.card} ${styles.lightGreen}`}>
            <p>Click on Shop</p>
            <h2>7,265</h2>
          </div>
          <div className={`${styles.card} ${styles.lightGreen}`}>
            <p>CTA</p>
            <h2>156</h2>
          </div>
        </div>

        {/* Line Chart - Full Width */}
        <div className={styles.chartFullWidth}>
  <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: false },tooltip: { backgroundColor: "white" } },scales: {
        x: { grid: { display: false },
        border: { display: false } ,
    ticks:{padding:30}},
        y: { grid: { display: false },
        border: { display: false },ticks:{padding:30} }
      } }} />
</div>

{/* Traffic by Device & Sites (Side by Side) */}
<div className={styles.chartRow}>
<div className={`${styles.chartHalf} ${styles.barChart}`} >
<h3 className={styles.chartTitle}>Traffic by Device</h3>
    <Bar data={barChartData} options={{ responsive: true,maintainAspectRatio:false, plugins: { legend: { display: false },tooltip: { backgroundColor: "white" } },scales: {
        x: { grid: { display: false },
        border: { display: false } ,
        ticks:{padding:20,font: { size: 16 }}},
        y: { grid: { display: false },
        border: { display: false },ticks:{padding:20,font: { size: 16 }}, },
        
      } ,
      elements: {
        bar: {
          borderRadius: 10, // Adjust this value for more or less rounding
          borderSkipped: false, // Ensures all edges are rounded
        },
      },}} />
  </div>
  <div className={`${styles.chartHalf} ${styles.pieChart}`}>
  <h3 className={styles.chartTitle}>Site</h3>
  <Doughnut
    data={pieChartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%", // Creates the ring effect
      plugins: {
        legend: {
          position: "right",
          labels: {
           // padding: 20,
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
  <Bar data={trafficBarChartData} options={{ responsive: true, plugins: { legend: { display: false } ,tooltip: { backgroundColor: "white" }},scales: {
        x: { grid: { display: false } ,
        border: { display: false },ticks:{padding:0,font: { size: 16 }}},
        y: { grid: { display: false },
        border: { display: false } ,ticks:{padding:30,font: { size: 16 }},}
      } ,
      elements: {
        bar: {
          borderRadius: 10, // Adjust this value for more or less rounding
          borderSkipped: false, // Ensures all edges are rounded
        },
      },}} />
</div>
      </div>
    </div>
    </div>
  );
};

export default Analytics;
