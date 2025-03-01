import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { FaCalendarAlt } from "react-icons/fa";
import { Line, Bar, Doughnut } from "react-chartjs-2";
//import { getAnalyticsData } from "../utils/api/getAnalyticsData"; // Import API call

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAnalytics();
  }, []);

  // Dynamic Chart Data
  const lineChartData = analyticsData
  ? {
      labels: analyticsData?.lineChart?.labels || [],
      datasets: [
        {
          label: "Clicks on Links",
          data: analyticsData?.lineChart?.data || [],
          borderColor: "#28A263",
          backgroundColor: "rgba(40, 162, 99, 0.2)",
          tension: 0.4,
        },
      ],
    }
  : { labels: [], datasets: [] };
  const barChartData = {
    labels: analyticsData?.deviceTraffic?.labels||[],
    datasets: [
      {
        label: "Traffic",
        data: analyticsData?.deviceTraffic?.data || [],
        backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
      },
    ],
  };

  const pieChartData = {
    labels: analyticsData?.siteTraffic?.labels || [],
    datasets: [
      {
        data: analyticsData?.siteTraffic?.data||[],
        backgroundColor: ["#005F4B", "#77DD77", "#00A86B", "#A7F432"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const trafficBarChartData = {
    labels: analyticsData?.linkTraffic?.labels||[],
    datasets: [
      {
        label: "Clicks",
        data: analyticsData?.linkTraffic?.data||[],
        backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
      },
    ],
  };

  return (
    <div className={styles.analyticsContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.headerContainer}>
          <Main />
        </div>
        {isLoading ? (
  <div className={styles.loadingContainer}>
    <h2>Loading...</h2>
  </div>
) : analyticsData && analyticsData.lineChart ? (
  <div className={styles.contentWrapper}>
    <div className={styles.overviewHeader}>
      <h3>Overview</h3>
      <div className={styles.calendar}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <span>{analyticsData.dateRange || "N/A"}</span>
      </div>
    </div>

    {/* Overview Metrics */}
    <div className={styles.overviewSection}>
      <div className={styles.card}>
        <p>Clicks on Links</p>
        <h2>{analyticsData.totalClicks ?? 0}</h2>
      </div>
      <div className={`${styles.card} ${styles.lightGreen}`}>
        <p>Click on Shop</p>
        <h2>{analyticsData.shopClicks ?? 0}</h2>
      </div>
      <div className={`${styles.card} ${styles.lightGreen}`}>
        <p>CTA</p>
        <h2>{analyticsData.ctaClicks ?? 0}</h2>
      </div>
    </div>

    {/* Line Chart */}
    <div className={styles.chartFullWidth}>
      <Line
        data={{
          labels: analyticsData.lineChart.labels ?? [],
          datasets: [
            {
              label: "Clicks on Links",
              data: analyticsData.lineChart.data ?? [],
              borderColor: "#28A263",
              backgroundColor: "rgba(40, 162, 99, 0.2)",
              tension: 0.4,
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    </div>

    {/* Traffic by Device & Sites */}
    <div className={styles.chartRow}>
      <div className={`${styles.chartHalf} ${styles.barChart}`}>
        <h3 className={styles.chartTitle}>Traffic by Device</h3>
        <Bar
          data={{
            labels: analyticsData.barChart?.labels ?? [],
            datasets: [
              {
                label: "Traffic",
                data: analyticsData.barChart?.data ?? [],
                backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <div className={`${styles.chartHalf} ${styles.pieChart}`}>
        <h3 className={styles.chartTitle}>Site</h3>
        <Doughnut
          data={{
            labels: analyticsData.pieChart?.labels ?? [],
            datasets: [
              {
                data: analyticsData.pieChart?.data ?? [],
                backgroundColor: ["#005F4B", "#77DD77", "#00A86B", "#A7F432"],
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>

    {/* Traffic by Links */}
    <div className={styles.chartFullWidth2}>
      <h3 className={styles.chartTitle2}>Traffic by Links</h3>
      <Bar
        data={{
          labels: analyticsData.trafficBarChart?.labels ?? [],
          datasets: [
            {
              label: "Clicks",
              data: analyticsData.trafficBarChart?.data ?? [],
              backgroundColor: ["#28A263", "#66DDAA", "#005F4B", "#77DD77", "#00A86B", "#A7F432"],
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    </div>
  </div>
) : (
  <div className={styles.loadingContainer}>
    <h2>No Data Available</h2>
  </div>
)}

      </div>
    </div>
       
      
  );
};

export default Analytics;
