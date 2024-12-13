'use client';
import { useCallback, useMemo, useRef, useState } from "react";
import fibonacciSequence from '@/utils/fibonacci-sequence';
import { useScrollWithDragging } from "@/hooks/useScrollWithDragging";
import Box from "@/components/box";
import BoxNumbersInput from "@/components/box-numbers-input";

export default function BoxList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>(0);
  const [numberOfBoxes, setNumberOfBoxes] = useState(30);
  const boxes = useMemo(() => fibonacciSequence(numberOfBoxes), [numberOfBoxes]);

  const handleScroll = () => {
    const container = containerRef.current as HTMLElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;

    let index;
    if (scrollLeft >= scrollWidth) {
      index = boxes.length - 1;
    } else {
      const progress = scrollLeft / scrollWidth;
      index = Math.floor(progress * boxes.length);
    }

    boxes.forEach((box, i) => {
      if (i === index) {
        setActiveBoxIndex(i)
      }
    });
  }

  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useScrollWithDragging(containerRef)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberOfBoxes(Number(value));
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2">
        <BoxNumbersInput value={numberOfBoxes} handleInputChange={handleInputChange} />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className={"flex items-center overflow-x-scroll space-x-4 p-4 whitespace-nowrap bg-white rounded-lg shadow-md custom-scrollbar " + (isDragging ? 'cursor-grabbing' : 'cursor-grab')}
        >
          {boxes.map((box, index) => (
            <Box key={index} item={box} isActive={activeBoxIndex === index} />
          ))}
        </div>
      </div>
    </div>
  );
};

