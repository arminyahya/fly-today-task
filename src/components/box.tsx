import { memo, useRef } from "react";
import { AutoSizedText } from "./auto-sized-text";

interface Props {
    item: number;
    isActive: boolean
}

function Box({ item, isActive }: Props) {
    return (
        <div
            className={`shrink-0 inline-flex w-36 h-36 rounded-md text-center items-center justify-center border shadow-sm select-none p-1 text-xl hover:-translate-y-1 hover:shadow-xl ${isActive ? "bg-green-600 text-white" : "bg-white text-black"
                }`}
        >
            <AutoSizedText >{item.toLocaleString()}</AutoSizedText>
        </div>
    )
}

export default memo(Box);