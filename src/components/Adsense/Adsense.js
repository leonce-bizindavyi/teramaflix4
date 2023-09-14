import Head from 'next/head';
import React, { useEffect,useRef } from 'react';
import { useRouter } from 'next/router';

const Adsense = () => {
  const router = useRouter();
  const adsLoaded = useRef(false);

  useEffect(() => {
    const loadAd = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        adsLoaded.current = true;
      }
    };
  
    if (router.query && !adsLoaded.current) {
      setTimeout(loadAd, 0);
    }
  }, [router.query]);
  return (
    <>
    <Head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </Head>
    <div>
      <ins
        className="adsbygoogle h-[50%]"
        data-ad-client="ca-pub-8097044169349946"
        data-ad-slot="8028293203"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    </>
  );
};

export default Adsense;