import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        if (response.data && response.data.results && response.data.results.length > 0) {
          setJob(response.data.results[0]);  
        } else {
          throw new Error('Job details not found');
        }
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);


  // useEffect (()=> {
  //   if (jobData && jobData.jobs){
  //     const id = jobData.jobs[0].main
  //   }
  // })
 
  if (loading) return <p style={{textAlign:"center0",fontSize:"bold"}}>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  if (!job) {
    return <p>No job details available</p>;
  }

  const {
    title = 'No Title Available',
    company_name = 'No Company Name Available',
    job_location_slug = 'No Job Location Available',
    whatsapp_no = 'No WhatsApp Number Available',
  } = job;


  return (
    <div style={styles.container}>
      <h1 className=' flex items-center text-20px font-bold justify-content-center'>Job Detail</h1>
           <h2>{title}</h2>
              <p><strong>Company:</strong> {company_name}</p>
              <p><strong>Job Location:</strong> {job_location_slug}</p>
              <p><strong>Salary:</strong> {job.primary_details.Salary}</p>
              <p><strong>Phone Number:</strong> {whatsapp_no}</p>
        <div>
            {/* Dynamically render the job properties */}
            {Object.entries(job).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value || 'Not Available'}
              </p>
            ))}
          </div>              
              <p><strong>Phone:</strong> 
                {whatsapp_no ? (
                  <a href={`https://wa.me/${whatsapp_no}`}>{whatsapp_no}</a>
                ) : (
                  'No WhatsApp Number Available'
                )}
              </p>
            
          </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    border: '2px solid #ddd',
    margin: '30px ',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#C0C0C0',
  },
};

export default JobDetails;
