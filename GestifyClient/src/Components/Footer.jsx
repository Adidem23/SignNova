import '../Components/Footer.css'; 
import Logo from '../Images/Logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={Logo} alt="Company Logo" className="company-logo" />
                    <h1>SignNova</h1>
                </div>
                <div className="footer-right">
                    <div className="contact-info">
                        <h3>Contact Us</h3>
                        <p>Email:adityasuryawanshi1310@gmail.com</p>
                        <p>Phone:+91 8421693017</p>
                    </div>
                    <div className="footer-features">
                        <h3>Features</h3>
                        <ul>
                            <a><li>Deploy</li></a>
                            <a><li>Mint</li></a>
                            <a><li>IPFS</li></a>
                        </ul>
                    </div>
                    <div className="footer-resources">
                        <h3>Resources</h3>
                        <ul>
                            <li>Adidem23</li>
                            <li>AthuGod</li>
                            <li>SassyDad</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Your SignNova All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
