const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer>
        Created By{" "}
        <a href="https://codewithty.dev" className="creator">
          Tee2dWhy
        </a>{" "}
        {year}
      </footer>
    </>
  );
};

export default Footer;
