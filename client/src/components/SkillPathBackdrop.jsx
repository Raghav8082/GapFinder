export const SkillPathBackdrop = () => {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path d="M -40 140 Q 300 60, 600 160 T 1300 110 T 1700 160" fill="none" stroke="#D4613E" strokeOpacity="0.14" strokeWidth="2" />
      <path d="M -40 220 Q 320 130, 640 240 T 1340 180 T 1700 230" fill="none" stroke="#D4613E" strokeOpacity="0.10" strokeWidth="2" />
      <path d="M -40 720 Q 340 640, 660 740 T 1360 680 T 1700 730" fill="none" stroke="#F0B41E" strokeOpacity="0.16" strokeWidth="2" />
      <path d="M -40 800 Q 360 860, 680 770 T 1380 830 T 1700 780" fill="none" stroke="#D4613E" strokeOpacity="0.10" strokeWidth="2" />

      <path
        d="M 60 100 L 220 280 L 130 460 L 340 560 L 260 760
           M 1540 110 L 1380 260 L 1480 440 L 1280 540 L 1360 740"
        fill="none"
        stroke="#D4613E"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        className="path-trace"
      />

      <circle cx="60" cy="100" r="6" fill="#D4613E" />
      <circle cx="220" cy="280" r="6" fill="#E8855A" />
      <circle cx="130" cy="460" r="7" fill="#F0B41E" />
      <circle cx="340" cy="560" r="5" fill="#D4613E" fillOpacity="0.55" />
      <circle cx="260" cy="760" r="5" fill="#D4613E" fillOpacity="0.3" />

      <circle cx="1540" cy="110" r="6" fill="#D4613E" />
      <circle cx="1380" cy="260" r="5" fill="#E8855A" fillOpacity="0.55" />
      <circle cx="1480" cy="440" r="5" fill="#D4613E" fillOpacity="0.4" />
      <circle cx="1280" cy="540" r="5" fill="#D4613E" fillOpacity="0.3" />
      <circle cx="1360" cy="740" r="5" fill="#D4613E" fillOpacity="0.22" />
    </svg>
  );
};
