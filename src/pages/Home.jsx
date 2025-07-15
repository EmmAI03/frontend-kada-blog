import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Tooltip,
  FloatButton,
  Layout,
  Menu,
  Space,
  Flex,
} from 'antd';
import {
  SearchOutlined,
  CustomerServiceOutlined,
  PauseOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const menuItems = [
  { key: '1', label: <Link to="/">Home</Link> },
  { key: '2', label: <Link to="/posts">Login</Link> },
  { key: '3', label: <a href="#about">About</a> },
];

function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden', backgroundColor: '#001F3F' }}>
      {/* HEADER */}
      <Header
        style={{
          backgroundColor: '#001F3F',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Emmy Rahmania
          </Link>
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{
            backgroundColor: '#001F3F',
            flex: 1,
            justifyContent: 'center',
            borderBottom: 'none',
          }}
        />
      </Header>

      {/* MAIN CONTENT */}
      <Content
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #001F3F, #002f6c)',
          padding: '80px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          color: 'white',
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 600 }}>
          <Title style={{ color: 'white', fontSize: 48, fontWeight: 700 }}>
            Belajar Frontend dan Backend
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#dbe9ff' }}>
            Pororo is a little penguin that marks him as the titular character
            of the cast of friends and is the leader of the group. As remarked
            by the narrator, he is shown to be curious.
          </Paragraph>

          <div style={{ marginTop: 32 }}>
            <Flex gap="middle" wrap justify="start">
              <Tooltip title="Search">
                <Button
                  type="default"
                  shape="circle"
                  icon={<SearchOutlined />}
                  size="large"
                />
              </Tooltip>

              <Link to="/posts">
                <Button size="large" type="primary">
                  Login
                </Button>
              </Link>
            </Flex>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div style={{ flex: 1, textAlign: 'center', minWidth: 300 }}>
          <img
            src="/images/pororo_image-removebg-preview.png"
            alt="Pororo & Friends"
            style={{
              width: '100%',
              maxWidth: 500,
              borderRadius: 16,
              marginTop: 32,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* AUDIO PLAYER */}
        <audio
          ref={audioRef}
          src="/audio/musik-latar.mp3"
          loop
          preload="auto"
        />
        <Tooltip title={playing ? 'Pause Music' : 'Play Music'}>
          <FloatButton
            shape="circle"
            type="primary"
            onClick={handlePlayMusic}
            icon={playing ? <PauseOutlined /> : <CustomerServiceOutlined />}
            style={{ right: 24, bottom: 24 }}
          />
        </Tooltip>
      </Content>

      {/* FOOTER */}
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#001F3F',
          color: '#fff',
          padding: '40px 20px',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Space direction="vertical" size="middle">
            <div>
              <Title level={4} style={{ color: 'white' }}>
                Contact Us
              </Title>
              <p>Email: emmyrahmania@gmail.com | Phone: +62 878-7063-7183</p>
            </div>

            <div>
              <p>
                Address: Jl. Veteran Malang, Kec. Klojen, Kota Malang, Jawa
                Timur 65145, Indonesia.
              </p>
            </div>

            <div>
              <iframe
                title="Lokasi Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.030174839728!2d112.61138861432896!3d-7.953949894279996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1625670187641!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <p style={{ marginTop: 20 }}>
              © 2025 Made with ❤️ by Emmy Rahmania. All Rights Reserved.
            </p>
          </Space>
        </div>
      </Footer>
    </Layout>
  );
}

export default Home;
