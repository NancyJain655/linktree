import React from "react";
import styles from "../styles/MainSection.module.css";
import analyticsImg from "../assets/analytics.png"; // Ensure the image exists in your assets folder
import moneyImg from "../assets/money.png"; // Money image
import cardsImg from "../assets/cards.png"; // Cards image
import customerIcon from "../assets/customerIcon.png"; // Customer icon image
import customerAvatar from "../assets/avatar.png"; // Customer icon image
import booksIcon from "../assets/book.png"; 
import audiomackIcon from "../assets/audiomock.png";
import bandsintownIcon from "../assets/Badsintown.png";
import bonfireIcon from "../assets/bornfire.png";
import buyMeAGiftIcon from "../assets/buygift.png";
import cameoIcon from "../assets/cameo.png";
import clubhouseIcon from "../assets/clubhouse.png";
import communityIcon from "../assets/community.png";
import contactDetailsIcon from "../assets/contact.png";
import { useNavigate } from "react-router-dom"; 

const MainSection = () => {
    const navigate = useNavigate(); // Hook for navigation
    
      const handleSignUp = () => {
        navigate("/signup"); // Redirect to Signup page
      };
    
    const gridItems = [
        { icon: audiomackIcon, title: "Audiomack", description: "Add an Audiomack player to your Linktree" },
        { icon: bandsintownIcon, title: "Bandsintown", description: "Drive ticket sales by listing your events" },
        { icon: bonfireIcon, title: "Bonfire", description: "Display and sell your custom merch" },
        { icon: booksIcon, title: "Books", description: "Promote books on your Linktree" },
        { icon: buyMeAGiftIcon, title: "Buy Me A Gift", description: "Let visitors support you with a small gift" },
        { icon: cameoIcon, title: "Cameo", description: "Make impossible fan connections possible" },
        { icon: clubhouseIcon, title: "Clubhouse", description: "Let your community in on the conversation" },
        { icon: communityIcon, title: "Community", description: "Build an SMS subscriber list" },
        { icon: contactDetailsIcon, title: "Contact Details", description: "Easily share downloadable contact details" },
    ];
    return (
        <main className={styles.main}>
            {/* Existing Section with Analytics Image */}
            <div className={styles.content}>
                <div className={styles.textSection}>
                    <h1>The easiest place to update and share your Connection</h1>
                    <p>Help your followers discover everything you’re sharing all over the internet...</p>
                    <button className={styles.ctaButton} onClick={handleSignUp}>Get your free Spark</button>
                </div>
                <div className={styles.imageSection}>
                    <img src={analyticsImg} alt="Analytics Dashboard" className={styles.analyticsImage} />
                </div>
            </div>

            {/* New Section with Money Image on the Left */}
            <div className={styles.moneyContent}>
                <div className={styles.moneyImageSection}>
                    <img src={moneyImg} alt="Money Growth" className={styles.moneyImage} />
                </div>
                <div className={styles.moneyTextSection}>
                    <h1>Analyse your audience and keep your followers engaged</h1>
                    <p>Track your engagement over time ,monitor revenue and learn what's converting your audience.Make informed updates on the fly to keep them coming back.</p>
                </div>
            </div>

            {/* New Section with Cards Image on the Right */}
            <div className={styles.cardsContent}>
                <div className={styles.cardsTextSection}>
                    <h1>Share limitless content in limitless ways</h1>
                    <p>Connect your content in all its forms and help followers find more of what they are looking for.Your Tik Tok,Tweets,You Tube videos ,music ,articles ,receipes ,podcasts and more.It all comes together in one powerful place.</p>
                </div>
                <div className={styles.cardsImageSection}>
                    <img src={cardsImg} alt="Cards Showcase" className={styles.cardsImage} />
                </div>
            </div>

            {/* Customer Section */}
            <div className={styles.customerContent}>
                {/* Left Side: Title + Customer Right in the same row */}
                <div className={styles.customerLeft}>
                    <h1 className={styles.customerTitle}>
                        Here what our <span className={styles.customerGreen}>customer</span> has to say
                    </h1>
                    <div className={styles.customerRight}>
                        <img src={customerIcon} alt="Customer Icon" className={styles.customerIcon} />
                        <p className={styles.customerDescription}>
                            [short description goes in here] lorem ipsum is a placeholder text to demonstrate.
                        </p>
                    </div>
                </div>

                {/* Below the text, aligned left */}
                <button className={styles.customerButton}>Read customer stories</button>
            </div>

            {/* 2x2 Grid Section */}
            <div className={styles.gridSection}>
                <div className={styles.gridItem}>
                <h2>Amazing tool! Saved me months</h2>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.</p>
                <div className={styles.testimonialFooter}>
                        <img src={customerAvatar} alt="Customer" className={styles.testimonialAvatar} />
                        <div className={styles.testimonialInfo}>
                            <span>John Master</span>
                            <p>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.gridItem}>
                <h2>Amazing tool! Saved me months</h2>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.</p>
                <div className={styles.testimonialFooter}>
                        <img src={customerAvatar} alt="Customer" className={styles.testimonialAvatar} />
                        <div className={styles.testimonialInfo}>
                            <span>John Master</span>
                            <p>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.gridItem}>
                <h2>Amazing tool! Saved me months</h2>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.</p>
                <div className={styles.testimonialFooter}>
                        <img src={customerAvatar} alt="Customer" className={styles.testimonialAvatar} />
                        <div className={styles.testimonialInfo}>
                            <span>John Master</span>
                            <p>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.gridItem}>
                <h2>Amazing tool! Saved me months</h2>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.</p>
                <div className={styles.testimonialFooter}>
                        <img src={customerAvatar} alt="Customer" className={styles.testimonialAvatar} />
                        <div className={styles.testimonialInfo}>
                            <span>John Master</span>
                            <p>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className={styles.gridHeading}>All links and apps integrations</h2>
            {/* 3x3 Grid Section */}
<div className={styles.gridSectionThree}>
    {gridItems.map((item, index) => (
        <div key={index} className={styles.gridIteming}>
            <img src={item.icon} alt={item.title} className={styles.gridIconing} />
            <div className={styles.gridTexting}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    ))}
</div>


        </main>
    );
};

export default MainSection;
