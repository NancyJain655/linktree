import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';
import styles from "./Landing.module.css";

const LandingPage = () => {
    return (
         <div className={styles.landingPage}>
         <Header />
            <MainSection />
            <Footer />
       </div>
    );
};

export default LandingPage;
