import React, { useState } from "react";
import styles from "./Links.module.css"; // Using module CSS
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import lastlogo from "../assets/icons/BlackSpark.png";
import shop from "../assets/icons/shop.png";
import IconFire from "../assets/icons/FireGrey.png";

function Links() {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);

  const handleAddItem = () => {
    if (selectedTab === "Link") {
      setLinks([...links, `New Link ${links.length + 1}`]);
    } else {
      setShops([...shops, `New Shop ${shops.length + 1}`]);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Main />
        <div className={styles.contentWrapper}>
          <div className={styles.frameSection} style={{ paddingTop: "2rem" }}>
            <div className={styles.frame}>
              <div className={styles.frameUsername}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="User Avatar"
                  className={styles.frameImg}
                />
                <h2>@nap_1011</h2>
              </div>
              <div className={styles.frameButtons}>
                <button
                  className={`${styles.tabBtn} ${selectedTab === "Link" ? styles.active : ""}`}
                  onClick={() => setSelectedTab("Link")}
                >
                  Link
                </button>
                <button
                  className={`${styles.tabBtn} ${selectedTab === "Shop" ? styles.active : ""}`}
                  onClick={() => setSelectedTab("Shop")}
                >
                  Shop
                </button>
              </div>
              <div className={styles.content1}>
                {selectedTab === "Link" ? (
                  <div className={styles.frameLinks}>
                    {["Latest YouTube Video", "Latest Instagram Reel", "Latest YouTube Video", "Latest Instagram Reel"].map(
                      (item, index) => (
                        <div key={index} className={styles.frameLink}>
                          <span className={styles.frameIcon}></span>
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p>Showing Shop Content</p>
                )}
              </div>
              <button className={styles.getConnected}>Get Connected</button>
              <div className={styles.lastLogo}><img src={lastlogo} alt="" />
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className={styles.profileContainer}>
            <label className={styles.pcf}>Profile</label>
            <div className={styles.profileBox}>
              <div className={styles.profileTop}>
                <div className={styles.profileImgs}>
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt=""
                    className={styles.profileImg}
                  />
                </div>
                <div className={styles.profileButtons}>
                  <label className={styles.customFileUpload}>
                    <input type="file" />
                    Pick an image
                  </label>
                  <button className={styles.remove}>Remove</button>
                </div>
              </div>
              <div className={styles.profileInput}>
                <label className={styles.label}>Profile Title</label>
                <h4>@nap_1011</h4>
              </div>
              <div className={styles.profileBio}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textofBio} defaultValue="Bio"></textarea>
              </div>
            </div>

            {/* Links Section */}
            <div className={styles.addLinkContainer}>
              <div className={styles.addLink}>
                <button
                  className={`${styles.addBtn} ${selectedTab === "Link" ? styles.active : ""}`}
                  onClick={() => setSelectedTab("Link")}
                >  <img src={shop} alt="" />
                  Add Link
                </button>
                <button
                  className={`${styles.shopBtn} ${selectedTab === "Shop" ? styles.active : ""}`}
                  onClick={() => setSelectedTab("Shop")}
                >
                  Add Shop
                  <img src={shop} alt="" />
                </button>
              </div>

              {/* Dynamic Add Button */}
              <button className={styles.fullWidth} onClick={handleAddItem}>
                + Add {selectedTab}
              </button>
              <div className={styles.content}>
                {selectedTab === "Link" && links.length > 0 && (
                  <ul>
                    {links.map((link, index) => (
                      <li key={index}>{link}</li>
                    ))}
                  </ul>
                )}
                {selectedTab === "Shop" && shops.length > 0 && (
                  <ul>
                    {shops.map((shop, index) => (
                      <li key={index}>{shop}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Banner Section */}
            <label>Banner</label>
            <div className={styles.bannerContainer}>
              <div className={styles.banner}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                  className={styles.frameImg}
                />
                <h4>@nap_1011</h4>
                <h3> <img
                    src={IconFire}
                    alt=""
                    style={{ width: "0.9rem", marginRight: "2px" }}
                  />{" "}/nap_1011</h3>
              </div>
              <label>Custom Background Color</label>
              <div className={styles.colorOptions}>
                <span className={`${styles.color} ${styles.dark}`}></span>
                <span className={`${styles.color} ${styles.light}`}></span>
                <span className={`${styles.color} ${styles.black}`}></span>
              </div>
              <div className={styles.colorInput}>
                <span className={styles.color}></span>
                <input type="text" placeholder="#000000" />
              </div>
            </div>
            <button className={styles.saveBtn}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
