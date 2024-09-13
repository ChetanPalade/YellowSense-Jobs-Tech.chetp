# YellowSense Techonologies Jobs Application
 # -> Contents: 
                1. Video Demo
                2. Live Deployment Link
                3. Screenshots
                4. Explaination(project description)
                5. Project Directory Steps
                

 
# 1. video Demo:1. [https://www.loom.com/share/33216131f35d49afadd81b9fdc041b60?sid=de18ee0b-dca5-4bb2-b06d-60d4f9499bb1]
            2. [https://drive.google.com/file/d/16EezPCaU4J5aN3KiON8ZYh0xvtf8ERmP/view]
            
# 2. Deployment Link: [ https://yellowsense-jobs-tech-chetp199.onrender.com/]

# 3. Screenshots: 

![Screenshot (1255)](https://github.com/user-attachments/assets/c21f0da3-fa55-4ae4-b3f3-f4c60466c261)

![Screenshot (1254)](https://github.com/user-attachments/assets/1457b40c-682d-4e6f-a834-52b51b8937bc)

![Screenshot (1256)](https://github.com/user-attachments/assets/09145ba0-8133-42f7-8f49-2f2aa5255b36)

![Screenshot (1261)](https://github.com/user-attachments/assets/368f6502-50ba-48b2-b682-e6bdb71ad9d7)

![Screenshot (1264)](https://github.com/user-attachments/assets/0c1e58b1-a504-4921-914f-3e096f0f75fc)

![Screenshot (1265)](https://github.com/user-attachments/assets/2987ee10-460a-4520-8c95-7b2fc5e64965)

![Screenshot (1267)](https://github.com/user-attachments/assets/6ed7335e-9a33-4e47-86fd-011e7cc597bc)
![Screenshot (1271)](https://github.com/user-attachments/assets/380bbb2a-0b91-40c7-ad79-ed05a572ea23)
![Screenshot (1270)](https://github.com/user-attachments/assets/206c6a21-2ee2-4bfb-adcd-71c6e9cb21f9)
![Screenshot (1276)](https://github.com/user-attachments/assets/e4e704b4-0e33-4aea-bad6-b1a0594c18e0)
![Screenshot (1275)](https://github.com/user-attachments/assets/95c95aab-87bb-4b84-9e71-076dd9fb8891)
![Screenshot (1274)](https://github.com/user-attachments/assets/9ee04501-7f2d-4096-88ab-8792163a9c58)
![Screenshot (1277)](https://github.com/user-attachments/assets/b3f93b1b-eec8-48b2-9099-90a73d7b9646)

![Screenshot (1278)](https://github.com/user-attachments/assets/5c646f10-0391-4588-a105-a6c359d53914)
![Screenshot (1266)](https://github.com/user-attachments/assets/9dda982d-1400-4b38-9994-b2727b56daf9)

# 4. Explaination:
Here’s a brief explanation of each part of the code for adding pagination and fetching job details:

# 1. State Management for Pagination and Jobs:
jobs: Stores the list of jobs fetched from the API.
loading: Indicates whether the data is currently being fetched.
error: Stores any error messages if the API call fails.
currentPage: Tracks the current page the user is on.
totalPages: Tracks the total number of pages available from the API (assuming the API provides this information).

# 2. Fetching Jobs Based on the Current Page:
Inside the useEffect hook, the fetchJobs function is called every time the currentPage changes.
API Call (axios.get): The API endpoint is dynamically adjusted with ?page=${currentPage} to fetch jobs for the current page.
Set Jobs and Total Pages: Once the data is received, the jobs are stored in the jobs state, and the total pages are set in totalPages (if provided by the API).

# 3. Pagination Controls:
Two buttons, "Previous" and "Next", are provided for navigating between pages.
handleNextPage: Increments currentPage if the user clicks the "Next" button and they aren’t on the last page.
handlePreviousPage: Decrements currentPage if the user clicks the "Previous" button and they aren’t on the first page.
The buttons are disabled if the user is on the first or last page to prevent invalid navigation.

# 4. Displaying Jobs and Details Link:
For each job, basic information like the job title, company name, and city location is displayed.
Each job has a "View Details" button that links to the specific job’s details page using the Link component from react-router-dom. This directs the user to a route like /jobs/:id, where the JobDetails component will display full job details.

# 5. API Integration:
The API call for jobs uses axios to fetch data from https://testapi.getlokalapp.com/common/jobs, and the page parameter is passed to the API to handle pagination.
This allows you to load a specific set of jobs per page and display them, while still fetching more when you navigate to the next page.

# 6. Conditional Rendering:
Loading State: If loading is true, the message "Loading jobs..." is shown while the data is being fetched.
Error Handling: If there’s an error in fetching data, the error message is displayed.
Jobs Display: Once jobs are fetched, they are displayed using the map function to list each job.

# Summary of Key Concepts:
 -> Pagination: Handles breaking down large sets of job listings into smaller, more manageable pages and lets users navigate between them.
 -> API Integration: Fetches data from a paginated API using axios.
 -> State Management: Keeps track of which page the user is on, whether data is being loaded, and handles potential errors.
 -> Routing: Uses react-router-dom to navigate between a list of jobs and individual job details pages.

This approach is essential for large datasets, ensuring the UI remains responsive and user-friendly.

# 5.
## Available Scripts

In the project directory, you can run:

- npx create-react-app ystech-jobs-app-frontend
- cd ystech-jobs-app-frontend
- git clone : https://github.com/ChetanPalade/YellowSense-Jobs-Tech.chetp.git
- npm start

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

