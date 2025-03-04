// src/hooks/UseViewHeight.jsx
import { useEffect, useState } from "react";

const UseViewHeight = () => {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewHeight;
};
export default UseViewHeight;
// Usage in App.js
// const viewHeight = UseViewHeight();
// <div className="App" style={{ height: viewHeight }}>
//   ...
// </div>
