import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase text-white">Accommodation</h5>
              <p className="text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati ad, alias voluptates nihil vel ducimus.
              </p>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase text-white">Important Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Customer Service
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Hotels
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase text-white">Social Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Facebook
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Twitter
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Instagram
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-white text-decoration-none">
                    Youtube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
