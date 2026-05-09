import { useState, useEffect } from "react";
import "./app.css";

const WEDDING_CONFIG = {
  brideName: "Priyanka Tamhankar",
  groomName: "Shaunak Godbole",
  date: "Saturday, 5th December 2026",
  time: "7:00 PM Onwards",
  venue: "Symphony Banquet Hall",
  address: "Near Vijaynagar Society, Nityanand Marg, Andheri East, Mumbai, Maharashtra 400069",
  hostedBy: "Tamhankars & Godboles",
  coupleImageSrc: "/couple.png",
  ganeshImageSrc: "/ganesh.png",
};

const DIYAS = [
  { top: "7%",  left: "5%",  delay: "0s",   size: 22 },
  { top: "7%",  right: "5%", delay: "0.5s", size: 22 },
  { top: "28%", left: "2%",  delay: "0.9s", size: 16 },
  { top: "28%", right: "2%", delay: "1.3s", size: 16 },
  { top: "52%", left: "2%",  delay: "0.3s", size: 15 },
  { top: "52%", right: "2%", delay: "0.7s", size: 15 },
  { top: "75%", left: "4%",  delay: "1.1s", size: 18 },
  { top: "75%", right: "4%", delay: "1.5s", size: 18 },
];

const PETALS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 5.2) % 100}%`,
  delay: `${(i * 0.65).toFixed(1)}s`,
  duration: `${4.5 + (i % 4)}s`,
  size: 8 + (i % 6),
  color: i % 3 === 0 ? "#e8593c" : i % 3 === 1 ? "#d4af37" : "#e07b9c",
}));

function App() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function tick() {
      const target = new Date("2026-12-05T19:00:00");
      const diff = target - new Date();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-bg">
      <div className="petals-container" aria-hidden="true">
        {PETALS.map((p, i) => (
          <div key={i} className="petal" style={{
            left: p.left, animationDelay: p.delay,
            animationDuration: p.duration, width: p.size,
            height: p.size, background: p.color,
          }} />
        ))}
      </div>

      <div className={`card ${visible ? "card--visible" : ""}`}>

        {/* Kalamkari top band */}
        <div className="kalamkari-band top-band">
          <div className="kalamkari-inner">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="kalam-motif">❋</span>
            ))}
          </div>
        </div>

        {/* Floating diyas */}
        {DIYAS.map((d, i) => (
          <div key={i} className="diya" aria-hidden="true"
            style={{ top: d.top, left: d.left, right: d.right,
              animationDelay: d.delay, fontSize: d.size }}>
            🪔
          </div>
        ))}

        {/* Mandala watermark */}
        <div className="mandala-bg" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="mandala-svg">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 100 100)`}>
                <ellipse cx="100" cy="52" rx="4" ry="15" fill="none" stroke="#b8860b" strokeWidth="0.7" opacity="0.5"/>
                <circle cx="100" cy="36" r="3" fill="none" stroke="#b8860b" strokeWidth="0.6" opacity="0.4"/>
              </g>
            ))}
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 100 100)`}>
                <ellipse cx="100" cy="66" rx="2.5" ry="10" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4"/>
              </g>
            ))}
            <circle cx="100" cy="100" r="20" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.5"/>
            <circle cx="100" cy="100" r="30" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.35"/>
            <circle cx="100" cy="100" r="42" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.25"/>
            <circle cx="100" cy="100" r="8" fill="none" stroke="#b8860b" strokeWidth="1.2" opacity="0.6"/>
          </svg>
        </div>

        {/* Om header */}
        <div className="om-header">
          <span className="om-sym">ॐ</span>
          <div className="om-center">
            <span className="om-devanagari">॥ श्री गणेशाय नमः ॥</span>
          </div>
          <span className="om-sym">ॐ</span>
        </div>

        {/* Gold rule */}
        <GoldRule />

        {/* Ganesh */}
        <div className="ganesh-wrap">
          <img src={WEDDING_CONFIG.ganeshImageSrc} alt="Shree Ganesh"
            className="ganesh-img"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
          <div className="ganesh-emoji" style={{ display: "none" }}>🙏</div>
        </div>

        {/* Invite verse */}
        <div className="invite-verse">
          <p>With the blessings of <span className="deity-span">Lord Ganesha &amp; Goddess Lakshmi</span></p>
          <p>we joyfully invite you to grace the auspicious</p>
          <p>wedding ceremony of our beloved</p>
        </div>

        {/* Names hero */}
        <div className="names-hero">
          <div className="name-col">
            <p className="name-role">Bride</p>
            <h1 className="name-big bride-color">{WEDDING_CONFIG.brideName}</h1>
            <p className="name-family">D/o Tamhankar Family</p>
          </div>

          <div className="names-center">
            <svg viewBox="0 0 70 70" className="ring-svg">
              <circle cx="35" cy="35" r="32" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
              <circle cx="35" cy="35" r="24" fill="none" stroke="#b8860b" strokeWidth="0.8"/>
              <text x="35" y="41" textAnchor="middle" fontSize="18" fill="#b8860b">💍</text>
            </svg>
            <p className="vivaah-word">विवाह</p>
            <p className="with-eng">with</p>
          </div>

          <div className="name-col">
            <p className="name-role">Groom</p>
            <h1 className="name-big groom-color">{WEDDING_CONFIG.groomName}</h1>
            <p className="name-family">S/o Godbole Family</p>
          </div>
        </div>

        <GoldRule />

        {/* Couple image with marigold garland */}
        <div className="couple-frame-outer">
          <div className="garland garland-top">🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸</div>
          <div className="couple-frame">
            <img src={WEDDING_CONFIG.coupleImageSrc} alt="Couple" className="couple-img"
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            <div className="couple-placeholder">
              <span style={{ fontSize: 52 }}>👰🤵</span>
              <p>Add photo at<br /><code>public/couple.png</code></p>
            </div>
          </div>
          <div className="garland garland-bottom">🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼</div>
        </div>

        {/* Detail cards */}
        <div className="event-cards">
          <div className="event-card">
            <span className="event-icon">📅</span>
            <p className="event-label">Date</p>
            <p className="event-val">{WEDDING_CONFIG.date}</p>
          </div>
          <div className="event-card">
            <span className="event-icon">🕯️</span>
            <p className="event-label">Time</p>
            <p className="event-val">{WEDDING_CONFIG.time}</p>
          </div>
          <div className="event-card full">
            <span className="event-icon">🏛️</span>
            <p className="event-label">Venue</p>
            <p className="event-val venue-bold">{WEDDING_CONFIG.venue}</p>
            <p className="event-addr">{WEDDING_CONFIG.address}</p>
            <a className="maps-btn"
              href={`https://maps.google.com/?q=${encodeURIComponent(WEDDING_CONFIG.venue + " " + WEDDING_CONFIG.address)}`}
              target="_blank" rel="noreferrer">
              📍 Open in Google Maps
            </a>
          </div>
        </div>

        {/* Countdown */}
        <div className="countdown-section">
          <p className="countdown-heading">🎊 Counting down to the big day</p>
          <div className="countdown-row">
            {[["Days", countdown.days], ["Hours", countdown.hours], ["Mins", countdown.mins]].map(([label, val], i) => (
              <div key={i} className="count-block">
                <span className="count-num">{val}</span>
                <span className="count-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warm regards */}
        <div className="warm-regards">
          <GoldRule />
          <p className="regards-line">With warm regards &amp; heartfelt blessings from</p>
          <p className="regards-name">{WEDDING_CONFIG.hostedBy}</p>
          <p className="regards-footer">🙏 We look forward to your presence 🙏</p>
        </div>

        {/* Bottom kalamkari */}
        <div className="kalamkari-band bottom-band">
          <div className="kalamkari-inner">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="kalam-motif">❋</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function GoldRule() {
  return (
    <div className="gold-rule">
      <div className="gr-line" />
      <div className="gr-diamond" />
      <div className="gr-line" />
    </div>
  );
}

export default App;