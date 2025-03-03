import React, { use, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import styles from "./Appearance.module.css";
import dp from "../assets/ImageBoy.png";
import LinkButton from "../components/LinkButton";
import stack from "../assets/icons/stack.png";
import grid from "../assets/icons/grid.png";
import lastlogo from "../assets/icons/BlackSpark.png";
import { getUserData } from "../utils/apis/auth";
import crousel from "../assets/icons/crousel.png"
import { getLinks } from "../utils/apis/link";
import shareFrame from "../assets/icons/shareFrame.png";

import axios from 'axios';

const Appearance = () => {
    const [selectedTab, setSelectedTab] = useState("Link");
    const [links, setLinks] = useState([]); // Store fetched links
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState(""); // State for dynamic username
    const [selectedColor, setSelectedColor] = useState(" "); // Default color
    const [appearanceData, setAppearanceData] = useState({
        layout: 'stack',
        buttons: {
            type: '',
            sequence: '',
            buttonColor: '',
            buttonTextColor: '',
        },

        fonts: {
            font: '',
            color: ''
        },
        themes: ''
    })
    const [edit, setEdit] = useState(false)

    const baseUrl = import.meta.env.VITE_BASEURL;
    const buttonsMap = [
        {
            fill: [
                {
                    type: '0',
                    styles: {
                        backgroundColor: 'black',
                        border: 'none',

                    }
                },
                {
                    type: '1',
                    styles: {
                        backgroundColor: 'black',
                        border: 'none',
                        borderRadius: '8px'
                    }
                },
                {
                    type: '2',
                    styles: {
                        backgroundColor: 'black',
                        border: '1px solid #e4e4e7',
                        borderRadius: '32px',

                    }
                }
            ]
        },
        {
            outline: [
                {
                    type: '0',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                    }
                },
                {
                    type: '1',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '8px'

                    }
                },
                {
                    type: '2',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '32px'

                    }
                }
            ],
        },
        {
            "hard-shadow": [
                {
                    type: '0',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 1)',

                    }

                },
                {
                    type: '1',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 1)',
                        borderRadius: '8px'

                    }
                },
                {
                    type: '2',
                    styles: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 1)',
                        borderRadius: '32px'

                    }
                }
            ]
        },
        {
            "soft-shadow": [
                {
                    type: '0',
                    styles: {
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 0.1)',

                    }
                },
                {
                    type: '1',
                    styles: {
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'

                    }
                },
                {
                    type: '2',
                    styles: {
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '4px 6px 0px rgba(0, 0, 0, 0.1)',
                        borderRadius: '32px'
                    }
                }
            ]
        },
        {
            special: [
                {
                    type: '0',
                },
                {
                    type: '1',
                },
                {
                    type: '2',
                }
            ]
        }
    ]

    const themeMap = [
        {
            'air-snow': '#ffeee2',
            styles: {
                backgroundColor: '#ffeee2',
                border: 'none',
            }
        },
        {
            'mineral-Orange': '#e0faee',
            styles: {
                backgroundColor: '#e0faee',
                border: 'none',
            }
        },

        {
            'air-Blue': '#dff7ff',
            styles: {
                backgroundColor: '#dff7ff',
                border: 'none',
            }
        },
        {
            'air-Smoke': '#2a3235',
            styles: {
                backgroundColor: '#2a3235',
                border: 'none',
            }
        },
        {
            'air-Black': '#ebebee',
            styles: {
                backgroundColor: '#ebebee',
                border: 'none',
            }
        },
        {
            'mineral-Grey': '#fff',
            styles: {
                backgroundColor: '#fff',
                border: 'none',
            }
        },
        {
            'mineral-black': '#000',
            styles: {
                backgroundColor: '#000',
                border: 'none',
            }
        },




    ]
    console.log('appearanceData', appearanceData)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getSelectedButtonStyle = () => {
        const { type, sequence } = appearanceData.buttons;

        // if (!type || !sequence) return null;
        const joinedType = type.split(" ").join('-');
        // Find the button category (fill, outline, etc.)
        const buttonCategory = buttonsMap?.find(category => category[joinedType]);
        if (!buttonCategory) return null;

        // Find the button type within that category
        const selectedButton = buttonCategory[joinedType]?.find(btn => btn.type == sequence);
        return selectedButton ? selectedButton.styles : null;
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
             }finally {
                setLoading(false); // ✅ Ensure loading is turned off
            }
           }
         };
         fetchLinks();
       }
     }, []);

    useEffect(() => {

        const user = localStorage.getItem('user');
        const parsedData = JSON.parse(user);
        const token = localStorage.getItem("token");
        const uid=parsedData.id;
        axios.get(baseUrl + '/api/appearance/' + uid, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in request
            },
            withCredentials: true, // Allow credentials
        })
            .then((res) => {
                console.log('res', res)
                setEdit(true)
                setAppearanceData({
                    layout: res.data.layout,
                    buttons: {
                        type: res.data.buttons.type.split('-').join(" "),
                        sequence: Number(res.data.buttons.style),
                        buttonColor: res.data.buttons.buttonColor,
                        buttonTextColor: res.data.buttons.buttonTextColor
                    },
                    fonts: {
                        font: res.data.fontFamily,
                        color: res.data.fontColor
                    },
                    themes: res.data.themes
                })
            }
            )
            .catch((err) => {
                console.log('err', err)
            })
    }, []);
    useEffect(()=>{
     const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await getUserData(token); // API call to fetch latest user data
         console.log(response.backColor);
          setSelectedColor(response.backColor);
          setUsername(response.username);
          setUserId(response.id);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    },[]);
    const handleSaveAppearance = () => {

        if (edit) {
            const user = localStorage.getItem('user');
            console.log(user);
            const parsedData = JSON.parse(user);
            const token = localStorage.getItem("token");
            const uid=parsedData.id;
            axios.put(baseUrl + '/api/appearance/'+uid, {
                layout: appearanceData.layout,
                buttons: {
                    type: appearanceData.buttons.type.split(' ').join("-"),
                    style: appearanceData.buttons.sequence,
                    buttonColor: appearanceData.buttons.buttonColor,
                    buttonTextColor: appearanceData.buttons.buttonTextColor
                },
                fontFamily: appearanceData.fonts.font,
                themes: appearanceData.themes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in request
                },
                withCredentials: true, // Allow credentials
            })
                .then((res) => {
                    console.log('res', res)
                })
                .catch((err) => {
                    console.log('err', err)
                })
        } else {
            const token = localStorage.getItem("token");
            axios.post(baseUrl + '/api/appearance', {
                layout: appearanceData.layout,
                buttons: {
                    type: appearanceData.buttons.type.split(' ').join("-"),
                    style: String(appearanceData.buttons.sequence),
                    buttonColor: appearanceData.buttons.buttonColor,
                    buttonTextColor: appearanceData.buttons.buttonTextColor
                },
                fontFamily: appearanceData.fonts.font,
                theme: appearanceData.themes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in request
                },
                withCredentials: true, // Allow credentials
            })
                .then((res) => {
                    console.log('res', res)
                })
                .catch((err) => {
                    console.log('err', err)
                })
        }
    }
    const shareableLink = userId ? `https://linktree-tan-one.vercel.app/frame/${userId}` : "";

  // Copy to Clipboard
  const handleShare = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
      });
    }
  };

    return (
        <div className={styles.appearanceContainer}>
            <Sidebar />
            <div className={styles.rightContainer}>
                <Main />

                <main className={styles.mainContainer}>

                    <div className={styles.frame}
                        style={{
                            backgroundColor: themeMap.filter(item => item[appearanceData.themes])[0]?.styles.backgroundColor

                        }}
                    >
                        <button className={styles.shareBtn} onClick={handleShare}>
        <img src={shareFrame} alt="Share" />
    </button>
                        <div className={styles.banner} style={{backgroundColor: selectedColor}}>
                            <img
                                              src="https://www.w3schools.com/howto/img_avatar.png"
                                              alt="User Avatar"
                                              className={styles.frameImg}
                                            />
                        <h2 style={{ color: selectedColor === "#000000" || selectedColor === "#342B26" ? "white" : "black" }}>{username}</h2>
                        </div>

                        <div className={styles.frameContent}>

                            <div className={styles.frameButtons}>
                                <button
                                    className={`${styles.tabBtn} ${selectedTab === "Link" ? styles.active : ""
                                        }`}
                                    onClick={() => setSelectedTab("Link")}
                                >
                                    Link
                                </button>
                                <button
                                    className={`${styles.tabBtn} ${selectedTab === "Shop" ? styles.active : ""
                                        }`}
                                    onClick={() => setSelectedTab("Shop")}
                                >
                                    Shop
                                </button>
                            </div>

                            <div className={styles.linkBtnContainer}>
                            {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p style={{ color: "red" }}>{error}</p>
                                ) : (
                                    <div className={styles[appearanceData.layout]}>
                                        {links
                                            .filter(link => link.type.toLowerCase() === selectedTab.toLowerCase()) // Filter links
                                            .map((link, index) => (
                                                <a 
                                  key={index}
                              href={link.url}  // Ensure this contains a valid URL
                             target="_blank"  // Open in new tab
                         rel="noopener noreferrer" > 
                                                <LinkButton
                                                    key={index}
                                                    img={dp}
                                                    title={link.title}
                                                    layout={appearanceData.layout}
                                                    customStyles={getSelectedButtonStyle()}
                                                    backgroundColor={themeMap.find(item => item[appearanceData.themes])?.styles.backgroundColor}
                                                    color={appearanceData.fonts.color}
                                                    font={appearanceData.fonts.font}
                                                />
                                                </a>
                                            ))}
                                    </div>
                                )}

                            </div>
