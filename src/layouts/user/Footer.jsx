import React from 'react';

function Footer(props) {
    return (
        <footer className="footer-area gray-bg pt-100 pb-95">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5 col-12">
                            <div className="footer-widget">
                                <div className="footer-widget-l-content">
                                    <h4>20 Years Experience</h4>
                                    <ul>
                                        <li><a href="#"><i className="ion-social-twitter" /></a></li>
                                        <li><a href="#"><i className="ion-social-tumblr" /></a></li>
                                        <li><a href="#"><i className="ion-social-facebook" /></a></li>
                                        <li><a href="#"><i className="ion-social-instagram-outline" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-7 col-12">
                            <div className="footer-widget">
                                <div className="footer-widget-m-content text-center">
                                    <div className="footer-logo">
                                        <a href="#"><img src="/assets/assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                    <div className="footer-nav">
                                        <nav>
                                            <ul>
                                                <li><a href="index.html">home</a></li>
                                                <li><a href="about-us.html">about us</a></li>
                                                <li><a href="shop-grid-view-sidebar.html">shop </a></li>
                                                <li><a href="blog-left-sidebar.html"> blog </a></li>
                                                <li><a href="#">pages </a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <p>Copyright <i className="fa fa-copyright" /> 2018 <a href="javascript:void(0)"  target="_blank">Free Themes Cloud.</a> All rights reserved. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="footer-widget f-right">
                                <div className="footer-widget-r-content">
                                    <ul>
                                        <li><span>Phone :</span> +84978940546</li>
                                        <li><span>Email : </span> Binhnhph10080@gmail.com</li>
                                        <li><span>Address :</span> Cầu Giấy - Hà Nội</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;