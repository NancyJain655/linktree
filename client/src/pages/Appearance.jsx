import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import lastlogo from "../assets/icons/BlackSpark.png";
import grid from "../assets/icons/Group 1171274800.png";
import Carousel from "../assets/icons/Group 1171274799.png";
import stack from "../assets/icons/Group 1171274801.png";
import styles from  "./Appearance.module.css";
import styleArray from "../components/array of style/styleArray";
import axios from "axios";

const Appearence = () => {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [tempButtonColor, setTempButtonColor] = useState(buttonColor);
  const [tempButtonTextColor, setTempButtonTextColor] =
    useState(buttonTextColor);
  const [selected, setSelected] = useState("colopatlet3");
  const [frameStyle, setFrameStyle] = useState(styleArray["colopatlet3"]);
  const [selectedTheme, setSelectedTheme] = useState("Themecont1");
  const [frameBgColor, setFrameBgColor] = useState("#ffffff");
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const [selectedFont, setSelectedFont] = useState("DM Sans");

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
    setSelected(button);
    let style = {
      ...styleArray[button],
      backgroundColor: handleButtonColorChange,
      color: handleButtonTextColorChange,
      fontFamily: handleFontChange,
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
    setTempButtonTextColor(e.target.value);
    setFrameStyle((prevStyle) => ({ ...prevStyle, color: e.target.value }));
  };

  const handleButtonTextChange = (e) => {
    const newText = e.target.value;
    setTempButtonColor(newText);
    if (/^#([0-9A-F]{6})$/i.test(newText)) {
      setButtonColor(newText);
    }
  };

  const handleButtonFontTextChange = (e) => {
    const newText = e.target.value;
    setTempButtonTextColor(newText);
    if (/^#([0-9A-F]{6})$/i.test(newText)) {
      setButtonTextColor(newText);
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
  const handleThemeChange = (themeClass) => {
    setSelectedTheme(themeClass);
    const themeElement = document.querySelector(`.${themeClass}`);
    if (themeElement) {
      const computedStyle = window.getComputedStyle(themeElement);
      setFrameBgColor(computedStyle.backgroundColor);
    }
  };
  const handleSaveAppearance = async () => {
    const themeMapping = {
      Themecont1: "Air Snow",
      Themecont2: "Air Gray",
      Themecont3: "Air Smoke",
      Themecont4: "Air Black",
      Themecont5: "Mineral Blue",
      Themecont6: "Mineral Green",
      Themecont7: "Mineral Orange",
    };

    const appearanceData = {
      layout: selectedLayout,
      button: selected,
      button_text: buttonTextColor,
      font: selectedFont,
      fontcolor: buttonTextColor,
      themes: themeMapping[selectedTheme] || "Air Snow", // ✅ Ensure a valid value
    };

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/appearance`,
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

  return (
    <div className={styles.container}>
    <Sidebar />
    <div className={styles.mainContent}>
      <Main />
      <div className={styles.contentWrapper}>
        <div className={styles.frameSection}>
          <div className={styles.frame} style={frameStyle}>
            <div className={styles.frameUsername}>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
                className={styles.frameImg}
              />
              <h2>@islam_51</h2>
            </div>
            <div className={styles.frameButtons}>
              <button
                className={`${styles.tabBtn} ${
                  selectedTab === "Link" ? styles.active : ""
                }`}
                onClick={() => setSelectedTab("Link")}
              >
                Link
              </button>
              <button
                className={`${styles.tabBtn} ${
                  selectedTab === "Shop" ? styles.active : ""
                }`}
                onClick={() => setSelectedTab("Shop")}
              >
                Shop
              </button>
            </div>
            <div className={styles.content1}>
              {selectedTab === "Link" ? (
                <div className={styles.frameLinks}>
                  {[
                    "Latest YouTube Video",
                    "Latest Instagram Reel",
                    "Latest YouTube Video",
                    "Latest Instagram Reel",
                    "Latest YouTube Video",
                    "Latest Instagram Reel",
                  ].map((text, index) => (
                    <div key={index} className={styles.frameLink} style={frameStyle}>
                      <span className={styles.frameIcon}></span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.frameLinks}>
                  {[
                    "Latest Tshirt shopify",
                    "Latest pant olx",
                    "Latest shirt shopify",
                    "Latest jacket flipkart",
                    "Latest mobile anything",
                    "Latest laptop other",
                  ].map((text, index) => (
                    <div key={index} className={styles.frameLink} style={frameStyle}>
                      <span className={styles.frameIcon}></span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className={styles.getConnected}>Get Connected</button>
            <div className={styles.lastLogo}>
              <img src={lastlogo} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.profileContainer}>
          <div className={styles.layout}>
            <label className={styles.nameOfLay}>Layout</label>
            <div className={styles.layoutButtons}>
              <button className={styles.layoutBtn}>
                <img className={styles.layoutImg} src={stack} />
                Stack
              </button>
              <button className={styles.layoutBtn}>
                <img className={styles.layoutImg} src={grid} />
                Grid
              </button>
              <button className={styles.layoutBtn}>
                <img className={styles.layoutImg} src={Carousel} />
                Carousel
              </button>
            </div>
          </div>

          <div className={styles.buttonBg}>
            <p className={styles.nameOfLay1}>Buttons</p>
            {buttonGroups.map((group, index) => (
              <div key={index} className={styles.layoutButtons1}>
                <p>{group.label}</p>
                <div className={styles.layoutButtons2}>
                  {group.buttons.map((button) => (
                    <button
                      key={button}
                      className={`${styles[button]} ${
                        selected === button ? styles.selected : ""
                      }`}
                      onClick={() => handleButtonClick(button)}
                    ></button>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.buttonColor}>
              <p>Button color</p>
              <div className={styles.buttonConts1}>
                <input
                  className={styles.inputOfColor}
                  type="color"
                  value={buttonColor}
                  onChange={handleButtonColorChange}
                />
              </div>
            </div>

            <div className={styles.buttonColor}>
              <p>Button font color</p>
              <div className={styles.buttonConts1}>
                <input
                  className={styles.inputOfColor}
                  type="color"
                  value={buttonTextColor}
                  onChange={handleButtonTextColorChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.fontsStyle}>
            <label>Fonts</label>
            <div className={styles.fontCont}>
              <h5>Font</h5>
              <select className={styles.fontInput}>
                <option value="DM Sans">DM Sans</option>
                <option value="Arial">Arial</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
          </div>

          <div className={styles.themesCont}>
            <label className={styles.nameOfLay}>Themes</label>
            <div className={styles.themesDisplay}>
              {[
                "Air Snow",
                "Air Grey",
                "Air Smoke",
                "Air Black",
                "Mineral Blue",
                "Mineral Green",
                "Mineral Orange",
              ].map((themeName, index) => (
                <div className={styles.buttonOfTheme} key={index}>
                  <button
                    className={`${styles[`Themecont${index + 1}`]} ${
                      selectedTheme === `Themecont${index + 1}`
                        ? styles.selectedTheme
                        : ""
                    }`}
                    onClick={() => handleThemeChange(`Themecont${index + 1}`)}
                  >
                    <span>&#9776;</span>
                  </button>
                  <span className={styles.airg}>{themeName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.saveStyleCont}>
            <button className={styles.styleSave} onClick={handleSaveAppearance}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Appearence;