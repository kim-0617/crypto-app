import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space, Typography } from "antd";

function App() {
  const [navBarWidth, setNavBarWidth] = useState<number>(0);
  const navBarRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (navBarRef.current?.clientWidth)
      setNavBarWidth(navBarRef.current?.clientWidth);
  }, []);

  useEffect(() => {
    if (navBarRef.current?.clientWidth)
      setNavBarWidth(navBarRef.current?.clientWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="app">
      <div className="navbar" ref={navBarRef}>
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div
          className="footer"
          style={{
            width:
              window.innerWidth > 800
                ? `calc(100% - ${navBarWidth}px )`
                : "100%",
          }}
        >
          <Typography.Title
            level={5}
            style={{ color: "#fff", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
