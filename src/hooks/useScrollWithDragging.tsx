import { RefObject, useEffect, useRef, useState } from 'react';

export function useScrollWithDragging(containerRef: RefObject<HTMLElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = (containerRef.current as HTMLElement)
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = (containerRef.current as HTMLElement)
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 2;
    container.scrollLeft = scrollLeft.current - walk;
  };

  return { isDragging, handleMouseMove, handleMouseUp, handleMouseDown };
}
