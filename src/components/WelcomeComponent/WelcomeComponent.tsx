import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./WelcomeComponent.css";
import JsonRenderer from "../JsonRenderer/JsonRenderer";

function WelcomeComponent(props: any) {
  const [showElement, setShowElement] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedFile(result);
      };
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowElement(true);
    }, 2000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(delay);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {selectedFile === null && (
        <div>
          <a className="theme-toggle custom-button" onClick={props.toggleTheme}>
            Toggle Dark Mode
          </a>
          <div className="welcome-div">
            <h1 className="welcome-text">News Renderer</h1>
            <h4 className="welcome-text">Upload a file to begin</h4>
            {/* Reserve space for the delayed element */}
            {showElement || <div style={{ height: "78px" }}></div>}
            {/* Render the buttons after a 2s delay */}
            {showElement && (
              <div className="load-buttons">
                <label
                  htmlFor="file-upload"
                  className="custom-button welcome-text"
                >
                  Select .json file
                </label>
                <label
                  htmlFor="load-example"
                  className="custom-button welcome-text"
                >
                  Load example
                </label>
              </div>
            )}
            <input id="file-upload" type="file" onChange={handleFileChange} />
            <Link to="/example">
              <button id="load-example" />
            </Link>
          </div>
        </div>
      )}
      {selectedFile !== null && (
        <JsonRenderer
          toggleTheme={props.toggleTheme}
          theme={props.theme}
          fileContents={selectedFile}
        />
      )}
    </motion.div>
  );
}

export default WelcomeComponent;
