import React, { useEffect, useState, useRef } from "react";

const FloatingPopup = () => {
  const [show, setShow] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasAppeared) {
      const showTimer = setTimeout(() => {
        setShow(true);
        setHasAppeared(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(showTimer);
    }
  }, [hasAppeared]);

  useEffect(() => {
    if (show) {
      const hideTimer = setTimeout(() => setShow(false), 60000); // Hide after 1 minute

      // Close popup on outside click
      const handleClick = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
          setShow(false);
        }
      };
      document.addEventListener("mousedown", handleClick);

      return () => {
        clearTimeout(hideTimer);
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={popupRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col items-center gap-4 text-center"
    >
      <p className="transition-colors duration-200 hover:text-shop_dark_blue text-bold">
        Just so you know, the actual price will be emailed to you after checkout.
        You can also conveniently check the status of your quotation anytime on
        the orders page.
      </p>
      <button
        onClick={() => setShow(false)}
        className="text-gray-500 hover:text-red-500 font-bold text-xl"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default FloatingPopup;