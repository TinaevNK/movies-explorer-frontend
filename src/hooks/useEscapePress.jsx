import { useEffect } from 'react';

export default function useEscapePress(callback, dependency) {
  useEffect(() => {
    if (dependency) {
      const onEscClose = e => {
        if (e.key === 'Escape') {
          callback()
        }
      }
      document.addEventListener('keyup', onEscClose);
      // при размонтировании удалим обработчик данным колбэком
      return () => {
        document.removeEventListener('keyup', onEscClose)
      };
    }
  }, [dependency])
}
