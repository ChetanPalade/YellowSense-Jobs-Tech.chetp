
import React, { useState, useEffect } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <div style={styles.container}>
      {bookmarks.length === 0 ? (
        <p>No jobs bookmarked yet.</p>
      ) : (
        bookmarks.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <h1 className=' flex items-center text-20px font-bold justify-content-center'>MY BOOKMARKS</h1>
            <h2>{job.title}</h2>
            <p><strong>Job Location:</strong> {job.job_location_slug}</p>
              <p><strong>Salary:</strong> {job.primary_details.Salary}</p>
              <p><strong>Phone Number:</strong> {job.whatsapp_no}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '70px', // To avoid overlapping with bottom nav
    backgroundColor: '#00FFFF',
  },
  jobCard: {
    border: '1px solid #ddd',
    padding: '30px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#008080',
  },
};

export default Bookmarks;
