const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer>
        Created By
        <a href="https://codewithty.dev" className="creator">
          Tee2dWhy
        </a>
        {year}
        <p className="note">A minimalistic DEX.</p>
      </footer>
    </>
  );
};

export default Footer;
