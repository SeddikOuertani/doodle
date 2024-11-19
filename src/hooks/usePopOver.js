import { useEffect, useRef, useState } from "react";

const usePopOver = () => {
  const popOverRef = useRef(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popOverRef.current && !popOverRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show]);

  return { popOverRef, show, setShow };
};

export default usePopOver