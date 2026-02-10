import React, { useState } from "react";
import "./Footer.css";
import ChatBot from "../components/ChatBot";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-grid">

          <div>
            <h4>MyShop</h4>
            <p>Download</p>
            <p>Pricing</p>
            <p>Web App</p>
            <p>Integrations</p>
          </div>

          <div>
            <h4>Product</h4>
            <p>Design review</p>
            <p>Enterprise</p>
            <p>Cloud API</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Security</p>
          </div>

          <div>
            <h4>Support</h4>
            <p onClick={() => setShowChat(true)} className="footer-link">
              Help Center
            </p>
            <p onClick={() => setShowChat(true)} className="footer-link">
              Report Bug
            </p>
            <p onClick={() => setShowChat(true)} className="footer-link">
              Contact
            </p>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </footer>

      {/* CHATBOT */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </>
  );
}

export default Footer;
