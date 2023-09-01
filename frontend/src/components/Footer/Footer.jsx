import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="authors">
        <div className="author-container">
          <h3>Justin Aitken</h3>
          <p>Github</p>
          <p>LinkedIn</p>
        </div>
        <div className="author-container">
          <h3>Weyman Leung</h3>
          <p>Github</p>
          <p>LinkedIn</p>
        </div>
        <div className="author-container">
          <h3>Julio Uribe</h3>
          <p>Github</p>
          <p>LinkedIn</p>
        </div>
      </div>
      <p className="copy-right">Copyright &copy;  2023 Well Played &reg;</p>
    </div>
  )
}

export default Footer;
