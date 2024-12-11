import { memo } from "react";

interface Props {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: number;
}

function BoxNumbersInput({ handleInputChange, value }: Props) {
    return (
        <div className="flex justify-center items-center mb-4">
            <span className="mr-4">Number of boxes (10-50):</span>
            <input className="bg-black text-white p-1 rounded-md" min={10} max={50} type="number" onChange={handleInputChange} value={value} />
        </div>
    )
}

export default memo(BoxNumbersInput)