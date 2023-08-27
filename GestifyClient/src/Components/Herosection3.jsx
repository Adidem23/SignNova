import './HeroSection3.css';

const HeroSection3 = () => {
    return (
        <section className="hero-section-3">
            <div className="flex-container">
                <div className="left-text">
                    <h2 className="section-heading">No More Complications</h2>
                    <p className="section-content">Complete Your All Web3 Tasks in Just ThumbsUp </p>
                </div>
                <div className="right-card">
                    <div id='cardst'>
                        <div className="image"></div>
                        <div className="content">
                            <a href="#">
                                <span className="title">
                                    About Us
                                </span>
                            </a>

                            <p className="desc">
                                Grammarlys free sentence checker allows you to write your best wherever you love to write. Check for run-on sentences, tone, clarity, and more with Grammarly
                            </p>

                            <a className="action" href="#">
                                Connect
                                <span aria-hidden="true">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="three-cards">

                <div className="cardfor">
                    <div id='Imhugu' >

                    </div>
                    <span className="headingfor">Help</span>
                    <p className='pfor'>
                        Checkout the Following Content for Help
                        <br />
                        <br />

                        <a href='https://www.loom.com/share/6fab41e2d89747a4b86cb95201ce5fc0?sid=9ee2a2aa-4654-4bc9-b8bf-5ed10609901e' target='__blank'  style={{textDecoration:"none" , listStyle:"none" , color:"black"}}>Video Tutorials</a>
                    </p>
                </div>


                <div className="cardfor">
                    <div className="imgfor">

                    </div>
                    <span className="headingfor">Meet Us</span>
                    <p className='pfor'>
                        Aditya Suryawanshi 
                        <br />
                        Aspiring Blockchain And Mern Stack Developer
                        <br />
                        <br />

                    </p>
                </div>

                <div className="cardfor">
                    <div id='Imhugu2'>

                    </div>
                    <span className="headingfor">Projects</span>
                    <p className='pfor'>
                        Check Other Projects
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection3;
