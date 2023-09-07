import "./Footer.css";
import github from "../../assets/images/github.png";
import linkedin from "../../assets/images/linkedin.png";

function Footer() {
  return (
    <div className="footer-container">
      <div className="authors">
        <div className="author-container">
          <h3>Justin Aitken</h3>
		  <div className="socials-container">
		  	<a href="https://github.com/Cuponk" target="_blank">
				<img src={github} className="social-links"/>
			</a>
		  	<a href="https://www.linkedin.com/in/justin-aitken-bb9272212/" target="_blank">
				<img src={linkedin} className="social-links"/>
			</a>
		  </div>
        </div>
        <div className="author-container">
          <h3>Weyman Leung</h3>
		  <div className="socials-container">
		  <a href="https://github.com/wleung4" target="_blank">
				<img src={github} className="social-links"/>
			</a>
		  	<a href="https://www.linkedin.com/in/weyman-leung/" target="_blank">
				<img src={linkedin} className="social-links"/>
			</a>
		  </div>
        </div>
        <div className="author-container">
          <h3>Julio Uribe</h3>
		  <div className="socials-container">
		  	<a href="https://github.com/juliouribe" target="_blank">
				<img src={github} className="social-links"/>
			</a>
		  	<a href="https://www.linkedin.com/in/julio-uribe-a15736b5/" target="_blank">
				<img src={linkedin} className="social-links"/>
			</a>
		  </div>
        </div>
      </div>
      <p className="copy-right">Copyright &copy;  2023 Well Played &reg;</p>
    </div>
  )
}

export default Footer;
