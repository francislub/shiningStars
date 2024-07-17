import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const openWhatsApp = () => {
    window.open("https://wa.me/+256753753179", "_blank");
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {isVisible && (
        <div
          className="whatsapp-button bg-green-500 hover:bg-green-600 rounded-full p-3 cursor-pointer shadow-lg"
          onClick={openWhatsApp}
        >
          <FaWhatsapp className="text-white" size={32} />
        </div>
      )}
    </div>
  );
}
