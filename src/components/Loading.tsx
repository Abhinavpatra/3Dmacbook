import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const { progress } = useProgress();
  const [displayed, setDisplayed] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const animate = () => {
      setDisplayed((prev) => {
        if (Math.abs(progress - prev) < 0.5) return progress;
        return prev + (progress - prev) * 0.1;
      });
      if (displayed < 100) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [progress]);

  return (
    <Html center>
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "2rem 3rem",
          borderRadius: "1rem",
          color: "white",
          fontSize: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Loading... {displayed.toFixed(0)}%</div>
        <div
          style={{
            marginTop: "1rem",
            width: "200px",
            height: "10px",
            background: "#333",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${displayed}%`,
              height: "100%",
              background: "linear-gradient(90deg,#667eea,#764ba2)",
              transition: "width 0.2s",
            }}
          />
        </div>
      </div>
    </Html>
  );
}
