
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';

const Jobs = () => {
  const { id } = useParams();
  const [job, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openJobId, setOpenJobId] = useState(null); // Track which job details are open
  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  const jobsPerPage = 3; // Number of jobs per page


  // Fetch all job details at once
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}&limit=${jobsPerPage}`);
        if (response.data && response.data.results) {
          const jobsWithDetails = await Promise.all(
            response.data.results.map(async (job) => {
              // Fetch each job's detailed info by ID
              const detailsResponse = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${job.id}`);
              return { ...job, details: detailsResponse.data.results };
              
            })
           
          );
          setJobs(jobsWithDetails); // Store all jobs with their details
         
          const totalCount = response.data.totalCount || 10; // Use total count from the API if available
          setTotalPages(Math.ceil(totalCount / jobsPerPage)); // Calculate the total number of pages
        } else {
          setError('No jobs found');
        }
      } catch (err) {
        setError(`Failed to load jobs: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [page,id]);

  if (loading) return <p style={{textAlign:"center"}}>Loading jobs...</p>;
  
  if (error) return <p>{error}</p>;


  const bookmarkJob = (job) => {
    const updatedBookmarks = [...bookmarks, job];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    alert('Job bookmarked!');
  };

  const toggleDetails = (jobId) => {
    if (openJobId === jobId) {
      setOpenJobId(null); // Close details if already open
    } else {
      setOpenJobId(jobId); // Open details for the clicked job
    }
  };
 
  
  return (
    <div  style={styles.container}>
      <div style={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages} // Disable on the last page
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
      
        {job.map((job) => (
      <div key={job.id} style={styles.jobCard}>
        <h1 className=' flex items-center text-20px font-bold justify-content-center'>Jobs List</h1>
        <h2>{job.title}</h2>
           <p><strong>Company Name:</strong> {job.company_name}</p>
           <p><strong>Job Location:</strong> {job.job_location_slug}</p>
           <p><strong>Salary:</strong> 'Show In Details Section'</p>       {/*{job.primary_details.Salary"*/}
           <p><strong>Phone Number:</strong> {job.whatsapp_no}</p>
     
           
           <button  style={styles.toggleButton} onClick={() => toggleDetails(job.id)}>
            {openJobId === job.id ? 'Hide Details' : 'Show Details Here'}
          </button>
           
          <button onClick={() => bookmarkJob(job)} style={styles.bookmarkButton}>
            Bookmark
          </button>

          <Link to={`/jobs/${job.id}`} >
          <button style={styles.detailsButton}>View Details</button>
            </Link>
          
  
          {/* Display detailed job info conditionally */}
          {openJobId === job.id && job.details && (
             <div style={styles.container}>
             <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company_name  || 'No company Available'}</p>
                <p><strong>Job Location:</strong> {job.job_location_slug  || 'No Location Available'}</p>
                <p><strong>Salary:</strong> {job.primary_details.Salary || 'No Salary Details Available'}</p>    
                <p><strong>Phone:</strong> {job.whatsapp_no|| 'No number Available'}</p>

                         
              {Object.entries(job).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value || 'Not Available'}
              </p>
            ))}
              
            </div>
          )}
        </div>
      ))}
     {/* Pagination Controls */}
     <div style={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages} // Disable on the last page
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
     

      {loading && <p>Loading more jobs...</p>}
      {error && <p>Failed to load jobs. Please try again later.</p>}
    </div>
   
  );
};


const styles = {
  container: {
    padding: '10px',
    paddingBottom: '70px',
    background: "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  },
  jobCard: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#C0C0C0',
  },

  
  toggleButton: {
    backgroundColor: '#DE3163',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    margin:"20px",
    fontSize: "15px",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },

  bookmarkButton: {
    backgroundColor: '#DE3163',
    color: '#fff',
    padding: '10px',
    fontSize: "15px",
    border: 'none',
    margin:"20px",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  detailsButton:{
    display: 'flex',
    justifyContent: 'space-around',

  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
  },
  paginationButton: {
    padding: '10px 20px',
    backgroundColor: '#32CD32',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
export default Jobs;




// // src/components/Jobs.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);
  // const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  // const jobsPerPage = 4; // Number of jobs per page


  
//   useEffect(() => {
    
//       const fetchJobs = async () => {
//         try {
//           const response = await axios.get('https://testapi.getlokalapp.com/common/jobs');
//           if (response.data && response.data.results) {
//             const jobsWithDetails = await Promise.all(
//               response.data.results.map(async (job) => {
//                 // Fetch each job's detailed info by ID
//                 const detailsResponse = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${job.id}`);
//                 return { ...job, details: detailsResponse.data.results[0] };
//               })
//             );
//             setJobs(jobsWithDetails);
       
//           const totalCount = response.data.totalCount || 6; // Use total count from the API if available
//           setTotalPages(Math.ceil(totalCount / jobsPerPage)); // Calculate the total number of pages
//         } else {
//           throw new Error('Jobs not found');
//         }
//       } catch (err) {
//         setError(`Failed to load jobs: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []); // Re-fetch jobs when page changes

 
  // if (loading) return <p style={{textAlign:"center"}}>Loading jobs...</p>;
  
  // if (error) return <p>{error}</p>;


  // const bookmarkJob = (job) => {
  //   const updatedBookmarks = [...bookmarks, job];
  //   setBookmarks(updatedBookmarks);
  //   localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  //   alert('Job bookmarked!');
  // };


  
//   return (
//     <div style={styles.container}>
//       {jobs.map((job, index) => (
        // <div key={index} style={styles.jobCard}>
        //    <h2>{job.title}</h2>
        //       <p><strong>Company:</strong> {job.company_name}</p>
        //       <p><strong>Location:</strong> {job.job_location_slug}</p>
        //       <p><strong>Salary:</strong> You Can See in view details</p>
        //       <p><strong>Phone:</strong> {job.whatsapp_no}</p>
              
          //     {job.details && (<Link to={`/jobs/${job.id}`} >
          // <button style={styles.detailsButton}>View Details</button>

            
          // </Link>
// )}
          

        //   <button onClick={() => bookmarkJob(job)} style={styles.bookmarkButton}>
        //     Bookmark
        //   </button>
        // </div>
//       ))}

      
//       {/* Pagination Controls */}
//       <div style={styles.pagination}>
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 6}
//           style={styles.paginationButton}
//         >
//           Previous
//         </button>

//         <span>Page {page} of {totalPages}</span>

//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={page === totalPages} // Disable on the last page
//           style={styles.paginationButton}
//         >
//           Next
//         </button>
//       </div>

//       {loading && <p>Loading more jobs...</p>}
//       {error && <p>Failed to load jobs. Please try again later.</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '10px',
//     paddingBottom: '70px',
//     background: "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
//   },
//   jobCard: {
//     border: '1px solid #ddd',
//     padding: '10px',
//     margin: '20px 0',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#C0C0C0',
//   },

  
//   detailsButton: {
//     backgroundColor: '#DE3163',
//     color: '#fff',
//     padding: '10px',
//     border: 'none',
//     borderRadius: '5px',
//     textDecoration: 'none',
//     margin:"20px",
//     fontSize: "15px",
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },

//   bookmarkButton: {
//     backgroundColor: '#DE3163',
//     color: '#fff',
//     padding: '10px',
//     fontSize: "15px",
//     border: 'none',
//     margin:"20px",
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   pagination: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     margin: '20px 0',
//   },
//   paginationButton: {
//     padding: '10px 20px',
//     backgroundColor: '#32CD32',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

// export default Jobs;