import {HashLoader} from "react-spinners";
import React from "react";

function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50"><HashLoader size={64} color="#18f705" /></div>
    );
}

export default Loading;