<button className={styles.getConnected}>Get Connected</button>
              <div className={styles.lastLogo}><img src={lastlogo} alt="" /></div>

                        </div>
                    </div>

                    <div className={styles.themeContainer}>
                        <div className={styles.layout}>
                            <p>Layout</p>
                            <div className={styles.layoutContainer}>
                                <LayoutOption
                                    layout="stack"
                                    imageSrc={stack}
                                    altText="stack"
                                    setAppearanceData={setAppearanceData}
                                    appearanceData={appearanceData}
                                />
                                <LayoutOption
                                    layout="grid"
                                    imageSrc={grid}
                                    altText="grid"
                                    setAppearanceData={setAppearanceData}
                                    appearanceData={appearanceData}
                                />
                                <LayoutOption
                                    layout="carousal"
                                    imageSrc={crousel}
                                    altText="carousal"
                                    setAppearanceData={setAppearanceData}
                                    appearanceData={appearanceData}
                                />
                            </div>
                        </div>
                        <div className={styles.layout}>
                            <p>Buttons</p>
                            <div className={styles.buttonsContainer}>

                                {buttonsMap.map((item, index) => {
                                    // Get the key (e.g., 'fill', 'outline', etc.)
                                    const key = Object.keys(item)[0];
                                    return (
                                        <div key={index} className={styles[key]}>
                                            <h3>{capitalizeFirstLetter(key.split('-').join(" "))}</h3>
                                            <div className="buttonContainer">
                                                {item[key].map((button, btnIndex) => {
                                                    return (
                                                        <button
                                                            key={btnIndex}
                                                            style={{
                                                                ...button.styles,
                                                                border: appearanceData.buttons.type === key.split('-').join(" ") && appearanceData.buttons.sequence === btnIndex ? "2px solid red" : ""
                                                            }}
                                                            onClick={() => {
                                                                setAppearanceData({
                                                                    ...appearanceData,
                                                                    buttons: {
                                                                        ...appearanceData.buttons,
                                                                        type: key.split('-').join(" "),
                                                                        sequence: btnIndex
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            {/* {button.type} */}
                                                        </button>
                                                    )
                                                }
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                <div>
                                    <div>
                                        <h3>Button Color:</h3>
                                        <input
                                            type="color"
                                            id="button-color-picker"
                                            value={appearanceData.buttons.buttonColor}
                                            onChange={(e) => {
                                                setAppearanceData({
                                                    ...appearanceData,
                                                    buttons: {
                                                        ...appearanceData.buttons,
                                                        buttonColor: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <h3 htmlFor="font-color-picker">Button font Color:</h3>
                                        <input
                                            type="color"
                                            id="font-color-picker"
                                            value={appearanceData.buttons.buttonTextColor}
                                            onChange={(e) => {
                                                setAppearanceData({
                                                    ...appearanceData,
                                                    buttons: {
                                                        ...appearanceData.buttons,
                                                        buttonTextColor: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.fonts}>
                            <p>Fonts</p>
                            <div className="fontContainer">
                                <h3>Font Family:</h3>
                                <select
                                    value={appearanceData.fonts.font}
                                    onChange={(e) => {
                                        setAppearanceData({
                                            ...appearanceData,
                                            fonts: {
                                                ...appearanceData.fonts,
                                                font: e.target.value
                                            }
                                        });
                                    }}
                                >
                                    <option value="DM Sans">DM Sans</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Poppins">Poppins</option>
                                </select>
                            </div>
                            <div>
                                <h3>Font Color:</h3>
                                <input
                                    type="color"
                                    id="font-color-picker"
                                    value={appearanceData.fonts.color}
                                    onChange={(e) => {
                                        setAppearanceData({
                                            ...appearanceData,
                                            fonts: {
                                                ...appearanceData.fonts,
                                                color: e.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>

                        </div>
                        <div className={styles.themes}>
                            <div className={styles.themeContainer}>
                                <h3>Theme Color:</h3>
                                <div className={styles.themeOptions}>
                                    {
                                        themeMap.map((item, index) => {
                                            return (
                                                <ThemeOption
                                                    key={index}
                                                    theme={item}
                                                    setAppearanceData={setAppearanceData}
                                                    appearanceData={appearanceData}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                        <button
                            onClick={() => {
                                handleSaveAppearance()

                            }}
                            className={styles.saveBtn}

                        >
                            {edit ? "Update" : "Save"}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};



export default Appearance;

const LayoutOption = ({ layout, imageSrc, altText, setAppearanceData, appearanceData }) => {
    return (
        <div
            onClick={() => {
                setAppearanceData({
                    ...appearanceData,
                    layout: layout
                });
            }}
            style={{
                cursor: "pointer",
                border: appearanceData.layout === layout ? "1px solid #000" : "1px solid transparent"
            }}
        >
            <img src={imageSrc} alt={altText} />
        </div>
    );
};

const ThemeOption = ({ theme, setAppearanceData, appearanceData }) => {
    return (
        <div
            onClick={() => {
                setAppearanceData({
                    ...appearanceData,
                    themes: Object.keys(theme)[0]
                });
            }}
            style={{
                cursor: "pointer",
                border: appearanceData.themes === Object.keys(theme)[0] ? "2px solid red" : "1px solid transparent"
            }}
        >
            <div style={{ backgroundColor: theme.styles.backgroundColor, width: "100px", height: "250px" }}></div>
        </div>
    );
}