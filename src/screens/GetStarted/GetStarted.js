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
        <h2>Revolutionize<br></br> Your Hiring Process with<br></br> Behavioral Insights</h2>
        <p>Transform hiring with LYWO's AI-powered personality assessments, guaranteeing the perfect fit for every role.</p>
      </Carousel.Item>
      <Carousel.Item>
        <h2>Revolutionize<br></br> Your Hiring Process with<br></br> Behavioral Insights</h2>
        <p>Transform hiring with LYWO's AI-powered personality assessments, guaranteeing the perfect fit for every role.</p>
      </Carousel.Item>
      <Carousel.Item>
        <h2>Revolutionize<br></br> Your Hiring Process with<br></br> Behavioral Insights</h2>
        <p>Transform hiring with LYWO's AI-powered personality assessments, guaranteeing the perfect fit for every role.</p>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default Getstarted;
