import { useEffect, useState } from 'react'; // we need this to make JSX compile
import './WelcomeComponent.css'

type CardProps = {
  title: string,
  paragraph: string
}

function WelcomeComponent() {
  const [showElement, setShowElement] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowElement(true);
    }, 2000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(delay);
  }, []); 
  
  
  return (
  <div className='welcome-div'>
    <h2 className='welcome-text'>News Renderer</h2>
    <p className='welcome-text'>Upload a file to begin</p>
     {/* Reserve space for the delayed element */}
    {showElement || <div style={{ height: '78px' }}></div>}
    {/* Render the buttons after a 2s delay */}
    {showElement && <div className='load-buttons'>
      <label htmlFor="file-upload" className="custom-file-upload welcome-text">
        Select .json file
      </label>
      <label htmlFor="load-example" className="custom-file-upload welcome-text">
        Load example
      </label>
    </div>}
    <input id="file-upload" type="file"/>
    <button id="load-example"/>
  </div>
  );
}

export default WelcomeComponent;