import './HeroSection2.css';
import { Link } from 'react-router-dom';

const HeroSection2 = () => {
    return (
        <section className="hero-section2">
            <div className="text-section">
                <h2 className="text-heading">SignNova Provides Solution For </h2>
            </div>
            <div className="button-container">
                <button className="btn-17">
                    <span className="text-container">
                        <Link to='/final'   style={{textDecoration:"none",listStyle:"none",color:"black"}}><span className="text"style={{color:"white"}} >Deploy</span></Link>
                    </span>
                </button>

                <button className="btn-17">
                    <span className="text-container">
                        <span className="text">Mint</span>
                    </span>
                </button>

                <button className="btn-17">
                    <span className="text-container">
                        <span className="text">IPFS</span>
                    </span>
                </button>

            </div>
        </section>
    );
};

export default HeroSection2;
