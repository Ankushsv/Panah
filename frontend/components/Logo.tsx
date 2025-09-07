export default function Logo({className}:{className?:string}){
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#g)" />
      <path d="M14 30 L24 18 L34 30" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#fffffe"/>
          <stop offset="1" stopColor="#ffffff"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
