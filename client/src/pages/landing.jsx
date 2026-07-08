import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Activity,
  Brain,
  Wallet,
  Bell,
  BarChart3,
  Globe,
} from "lucide-react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">

      {/* Navbar */}
      <header className="navbar">

        <div className="logo">
          📈 Trade<span>X</span>
        </div>

        <nav className="nav-links">
          <a href="#markets">Markets</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>

          <Link to="/login">Login</Link>

          <Link to="/register" className="signup">
            Get Started
          </Link>
        </nav>

      </header>

      {/* Hero */}
      <section className="hero">

        <div className="left">

          <span className="badge">
            🚀 AI Powered Investment Platform
          </span>

          <h1>
            Trade Smarter.
            <br />
            Invest Better.
          </h1>

          <p>
            Monitor live markets, build your portfolio,
            discover market opportunities and invest with confidence.
          </p>

          <div className="buttons">

            <Link to="/register" className="btn-primary">
              Start Trading
              <ArrowRight size={18}/>
            </Link>

            <Link to="/login" className="btn-secondary">
              Live Market
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <h2>50K+</h2>
              <p>Users</p>
            </div>

            <div>
              <h2>₹500Cr+</h2>
              <p>Trades</p>
            </div>

            <div>
              <h2>1500+</h2>
              <p>Stocks</p>
            </div>

          </div>

        </div>

        {/* Dashboard Preview */}

        <div className="right">

          <div className="summary-card">

            <div className="card-top">

              <div>
                <h3>Portfolio Value</h3>
                <small>Updated Now</small>
              </div>

              <Bell />

            </div>

            <h1>₹8,45,620</h1>

            <p className="green">
              ▲ +18.25%
            </p>

            <div className="graph">
              📈📈📈📈📈📈📈📈📈
            </div>

            <div className="stock-item">
              <span>Apple</span>
              <span className="green">+2.31%</span>
            </div>

            <div className="stock-item">
              <span>Microsoft</span>
              <span className="green">+1.42%</span>
            </div>

            <div className="stock-item">
              <span>NVIDIA</span>
              <span className="green">+4.60%</span>
            </div>

            <div className="stock-item">
              <span>Tesla</span>
              <span className="red">-0.62%</span>
            </div>

          </div>

        </div>

      </section>

      {/* Live Market Ticker */}

      <section id="markets" className="ticker">

        <div className="ticker-content">

          AAPL ▲2.31% •
          MSFT ▲1.42% •
          NVDA ▲4.60% •
          TSLA ▼0.62% •
          META ▲2.75% •
          AMZN ▲1.33% •
          BTC ▲5.12% •
          ETH ▲3.94% •
          NIFTY ▲0.85%

        </div>

      </section>

      {/* Market Cards */}

      <section className="market-grid">

        <div className="market-card">
          <TrendingUp size={40}/>
          <h3>NIFTY 50</h3>
          <h2>24,851</h2>
          <span className="green">+1.12%</span>
        </div>

        <div className="market-card">
          <Wallet size={40}/>
          <h3>Portfolio</h3>
          <h2>₹8.45L</h2>
          <span className="green">+18%</span>
        </div>

        <div className="market-card">
          <Globe size={40}/>
          <h3>Global</h3>
          <h2>Live</h2>
          <span>24/7</span>
        </div>

        <div className="market-card">
          <BarChart3 size={40}/>
          <h3>Analytics</h3>
          <h2>Advanced</h2>
          <span>AI Powered</span>
        </div>

      </section>

      {/* Features */}

      <section id="features" className="services">

        <div className="service-card">
          <TrendingUp size={45}/>
          <h3>Live Trading</h3>
          <p>Real-time stock monitoring.</p>
        </div>

        <div className="service-card">
          <Activity size={45}/>
          <h3>Analytics</h3>
          <p>Interactive charts and insights.</p>
        </div>

        <div className="service-card">
          <ShieldCheck size={45}/>
          <h3>Secure Platform</h3>
          <p>Protected authentication and data.</p>
        </div>

        <div className="service-card">
          <Brain size={45}/>
          <h3>AI Insights</h3>
          <p>Smarter investing with AI suggestions.</p>
        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>Ready to Build Your Portfolio?</h2>

        <p>
          Join thousands of investors using TradeX.
        </p>

        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>

      </section>

      {/* Footer */}

      <footer id="about" className="footer">

        <h2>📈 TradeX</h2>

        <p>
          Modern Stock Trading Platform
        </p>

        <small>
          © 2026 TradeX. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}