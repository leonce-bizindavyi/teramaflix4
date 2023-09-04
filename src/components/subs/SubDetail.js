import React, { useState, useEffect, useRef } from 'react';
import Sub from './Sub';
import Link from 'next/link';

function SubDetail(props) {
const [pages, setPages] = useState([]);
const subType = props.subType;
const titleRef = useRef('');

useEffect(() => {
  async function fetchpages(cat) {
    const response = await fetch(`/api/subs/${cat}/0/5`);
    const data = await response.json();
    if (data[0]) setPages(data);
  }

  if (subType === 'music') {
    titleRef.current = 'Music';
    fetchpages(5);
  } else if (subType === 'comedie') {
    titleRef.current = 'Comedies';
    fetchpages(4);
  } else if (subType === 'series') {
    titleRef.current = 'Series';
    fetchpages(2);
  } else if (subType === 'films') {
    titleRef.current = 'Films';
    fetchpages(3);
  } else if (subType === 'others') {
    titleRef.current = 'Others';
    fetchpages(1);
  }
}, [subType]);

return (
<>
<div className="voir_plus_romance" id="voir_plus_romance">
<div className="mt-4 ml-6">
<label className="font-semibold text-blue-500">{titleRef.current}</label>
</div>
<div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:ml-10 lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
{pages.map((page) => {
return <Sub key={page.ID} page={page} />;
})}
<Link href="/Sub">
<div className="w-12 h-12 justify-center bottom-0 left-1/2 relative cursor-pointer border-2 rounded-full border-blue-600 shadow-xl bg-blue-300 hover:bg-white shadow-blue-800" id="retourner_romances">
<svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</div>
</Link>
</div>
</div>
</>
);
}

export default SubDetail;