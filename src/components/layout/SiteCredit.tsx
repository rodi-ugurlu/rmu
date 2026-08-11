import './SiteCredit.css';

export default function SiteCredit() {
  return (
    <footer className="site-credit">
      <p className="site-credit-text">
        Copyright ©
        <a
          className="site-credit-link"
          href="https://redmuud.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redmuud
        </a>
      </p>
    </footer>
  );
}
