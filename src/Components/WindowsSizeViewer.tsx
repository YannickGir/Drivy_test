import { useEffect, useState } from "react";

const WindowSizeViewer = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 p-2 bg-gray-800 text-white">
      {windowSize.width} x {windowSize.height}
    </div>
  );
};

export default WindowSizeViewer;
