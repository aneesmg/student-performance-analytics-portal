import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {year} Codoria — Student Performance Analytics Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
