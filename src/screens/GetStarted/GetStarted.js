import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Getstarted = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

  return (
    <div className='authinfo_slider text-center'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <h2>Discover the Power of <br></br> Personality-Based Hiring</h2>
        <p>Unlock the potential of your workforce with LYWO’s easy-to-use, yet highly effective & scientific personality-based hiring. Find candidates that truly enjoy the work and thereby ensure a productive workplace.</p>
      </Carousel.Item>
      <Carousel.Item>
        <h2>Eliminate Guesswork and <br></br> Embrace Precision</h2>
        <p>Our transparent and structured hiring process ensures crystal-clear, informed decisions, putting everything in your control. Experience truly customized hiring with LYWO’s dual analysis of roles and candidates creating perfect professional matches.</p>
      </Carousel.Item>
      <Carousel.Item>
        <h2>Streamline Hiring with <br></br> Behavioral Insights</h2>
        <p>LYWO’s advanced tools help you swiftly identify the best candidates and streamline your hiring process. With LYWO, you can quickly sort through thousands of applications and make the most informed decisions faster.</p>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default Getstarted;