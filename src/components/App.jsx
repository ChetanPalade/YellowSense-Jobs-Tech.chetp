// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './jobs';
import Bookmarks from './Bookmarks';
import JobDetails from './JobDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>

        <div style={styles.navBar}>
          <Link to="/" style={styles.link}>Jobs</Link>
          <Link to="/bookmarks" style={styles.link}>Bookmarks</Link>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#CCCCFF',
    padding: '10px 0',
  },
  link: {
    backgroundColor: '#800080',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default App;
