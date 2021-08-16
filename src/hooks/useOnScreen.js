import { useEffect, useState, useRef } from 'react';

export default function useOnScreen(ref) {
  const observerRef = useRef(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting));
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      disconnect();
    };
  }, [ref]);

  function disconnect() {
    return observerRef.current.disconnect();
  }

  return { isOnScreen, disconnect };
}
