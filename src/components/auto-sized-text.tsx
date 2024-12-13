import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export function AutoSizedText({ children }: Props) {
    const ref = useRef(null);
    const [fontSize, setFontSize] = useState<string>('4rem');

    useLayoutEffect(() => {
        const element = (ref.current as unknown as HTMLElement);
        const parentElement = element.parentElement;
        if (!parentElement) {
            return;
        }
        const dimentions = element.getBoundingClientRect();
        const parentStyles = window.getComputedStyle(element.parentElement);
        const widthToFit = parseFloat(parentStyles.width) - parseFloat(parentStyles.paddingLeft) - parseFloat(parentStyles.paddingRight);
        if (dimentions.width > widthToFit) {
            const scaleFactor = widthToFit / dimentions.width;
            setFontSize(`${parseFloat(fontSize) * scaleFactor}rem`);
        }
    }, []);

    return (
        <div ref={ref} style={{ fontSize }}>{children}</div>
    )
}