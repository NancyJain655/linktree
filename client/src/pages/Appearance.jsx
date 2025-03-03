import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import lastlogo from "../assets/icons/BlackSpark.png";
import grid from "../assets/icons/Group 1171274800.png";
import Carousel from "../assets/icons/Group 1171274799.png";
import stack from "../assets/icons/Group 1171274801.png";
import styles from  "./Appearance.module.css";
import shareFrame from "../assets/icons/shareFrame.png";
import styleArray from "../components/array of style/styleArray";
import axios from "axios";
import { getUserData } from "../utils/apis/auth"; // Import update function
import { getLinks } from "../utils/apis/link";
import { getLayout } from "../utils/apis/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Appearence = () => {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [tempButtonColor, setTempButtonColor] = useState(buttonColor);
  const [tempButtonTextColor, setTempButtonTextColor] =useState(buttonTextColor);
  const [frameStyle, setFrameStyle] = useState(styleArray["colopatlet3"]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("");
  const [selectedFont, setSelectedFont] = useState("DM Sans");
const [selectedButton, setSelectedButton] = useState(""); // Selected Button
  const [links, setLinks] = useState([]);
   const [username, setUsername] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#342B26"); // Default color
  const [appearance,setAppearance]=useState();

  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
     
      progress: undefined,
      closeButton: ({ closeToast }) => (
        <button onClick={closeToast} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
          ❌
        </button>
      ),
      style: {
        background: type === "success" ? "green" : "red",  // 🔥 Custom background
        color: "white",  // ✅ Text color white
        fontWeight: "bold", // Optional: Makes text bold
        fontSize: "16px", // Optional: Adjust font size
      },
    });
    
  };
 
  // Button groups
  const buttonGroups = [
    { label: "Fill", buttons: ["colopatlet1", "colopatlet2", "colopatlet3"] },
    {
      label: "Outline",
      buttons: ["colopatlet4", "colopatlet5", "colopatlet6"],
    },
    {
      label: "Hard shadow",
      buttons: ["colopatlet7", "colopatlet8", "colopatlet9"],
    },
    {
      label: "Soft shadow",
      buttons: ["colopatlet10", "colopatlet11", "colopatlet12"],
    },
    {
      label: "Special",
      buttons: [
        "colopatlet13",
        "colopatlet14",
        "colopatlet15",
        "colopatlet16",
        "colopatlet17",
        "colopatlet18",
      ],
    },
  ];

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    let style = {
      ...styleArray[button],
      backgroundColor: handleButtonColorChange,
      color: handleButtonTextColorChange,
      fontFamily: handleFontChange,
      width:frameStyle?.width||"90%",
      height:frameStyle?.height||"auto",
    };
    if (
      button.includes("colopatlet1") ||
      button.includes("colopatlet2") ||
      button.includes("colopatlet3")
    ) {
      style.border = "2px solid " + buttonTextColor;
      style.borderRadius = button.includes("colopatlet3")
        ? "2rem"
        : button.includes("colopatlet2")
        ? "1rem"
        : "0rem";
      
    }
    if (
      button.includes("colopatlet4") ||
      button.includes("colopatlet5") ||
      button.includes("colopatlet6")
    ) {
      style.border = "2px solid " + buttonTextColor;
      style.borderRadius = button.includes("colopatlet6")
        ? "2rem"
        : button.includes("colopatlet5")
        ? "1rem"
        : "0rem";
    }

    if (
      button.includes("colopatlet7") ||
      button.includes("colopatlet8") ||
      button.includes("colopatlet9")
    ) {
      style.boxShadow = "6px 6px 0px rgba(0, 0, 0, 1)";
      style.borderRadius = button.includes("colopatlet9")
        ? "1rem"
        : button.includes("colopatlet8")
        ? "0.5rem"
        : "0rem";
    }
    if (
      button.includes("colopatlet10") ||
      button.includes("colopatlet11") ||
      button.includes("colopatlet12")
    ) {
      style.boxShadow = "6px 6px 0px rgba(0, 0, 0, 0.3)";
      style.borderRadius =
        button.includes("colopatlet12") || button.includes("colopatlet12")
          ? "2rem"
          : button.includes("colopatlet11")
          ? "1rem"
          : "0rem";
    }
    if (button.includes("colopatlet13") || button.includes("colopatlet14")) {
      style.clipPath =
        "polygon(0% 10%, 5% 0%, 10% 8%, 15% 2%, 20% 6%, 25% 0%, 30% 6%, 35% 2%, 40% 10%, 45% 4%, 50% 6%, 55% 2%, 60% 10%, 65% 0%, 70% 8%, 75% 2%, 80% 6%, 85% 0%, 90% 8%, 95% 2%, 100% 10%, 100% 90%, 95% 100%, 90% 92%, 85% 100%, 80% 94%, 75% 100%, 70% 92%, 65% 100%, 60% 94%, 55% 100%, 50% 92%, 45% 100%, 40% 94%, 35% 100%, 30% 92%, 25% 100%, 20% 94%, 15% 100%, 10% 92%, 5% 100%, 0% 90%)";
    }

    if (button.includes("colopatlet15")) {
      style.border = "1px solid black";
    }

    if (button.includes("colopatlet16")) {
      style.borderRadius = "2rem";
    }
    if (button.includes("colopatlet17")) {
      style.position = "relative";
      style.border = "2px solid black";
    }

    if (button.includes("colopatlet18")) {
      style.borderRadius = "2rem 0px 0px 2rem";
    }
    setFrameStyle(style);
  };

  const handleButtonColorChange = (e) => {
    setButtonColor(e.target.value);
    setTempButtonColor(e.target.value);
    setFrameStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: e.target.value,
    }));
  };

  const handleButtonTextColorChange = (e) => {
    setButtonTextColor(e.target.value);
    //setFrameStyle((prevStyle) => ({ ...prevStyle, color: e.target.value }));
  };

  const handleButtonTextChange = (e) => {
    const newText = e.target.value;
    setTempButtonColor(newText);
    if (/^#([0-9A-F]{6})$/i.test(newText)) {
      setButtonColor(newText);
    }
  };
