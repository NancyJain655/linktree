import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from "../utils/apis/auth"; // Import update function
import { getLinks } from "../utils/apis/link";
import styles from "./Appearance.module.css";
import dp from "../assets/ImageBoy.png";
import lastlogo from "../assets/icons/BlackSpark.png";
import LinkButton from "../components/LinkButton";
import axios from 'axios';
const Frame = () => {
    const { id } = useParams();
const [selectedColor,setSelectedColor] =useState("");
const [username,setUsername] =useState("");
 const [userId, setUserId] = useState('')
const [error, setError] = useState("");
const [edit, setEdit] = useState(false);
const [loading, setLoading] = useState(true);
const baseUrl = import.meta.env.VITE_BASEURL;
const [links, setLinks] = useState([]); // Store fetched links
const [selectedTab, setSelectedTab] = useState("Link");
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
    });
    const handleGetConnectedClick = async (event) => {
        event.preventDefault();
        try {
          // For the Get Connected button, you'll track the click as well
          const user=localStorage.getItem("user");
          const parsedData=JSON.parse(user);
          const uid=parsedData.id;
  
          const response = await axios.get(baseUrl +'/api/analyticscta/'+uid);
      
          if (response.status === 200) {
            console.log('Get Connected click tracked');
            // Redirect to the external link
            setTimeout(() => {
              window.location.href = "https://linktree-tan-one.vercel.app/login";
            }, 10000);
          }
        } catch (error) {
          console.error('Error tracking Get Connected click:', error);
        }
      };
     useEffect(() => {
          
           const storedUser = localStorage.getItem("user");
           const token = localStorage.getItem("token");
           if (storedUser) {
             const userObject = JSON.parse(storedUser);
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
        axios.get(baseUrl+'/api/appearance/'+uid, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in request
            },
          
        })
            .then((res) => {
                console.log('res', res)
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
       
       
       
       
           ];
           const trackLinkClick = async (event,linkId) => {
            event.preventDefault();
            try {
              // Send request to backend to track click
               const response = await axios.get(baseUrl+'/api/analytics/'+linkId);
              if (response.status === 200) {
              console.log('Link click tracked');
              // Redirect after tracking
              setTimeout(() => {
                const link = links.find(link => link._id === linkId);
                if (link && link.url) {
                  window.location.href = link.url; // Redirect to the actual URL after delay
                }
              }, 2000);
              }
            } catch (error) {
              console.error('Error tracking link click:', error);
            }
          };
          const trackGetConnectedClick = async (event, linkId) => {
            event.preventDefault(); // Prevent the default action (such as navigating directly)
            try {
                // Send request to backend to track the "Get Connected" click
                const response = await axios.post(`${baseUrl}/api/analytics/${linkId}`, {
                    cta: true,  // Set CTA flag to true because this is a "Get Connected" click
                });
                if (response.status === 200) {
                    console.log('Get Connected click tracked');
                    
                    // After tracking, redirect user to the actual URL
                    setTimeout(() => {
                        const link = links.find(link => link._id === linkId);
                        if (link && link.url) {
                            window.location.href = link.url; // Redirect to the actual URL after tracking
                        }
                    }, 20000); // Optional delay of 20 seconds before redirecting
                }
            } catch (error) {
                console.error('Error tracking Get Connected click:', error);
            }
        };
       
  return (
    <div>
       <div className={styles.frame}
                        style={{
                            backgroundColor: themeMap.filter(item => item[appearanceData.themes])[0]?.styles.backgroundColor,
                          width:"400px",
                          margin:"auto",
                          height:"100vh",
                          position:"relative",
                          overflow:"hidden"
                        }}
                    >
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
                         <div key={index} onClick={(event) => trackLinkClick(event,link._id)}>
                                                <LinkButton
                                                   
                                                    img={dp}
                                                    title={link.title}
                                                    layout={appearanceData.layout}
                                                    customStyles={getSelectedButtonStyle()}
                                                    backgroundColor={themeMap.find(item => item[appearanceData.themes])?.styles.backgroundColor}
                                                    color={appearanceData.fonts.color}
                                                    font={appearanceData.fonts.font}
                                                />

</div>   
                                                </a>
                                            ))}
                                    </div>
                                )}

                            </div>
<button className={styles.getConnected} style={{position:"absolute",bottom:"3rem"}}>
<a 
    href="https://linktree-tan-one.vercel.app/login" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ textDecoration: 'none', color: 'inherit' }}
    onClick={(event) => trackGetConnectedClick(event, linkId)}
  >Get Connected
  </a></button>
              <div className={styles.lastLogo} style={{position:"absolute",bottom:"0rem"}}><img src={lastlogo} alt="" /></div>

                        </div>
                    </div>
    </div>
  )
}

export default Frame
