import React, { useState, useEffect } from "react";
import styles from "./Links.module.css"; // Using module CSS
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import lastlogo from "../assets/icons/BlackSpark.png";
import shop from "../assets/icons/shop.png";
import IconFire from "../assets/icons/FireGrey.png";
import Modal from "../components/Modal"; // ✅ Import Modal
import { getLinks } from "../utils/apis/link";
import stats from "../assets/icons/stats.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import deleteIcon from "../assets/icons/deleteIcon.png";
import edit from "../assets/icons/edit.png";
import { deleteLink } from "../utils/apis/link"; // Import API function
import { updateProfile } from "../utils/apis/auth"; // Import update function
import { getUserData } from "../utils/apis/auth"; // Import update function

function Links() {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [username, setUsername] = useState(""); // State for dynamic username
  const [showModal, setShowModal] = useState(false); // ✅ State for modal
  const [links, setLinks] = useState([]); // Store added links
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#342B26"); // Default color
  const [bio, setBio] = useState("Bio"); // Bio state
  
  const showToast = (message, type = "success") => {
    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: type === "success" ? "green" : "red",  // 🔥 Custom background
        color: "white",  // ✅ Text color white
        fontWeight: "bold", // Optional: Makes text bold
        fontSize: "16px", // Optional: Adjust font size
      },
      type: type,
    });
  };

  const colors = ["#342B26", "#FFFFFF", "#000000"];
  
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("No token found, cannot delete link.", "error");
      return;
    }
  
    try {
      await deleteLink(id, token);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id)); // Remove deleted link from state
      showToast("Link deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete link!", "error");
    }
  };
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot update profile.");
      return;
    }
  
    try {
      const response = await updateProfile(bio, selectedColor, token);
      console.log("Profile updated successfully:", response);
      showToast("Profile updated successfully!","success"); // Show success message
      fetchUserData();
    } catch (error) {
      console.error("Failed to update profile:", error);
      showToast("Failed to update profile!","error");
    }
  };
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await getUserData(token); // API call to fetch latest user data
      setBio(response.Bio);
      setSelectedColor(response.backColor);
      setUsername(response.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is running..."); // ✅ Step 1: Check if this runs
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    const token = localStorage.getItem("token");
    console.log("Stored User from LocalStorage:", storedUser); // ✅ Step 2: Check if user is found
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      console.log("Parsed User Object:", userObject);
      

      const fetchLinks = async () => {
        if (token) {
          try {
            const fetchedLinks = await getLinks(token);
            console.log("Fetched Links from API:", fetchedLinks);

            if (Array.isArray(fetchedLinks)) {
              setLinks(fetchedLinks);
              console.log("Links state after setting:", links);

            } else {
              console.error("API returned invalid format:", fetchedLinks);
            }
          } catch (error) {
            console.error("Error fetching links:", error);
          }
        }
      };
      fetchLinks();
    }
  }, []);
  useEffect(() => {
    console.log("Current selected tab:", selectedTab);
    console.log("Current links:", links);
    const filtered = links.filter((link) => link.type?.toLowerCase() === selectedTab.toLowerCase());
    console.log(`Filtered Links for ${selectedTab}:`, filtered);
    setFilteredLinks(filtered);
  }, [selectedTab, links]);
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={styles.container}>
       <ToastContainer />
      <Sidebar />
      <div className={styles.mainContent}>
        <Main />
        <div className={styles.contentWrapper}>
          <div className={styles.frameSection} style={{ paddingTop: "2rem" }}>
            <div className={styles.frame}>
              <div className={styles.frameUsername} style={{ backgroundColor: selectedColor }}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="User Avatar"
                  className={styles.frameImg}
                />
                <h2>{username}</h2>
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
              {filteredLinks.length > 0 ? (
          <div className={styles.linkList}>
            {filteredLinks.map((link, index) => (
              <div key={index} className={styles.frameLink}>
                <span className={styles.frameIcon}></span>
                <span>{link.title || link.shortUrl}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No links available</p>
        )}
              </div>
              <button className={styles.getConnected}>Get Connected</button>
              <div className={styles.lastLogo}><img src={lastlogo} alt="" /></div>
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
                <h4>{username}</h4>
              </div>
              <div className={styles.profileBio}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textofBio} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
              </div>
            </div>

            {/* Links Section */}
            <div className={styles.addLinkContainer}>
            <div className={styles.addLink}>
              <button
                className={`${styles.tabBtn2} ${selectedTab === "Link" ? styles.active : ""}`}
                onClick={() => setSelectedTab("Link")}
              >
                Link
              </button>
              <button
                className={`${styles.tabBtn2} ${selectedTab === "Shop" ? styles.active : ""}`}
                onClick={() => setSelectedTab("Shop")}
              >
                Shop
              </button>
            </div>

            <button className={styles.fullWidth} onClick={() => setShowModal(true)}>
              + Add {selectedTab}
            </button>
            <div className={styles.filteredLinksContainer}>
  {filteredLinks.length > 0 ? (
    filteredLinks.map((link, index) => (
      <div key={index} className={styles.linkCard1}>
        <span className={styles.dragIcon}>⋮⋮</span> {/* Drag handle */}
      <div key={index} className={styles.linkCard}>

        
        <div className={styles.cardContent}>
          
          <div className={styles.textContent}>
            <div className={styles.linkTitle}>
              <span>{link.title || "Instagram"}</span>
              <img src={edit} alt="Edit" className={styles.editIcon} />
            </div>
            <div className={styles.linkUrl}>
              <span>{link.shortUrl || "https://www.instagram.com/example"}</span>
              <img src={edit} alt="Edit" className={styles.editIcon} />
            </div>
          </div>
          <div className={styles.toggleDelete}>
            <input type="checkbox" className={styles.toggleSwitch} checked={true} />
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.clickStat}>
          <img src={stats} alt="Stats" className={styles.statsIcon} />
          <span>0 clicks</span>
          </div>
          <img src={deleteIcon} alt="Delete" onClick={() => handleDelete(link._id)} className={styles.deleteIcon} />
        </div>
      </div>
      </div>
    ))
  ) : (
    <p>No links available</p>
  )}
</div>
            </div>

            {/* Banner Section */}
            <label>Banner</label>
            <div className={styles.bannerContainer} >
              <div className={styles.banner} style={{ backgroundColor: selectedColor }}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                  className={styles.frameImg}
                />
                <h4>{username}</h4>
                <h3>
                  <img src={IconFire} alt="" style={{ width: "0.9rem", marginRight: "2px" }} />
                  {" /"}{username}
                </h3>
              </div>
              <div className={styles.colorPicker}>
        <p>Custom Background Color</p>
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <button
              key={color}
              className={styles.colorCircle}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        
        {/* Selected Color Preview & Input Field */}
        <div className={styles.selectedColor}>
          <div className={styles.colorSquare} style={{ backgroundColor: selectedColor }} />
          <input type="text" value={selectedColor} readOnly className={styles.colorInput} />
        </div>
      </div>
            </div>
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

      {/* ✅ Modal: Opens with Selected Tab ONLY from the Full Width Section Button */}
      {showModal && <Modal onClose={() => setShowModal(false)} selectedTab={selectedTab}/>}
    </div>
  );
}

export default Links;
