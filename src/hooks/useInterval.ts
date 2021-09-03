import { useEffect, useRef } from 'react';

type CallbackType = () => void;

function useInterval(callback: CallbackType, delay: number) {
  const savedCallback = useRef<CallbackType>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
