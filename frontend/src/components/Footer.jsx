import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/logo.png";

const T = {
  heading:     { fontSize: 13, fontWeight: 700, color: "#17B6A8", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 18px" },
  link:        { fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.72)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: 1 },
  contactText: { fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 },
};

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap');

      @keyframes footerGoldenShimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      .footer-logo-shimmer {
        background: linear-gradient(105deg, #0d9488 0%, #14b8a6 20%, #2dd4bf 35%, #99f6e4 50%, #2dd4bf 65%, #14b8a6 80%, #0d9488 100%);
        background-size: 200% auto;
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: footerTealShimmer 3.5s linear infinite;
      }
      .f-link:hover { color: #14b8a6 !important; }
      .f-social:hover {
        background: #14b8a6 !important;
        color: #fff !important;
        border-color: #14b8a6 !important;
        box-shadow: 0 4px 16px rgba(20,184,166,0.35) !important;
        transform: translateY(-2px);
      }
      .f-bottom-link:hover { color: #17B6A8 !important; }

      /* ── Footer padding ── */
      .footer-root {
        padding: 60px 40px 32px;
      }
      @media (max-width: 768px)  { .footer-root { padding: 48px 24px 28px; } }
      @media (max-width: 480px)  { .footer-root { padding: 40px 16px 24px; } }

      /* ── Main grid ── */
      .footer-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr 1.1fr;
        gap: 48px;
        margin-bottom: 52px;
        align-items: start;
      }
      @media (max-width: 1024px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          margin-bottom: 40px;
        }
      }
      @media (max-width: 560px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 28px 20px;
          margin-bottom: 32px;
        }
      }
      @media (max-width: 400px) {
        .footer-grid {
          grid-template-columns: 1fr;
          gap: 28px;
        }
      }

      /* Brand col — full width on tablet ── */
      .footer-brand-col {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }
      @media (max-width: 1024px) {
        .footer-brand-col {
          grid-column: 1 / -1;
        }
      }

      /* ── Social icons — wrap if needed ── */
      .footer-socials {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      /* ── Bottom bar ── */
      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
      }
      .footer-bottom-links {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }
      @media (max-width: 560px) {
        .footer-bottom {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
      }

      /* ── Copyright text ── */
      .footer-copy {
        font-size: 14px;
        color: rgba(255,255,255,0.35);
      }

      /* ── Logo font size ── */
      .footer-logo-text {
        font-family: 'Cinzel', serif;
        font-weight: 900;
        color: #fff;
        letter-spacing: 0.06em;
        white-space: nowrap;
        text-shadow: 0 2px 20px rgba(0,0,0,0.6);
        font-size: clamp(15px, 2vw, 20px);
      }
    `}</style>

    <footer className="footer-root" style={{
      background: "linear-gradient(160deg, #081628 0%, #0a1e38 40%, #0b2242 65%, #091830 100%)",
      borderTop: "1px solid rgba(23,182,168,0.15)",
      fontFamily: "system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* BG effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: -100, left: -100, width: 480, height: 480, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 360, height: 360, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Brand — spans full width on tablet */}
          <div className="footer-brand-col">
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginTop: -4 }}>
              <img src={logo} alt="SkillVoyager Logo" style={{ width: 46, height: 46, objectFit: "contain", marginRight: -6, flexShrink: 0 }} />
              <span className="footer-logo-text">
                <span style={{ color: "#fff" }}>〈</span>
                Skill<span className="footer-logo-shimmer">Voyager</span>
                <span style={{ color: "#14b8a6", opacity: 0.7 }}>〉</span>
                <span style={{ color: "#14b8a6", fontSize: "0.65em", fontWeight: 700, marginLeft: 1, verticalAlign: "middle", opacity: 0.9 }}>.AI</span>
              </span>
            </Link>

            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0, maxWidth: 360 }}>
              Empowering learners with AI-driven personalized roadmaps, career
              alignment, and adaptive learning experiences.
            </p>

            <div className="footer-socials">
              {[FaFacebook, FaXTwitter, FaLinkedin, FaGithub, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="f-social" style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: "rgba(20,184,166,0.08)",
                  border: "1px solid rgba(20,184,166,0.20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.72)",
                  transition: "all 0.25s ease", textDecoration: "none", flexShrink: 0,
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 style={T.heading}>Explore</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
              <li><Link to="/about"            className="f-link" style={T.link}>About Us</Link></li>
              <li><Link to="/quiz/generate"    className="f-link" style={T.link}>AI Navigator</Link></li>
              <li><Link to="/roadmap/generate" className="f-link" style={T.link}>Dynamic Roadmaps</Link></li>
              <li><Link to="/courses"          className="f-link" style={T.link}>Trending Skills</Link></li>
              <li><Link to="/leaderboard"      className="f-link" style={T.link}>Leaderboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={T.heading}>Support</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
              <li><Link to="/help-center"       className="f-link" style={T.link}>Help Center</Link></li>
              <li><Link to="/privacy-policy"    className="f-link" style={T.link}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service"  className="f-link" style={T.link}>Terms of Service</Link></li>
              <li><Link to="/contact"           className="f-link" style={T.link}>Contact Support</Link></li>
              <li><a    href="/#faq"            className="f-link" style={T.link}>FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={T.heading}>Get in Touch</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <MapPin style={{ width: 17, height: 17, color: "#17B6A8", marginTop: 3, flexShrink: 0 }} />
                <span style={T.contactText}>123 AI Street, Digital Ocean,<br />Innovation City, IC 56789</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail style={{ width: 17, height: 17, color: "#17B6A8", flexShrink: 0 }} />
                <span style={{ ...T.contactText, wordBreak: "break-all" }}>support@skillvoyager.ai</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Phone style={{ width: 17, height: 17, color: "#17B6A8", flexShrink: 0 }} />
                <span style={T.contactText}>+1 (234) 567-890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(23,182,168,0.30), rgba(245,200,66,0.20), rgba(23,182,168,0.30), transparent)", marginBottom: 22 }} />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} SkillVoyager.AI — All rights reserved.
          </span>
          <div className="footer-bottom-links">
            {[
              { label: "Privacy",  to: "/privacy-policy" },
              { label: "Terms",    to: "/terms-of-service" },
              { label: "Cookies",  to: "/cookies" },
            ].map(item => (
              <Link key={item.label} to={item.to} className="f-bottom-link"
                style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  </>
);

export default Footer;