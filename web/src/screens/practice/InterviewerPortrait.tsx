export function InterviewerPortrait() {
  return (
    <svg
      viewBox="0 0 112 112"
      role="img"
      aria-label="Ilustración fija de la entrevistadora"
      className="interviewer-portrait"
    >
      <circle cx="56" cy="56" r="56" className="fill-secondary" />
      <path d="M17 101c4-17 18-26 39-26s35 9 39 26v11H17z" className="fill-primary" />
      <path d="M32 47c0-24 10-36 25-36s25 12 25 36v12H32z" className="fill-foreground" />
      <ellipse cx="57" cy="49" rx="19" ry="23" className="fill-card" />
      <path d="M38 45c4-15 12-21 23-21 8 0 15 4 20 12-5-2-10-5-15-9-6 8-16 13-28 14z" className="fill-foreground" />
      <path d="M48 51h1m15 0h1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-foreground" />
      <path d="M51 61c4 3 8 3 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
    </svg>
  )
}