useEffect(() => {
     // ✅ Step 1: Check if this runs
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setUsername(userObject.username);
    }
});


  const handleLayoutChange = (layout) => {

  
    const selectedStyle = styleArray.find((item) => item.name === layout);
  
    if (selectedStyle) {
      setSelectedLayout(layout); // ✅ Store selected layout name
      setFrameStyle(selectedStyle.styles); // ✅ Apply the correct style object
      console.log("Updated Frame Style:", selectedStyle.styles);
    } else {
      console.error("Invalid layout selected:", layout);
    }
  };

  useEffect(() => {
    setFrameStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: buttonColor,
      color: buttonTextColor,
    }));
  }, [buttonColor, buttonTextColor]);

  const handleFontChange = (e) => {
    setFrameStyle((prevStyle) => ({
      ...prevStyle,
      fontFamily: e.target.value,
    }));
  };
  useEffect(() => {
    const fetchLayout = async () => {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      if (!token) return;

      const appearance = await getLayout(token);
      showToast("Theme updated successfully","success")
      if (appearance ) {
        setAppearance(appearance);
      }
    };

    fetchLayout();
  }, []);
  const handleThemeChange = (themeName) => {
   
  
    const selectedThemeObj = styleArray.find((style) => style.name === themeName);
  
    if (selectedThemeObj) {
   
  
      if (selectedThemeObj.styles.backgroundColor) {
        setSelectedTheme(selectedThemeObj.styles.backgroundColor);
        
      } else {
        console.warn("No background color found for this theme.");
      }
    } else {
      console.warn("Theme not found in stylesArray.");
    }
  };
  const themeMapping = {
   "Air Snow":"Themecont1" ,
    "Air Grey":"Themecont2" ,
   "Air Smoke" : "Themecont3",
    "Air Black": "Themecont4",
    "Mineral Blue" :"Themecont5",
   "Mineral Green": "Themecont6",
    "Mineral Orange": "Themecont7",
  };
  const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getUserData(token); // API call to fetch latest user data
       
        setSelectedColor(response.backColor);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  const handleSaveAppearance = async () => {
    console.log("Selected Theme:", selectedTheme);
    console.log("Theme Mapping:", themeMapping);
    console.log("Mapped Theme:", themeMapping[selectedTheme]);
    console.log("Selected Layout:", selectedLayout);

    const appearanceData = {
      layout:selectedLayout,
      button: selectedButton,
      button_text: buttonTextColor,
      font: selectedFont,
      fontcolor: buttonTextColor,
      themes:selectedTheme, // ✅ Ensure a valid value
    };
    console.log(appearanceData);
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/layout/appearance`,
        appearanceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Appearance updated:", response.data);
    } catch (error) {
      console.error("Error updating appearance:", error);
    }
  };


  useEffect(() => {
    const token=localStorage.getItem("token");
    const fetchLinks = async () => {
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
    };

    fetchLinks();
  }, []);

  useEffect(() => {
     
      const filtered = links.filter((link) => link.type?.toLowerCase() === selectedTab.toLowerCase());
      setFilteredLinks(filtered);
    }, [selectedTab, links]);
   useEffect(() => {
       fetchUserData();
     }, []);
  // Filter links based on the selected tab
  
  return (
    <div className={styles.container}>
     
    <Sidebar />
    <div className={styles.mainContent}>
      <Main />
      <div className={styles.contentWrapper}>
        <div className={styles.frameSection} style={{ paddingTop: "2rem" }}>
                    <div className={styles.frame} style={{ backgroundColor: selectedTheme|| appearance?.themes }}>
                      <div className={styles.frameUsername} style={{ backgroundColor: selectedColor }}>
                      <button className={styles.shareButton} >
        <img src={shareFrame} alt="Share" className={styles.shareFrame} />
      </button>
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
                      <div className={styles.content1} >

{filteredLinks.length > 0 ? (
                  <div className={`${styles.frameLinks}`}style={frameStyle}>
                    {filteredLinks.map((item, index) => (
                      <div key={index} className={`${styles.frameLink} ${styles[selectedButton]}`} >
                        <span className={styles.frameIcon}></span>
                        <span>{item.title}</span> {/* Display the link name */}
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

                  <div className={styles.profileContainer}>
      {/* Layout Section */}
      <div className={styles.layout}>
        <label className={styles.nameOfLay}>Layout</label>
        <div className={styles.layoutButtons}>
          <button className={styles.layoutBtn}>
            <img  src={stack} className={`${styles.layoutImg} ${selectedLayout === "stack" ? styles.selected : ""}`}
  onClick={() => handleLayoutChange("stack")}/>
            Stack
          </button>
          <button  className={styles.layoutBtn} >
            <img  src={grid} className={`${styles.layoutImg} ${selectedLayout === "grid" ? styles.selected : ""}`}
  onClick={() => handleLayoutChange("grid")} />
            Grid
          </button>
          <button className={styles.layoutBtn} >
            <img  src={Carousel} className={`${styles.layoutImg} ${selectedLayout === "carousel" ? styles.selected : ""}`}
  onClick={() => handleLayoutChange("carousel")}/>
            Carousel
          </button>
        </div>
      </div>

      {/* Button Background Section */}
      <div className={styles.buttonBg}>
        <p className={styles.nameOfLay1}>Buttons</p>
        <div className={styles.buttons}>
          {buttonGroups.map((group, index) => (
            <div
              key={index}
              className={
                group.label === "Special" ? styles.layoutButtons12 : styles.layoutButtons1
              }
            >
              <p>{group.label}</p>
              <div
                className={
                  group.label === "Special"
                    ? styles.layoutButtons3
                    : styles.layoutButtons2
                }
              >
                {group.buttons.map((button) => (
                  <button
                    key={button}
                     className={`${styles[button]} ${selectedButton === button ? styles.selected : ""}`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.includes("colopatlet") ? "" : ""}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Button Color */}
        <div className={styles.buttonColor}>
          <p>Button color</p>
          <div className={styles.buttonConts1}>
            <input
              className={styles.inputOfColor}
              type="color"
              value={buttonColor}
              onChange={handleButtonColorChange}
            />
            <div className={styles.buCont}>
              <p className={styles.buText}>Button color</p>
              <input
                type="text"
                className={styles.buInp}
                value={buttonColor}
                onChange={handleButtonColorChange}
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Button Font Color */}
        <div className={styles.buttonColor}>
          <p>Button font color</p>
          <div className={styles.buttonConts1}>
            <input
              className={styles.inputOfColor}
              type="color"
              value={buttonTextColor}
              onChange={handleButtonTextColorChange}
            />
            <div className={styles.buCont}>
              <p className={styles.buText}>Button font color</p>
              <input
                type="text"
                className={styles.buInp}
                value={buttonTextColor}
                onChange={handleButtonTextColorChange}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fonts Section */}
      <div className={styles.fontsStyle}>
        <label>Fonts</label>
        <div className={styles.fontCont}>
          <h5 style={{ marginLeft: "0.8rem" }}>Font</h5>
          <div className={styles.fontsContainer}>
            <div className={styles.fontText} style={{ color: buttonTextColor }}>
              Aa
            </div>
            <select className={styles.fontInput} onChange={handleFontChange}>
              <option value="DM Sans">DM Sans</option>
              <option value="Arial">Arial</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>

          {/* Font Color */}
          <div className={styles.fontCont1}>
            <h5 style={{ marginLeft: "1rem", marginTop: "1rem", marginBottom: "0.5rem" }}>
              Color
            </h5>
            <div className={styles.fontsContainers}>
              <input
                className={styles.inputOfColor}
                type="color"
                value={buttonTextColor}
                onChange={handleButtonTextColorChange}
              />
              <div className={styles.buCont}>
                <p className={styles.buText}>Font color</p>
                <input
                  type="text"
                  className={styles.buInp}
                  value={buttonTextColor}
                  onChange={handleButtonTextColorChange}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className={styles.themesCont}>
  <label className={styles.nameOfLay}>Themes</label>
  <div className={styles.themesDisplay}>
  {styleArray
  .filter((theme) => theme.name.startsWith("Themecont"))
  .map((theme) => (
    <div className={styles.buttonOfTheme} key={theme.name}>
      <button
        className={`${styles[theme.name]} ${
          selectedTheme === theme.name ? styles.selectedTheme : ""
        }`}
        onClick={() => handleThemeChange(theme.name)}
      >
        <span>&#9776;</span>
      </button>
      
      <span className={styles.airg}>{theme.displayName}</span>
      
    </div>
   
  )) }
 
  </div>
 
</div>

      {/* Save Button */}
      <div className={styles.saveStyleCont}>
        <button className={styles.styleSave} onClick={handleSaveAppearance}>
          Save
        </button>
      </div>
    </div>
      </div>
    </div>
    <ToastContainer/>
  </div>
  );
};

export default Appearence;