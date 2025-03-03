import React from 'react'

const Frame = () => {


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
  return (
    <div>
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
    </div>
  )
}

export default Frame
