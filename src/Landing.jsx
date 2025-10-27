import { useState, useRef, useEffect } from "react";
import Button from "./DownloadButton";
import { Link } from "react-router-dom";

export default function Landing() {
    const templates = [
        { id: 1, name: "Classic", bgClass: "bg-gray-100", borderClass: "border-gray-300", textClass: "text-gray-800" },
        { id: 2, name: "Modern", bgClass: "bg-gray-200", borderClass: "border-gray-400", textClass: "text-gray-900" },
        { id: 3, name: "Minimal", bgClass: "bg-gray-50", borderClass: "border-gray-200", textClass: "text-gray-700" },
    ];
    const [index, setIndex] = useState(0);
    const [dark, setDark] = useState(false);

    const cardRef = useRef(null);
    const containerRef = useRef(null);
    const [{ x, y }, setPos] = useState({ x: 0, y: 0 });
    const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

    const words = ["Build", "Design", "Showcase", "Ship"];
    const [wordIndex, setWordIndex] = useState(0);
    const [sub, setSub] = useState("");

    useEffect(() => {
        let i = 0;
        const current = words[wordIndex];
        const forward = setInterval(() => {
            i++;
            setSub(current.slice(0, i));
            if (i >= current.length) {
                clearInterval(forward);
                setTimeout(() => {
                    const backward = setInterval(() => {
                        i--;
                        setSub(current.slice(0, i));
                        if (i <= 0) {
                            clearInterval(backward);
                            setWordIndex((w) => (w + 1) % words.length);
                        }
                    }, 50);
                }, 800);
            }
        }, 90);
        return () => clearInterval(forward);
    }, [wordIndex]);

    useEffect(() => {
        const onPointerMove = (e) => {
            if (!dragState.current.dragging) return;
            const rect = containerRef.current.getBoundingClientRect();
            const card = cardRef.current;
            let nx = e.clientX - rect.left - dragState.current.offsetX;
            let ny = e.clientY - rect.top - dragState.current.offsetY;
            const maxX = rect.width - (card?.offsetWidth || 300);
            const maxY = rect.height - (card?.offsetHeight || 200);
            nx = Math.max(0, Math.min(maxX, nx));
            ny = Math.max(0, Math.min(maxY, ny));
            setPos({ x: nx, y: ny });
        };
        const onPointerUp = () => (dragState.current.dragging = false);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    const onPointerDown = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        dragState.current.dragging = true;
        dragState.current.offsetX = e.clientX - rect.left;
        dragState.current.offsetY = e.clientY - rect.top;
    };

    const handleGetStarted = () => {
        window.location = "/canvas";
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-700 flex flex-col md:flex-row items-center justify-center gap-10 p-10 ${dark ? "bg-black text-gray-100" : "bg-gray-100 text-black"
                }`}
        >
            <div className="w-full md:w-[420px] flex flex-col gap-5">
                <h1 className="text-3xl font-bold tracking-tight">
                    ReSuMe<span className="text-indigo-500">Craft</span>
                </h1>

                <p className={`transition-colors duration-700${dark ? "bg-black text-gray-100" : "bg-gray-100 text-black"
                    }`}>
                    {sub}
                    <span className="ml-1 text-gray-500">|</span> your professional story.
                </p>
                <div className="absolute bottom-10 right-10 flex items-center gap-3">
                    <h1 className={`text-2xl font-semibold transition-colors${dark ? "bg-black text-gray-100" : "bg-gray-100 text-black"
                        }`}>
                        Theme
                    </h1>

                    <label title="Toggle theme" className="relative inline-block w-12 h-7">
                        <input
                            type="checkbox"
                            checked={dark}
                            onChange={() => setDark((d) => !d)}
                            className="sr-only peer"
                        />

                        {/* Track */}
                        <span
                            className="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-gray-700 transition-colors duration-300"
                        ></span>

                        {/* Knob */}
                        <span
                            className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"
                        ></span>
                    </label>
                </div>


                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={() => setIndex((i) => (i - 1 + templates.length) % templates.length)}
                        className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:opacity-50 transition cursor pointer"
                    >
                        ‹
                    </button>

                    <div
                        onClick={() => setIndex((i) => (i + 1) % templates.length)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium ${templates[index].borderClass} bg-transparent transition`}
                    >
                        {templates[index].name}
                    </div>

                    <button
                        onClick={() => setIndex((i) => (i + 1) % templates.length)}
                        className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:opacity-50 transition cursor pointer"
                    >
                        ›
                    </button>
                </div>
                <Link to={'/canvas'}><Button className="mt-5 w-fit" name={"Get Started"} /></Link>
                <div className="flex gap-3 mt-5">
                    {[
                        { label: "Templates", value: "3" },
                        { label: "Build Time", value: "5+ min" },
                        { label: "Export", value: "PDF" },
                    ].map((info) => (
                        <div key={info.label} className="p-3 rounded-lg border border-gray-700 bg-transparent text-sm">
                            <strong className="block text-base">{info.value}</strong>
                            <span className="text-gray-400">{info.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
