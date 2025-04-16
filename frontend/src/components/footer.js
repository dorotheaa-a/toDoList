import React from "react";

export default function Footer(){
    return(
        <footer className="footer">
<div className="footer__logo-section">
                <img src={logo} alt="Logo" className="footer__logo" />
                <p className="footer__title">Yoda</p>
            </div>

            <div className="footer__sections">
                {/* About Section */}
                {/* <div>
                    <h3 className="footer__heading">About Us</h3>
                    <p>
                        Your trusted platform for pet adoption. We connect loving homes with animals in need,
                        helping them find a safe and caring place.
                    </p>
                </div> */}

                {/* Quick Links Section */}
                <div className="footer__quicklink">
                    <h3 className="footer__heading">Quick Links</h3>
                    <ul className="footer__links">
                        {/* <li><a href="/about">About Us</a></li> */}
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer__contact">
                    <h3 className="footer__heading">Contact Us</h3>
                    <p>Email: contact@petadoption.com</p>
                    <p>Phone: +123-456-7890</p>
                    <p>Address: 123 Pet Lane, Animal City, AC 12345</p>
                </div>

                {/* Sign-Up Card */}
                <div className="footer__signup-card">
                    <h3 className="footer__heading">Stay Updated!</h3>
                    <p>Join our newsletter for pet adoption updates and tips.</p>
                    <Link to={"/create-account"}>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </Link>
                </div>
            </div>

            <div className="footer__bottom-text">
                &copy; 2024 Pet Adoption Platform | Designed with ❤️
            </div>
        </footer>
    );
}