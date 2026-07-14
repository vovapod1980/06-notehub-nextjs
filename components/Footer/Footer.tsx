import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Volodymyr Podoliako</p>
          <p>
            Contact us:
            <a href="mailto:vpodol@gmail.com">vpodol@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
