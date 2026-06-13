import React, { useEffect, useState } from 'react';
import { Video } from 'lucide-react';

function BackToTopIcon() {
  return (
    <span className="back-to-top-icon" aria-hidden="true">
      <span className="back-to-top-focus-corner back-to-top-focus-tl" />
      <span className="back-to-top-focus-corner back-to-top-focus-tr" />
      <span className="back-to-top-focus-corner back-to-top-focus-bl" />
      <span className="back-to-top-focus-corner back-to-top-focus-br" />
      <Video className="back-to-top-camera" size={18} strokeWidth={2.35} />
      <span className="back-to-top-record-dot" />
    </span>
  );
}

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = null;

    const updateVisibility = () => {
      setIsVisible(window.scrollY > 300);
      frame = null;
    };

    const requestUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-to-top-button ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span className="back-to-top-glow" aria-hidden="true" />
      <BackToTopIcon />
    </button>
  );
}
