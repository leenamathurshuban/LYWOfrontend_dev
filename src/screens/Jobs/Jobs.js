import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Col, Container, Row,Card,Button, Spinner } from "react-bootstrap";
import { JobList } from "../../services/provider";
import JobsList from "./JobList";

const Jobs = () => {
const [jobData,setJobData] = useState([])
const [isLoading, setIsLoading] = useState(false);


const JobListApi = async() =>{
  setIsLoading(true);
  const url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=10`

  try {
    const response = await JobList(url)
    setIsLoading(false);
    setJobData(response?.data?.response)
    // console.log("resposne  job-----",JSON.stringify(response?.data?.response,null,4))
    
  } catch (error) {
    setIsLoading(false);
    console.log("resposne  error-----",error)
  }
}

useEffect(()=>{
  JobListApi()
},[])




  
  return (
    <>
      <Sidebar />
      <Header />
      {isLoading && (
          <div className="loader-overlay">
            <Spinner animation="border" role="status" className="ml-3" />
          </div>
        )}
      {jobData.length  !== 0 ?
     ( <JobsList/>)
       :
       (<div className="page-body">
       <Container fluid>
           <Row>
               <Col md={12} className="d-flex justify-content-between align-items-center"><h4 class="my-3 pagetitle">Jobs</h4><Button variant="primary" className="font-sm">Create Job</Button></Col>
           </Row>
           <Card className="mdt_card">
               <Card.Body className="py-5">
                 <span className="mdt_icon">
                   <svg
                     width="34"
                     height="34"
                     viewBox="0 0 34 34"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       fill-rule="evenodd"
                       clip-rule="evenodd"
                       d="M17.2293 0.333087C18.555 0.332369 19.5394 0.331836 20.3922 0.56033C22.6928 1.17678 24.4898 2.97376 25.1062 5.27437C25.2553 5.83088 25.3069 6.44347 25.3245 7.17038C25.8392 7.24227 26.3106 7.34438 26.7569 7.48938C29.8013 8.47856 32.1881 10.8654 33.1773 13.9098C33.4085 14.6213 33.5307 15.3968 33.5951 16.309C33.1455 19.3627 30.64 21.7344 27.5231 21.9797C27.2784 21.9989 26.9722 22.0002 26.1667 22.0002H18.6665V21.6674C18.6665 20.7469 17.9203 20.0007 16.9998 20.0007C16.0794 20.0007 15.3332 20.7469 15.3332 21.6674V22.0002H7.83337C7.02784 22.0002 6.72165 21.9989 6.47698 21.9797C3.36026 21.7344 0.854861 19.3629 0.405015 16.3095C0.469485 15.3971 0.591649 14.6214 0.82286 13.9098C1.81204 10.8654 4.19888 8.47856 7.24325 7.48938C7.68951 7.34439 8.16096 7.24228 8.67554 7.17039C8.69318 6.44348 8.74475 5.83089 8.89387 5.27437C9.51032 2.97376 11.3073 1.17678 13.6079 0.56033C14.4607 0.331836 15.4451 0.332369 16.7707 0.333087H17.2293ZM12.0164 7.00185C12.1696 7.00103 12.3261 7.00054 12.4862 7.00024H21.514C21.674 7.00054 21.8305 7.00103 21.9837 7.00185C21.9684 6.57128 21.9396 6.3354 21.8865 6.13711C21.5782 4.9868 20.6797 4.08831 19.5294 3.78008C19.159 3.68082 18.6573 3.6665 17 3.6665C15.3428 3.6665 14.8411 3.68082 14.4706 3.78008C13.3203 4.08831 12.4218 4.9868 12.1136 6.13711C12.0605 6.3354 12.0317 6.57128 12.0164 7.00185Z"
                       fill="#6172F3"
                     />
                     <path
                       d="M15.3332 25.6674V25.3336L7.75031 25.3336C7.05594 25.3336 6.60816 25.3337 6.21545 25.3027C3.96527 25.1257 1.92752 24.2097 0.34375 22.7965C0.371266 24.4373 0.470257 25.6716 0.82286 26.7568C1.81204 29.8012 4.19888 32.188 7.24325 33.1772C8.7535 33.6679 10.5525 33.6674 13.3341 33.6667H20.666C23.4477 33.6674 25.2467 33.6679 26.7569 33.1772C29.8013 32.188 32.1881 29.8012 33.1773 26.7568C33.5299 25.6716 33.6289 24.4373 33.6564 22.7964C32.0726 24.2097 30.0349 25.1257 27.7846 25.3027C27.3919 25.3337 26.9441 25.3336 26.2498 25.3336L18.6665 25.3336V25.6674C18.6665 26.5879 17.9203 27.3341 16.9998 27.3341C16.0794 27.3341 15.3332 26.5879 15.3332 25.6674Z"
                       fill="#6172F3"
                     />
                   </svg>
                 </span>
                 <Card.Title>Start by creating your first job</Card.Title>
                 <a className="btn btn-primary" href="/jobsList">Create Job</a>
               </Card.Body>
             </Card>
       </Container>
     </div>)
    
      }
     
      
    </>
  );
};

export default Jobs;
