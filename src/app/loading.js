'use client'
import { GridLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <GridLoader color="gray" />
        </div>
    );
}