// "use client";
//
// import { useEffect, useState } from "react";
// import Confetti from "react-confetti";
//
// export default function ConfettiEffect() {
//     const [show, setShow] = useState(false);
//     const [size, setSize] = useState({ width: 0, height: 0 });
//
//     useEffect(() => {
//         // размер окна
//         setSize({ width: window.innerWidth, height: window.innerHeight });
//
//         // запускаем конфетти
//         setShow(true);
//
//         // выключаем через 2 секунды
//         const timer = setTimeout(() => setShow(false), 2000);
//         return () => clearTimeout(timer);
//     }, []);
//
//     if (!show) return null;
//
//     return (
//         <Confetti
//             width={size.width}
//             height={size.height}
//             numberOfPieces={200}
//             recycle={false}
//             gravity={0.3}
//             initialVelocityX={{ min: -10, max: 10 }}
//             initialVelocityY={{ min: -30, max: -10 }}
//             style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
//         />
//     );
// }