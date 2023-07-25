import { useState, useEffect } from 'react';

import { Layout } from '@/components/Layout';
import { HeadCard } from '@/components/Home/HeadCard';
import { BottomSection } from '@/components/Home/BottomSection';
import { CookiesModal } from '@/components/Home/CookiesModal';

export default function Home() {
  const [showCookieModal, setShowCookieModal] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('colisandcoCookieConsent');
    if (consent) {
      setShowCookieModal(false);
    }
  }, []);

  return (
    <Layout>
      <HeadCard />
      <BottomSection />
      {showCookieModal && (
        <CookiesModal
          isOpen={true}
          setShowCookieModal={setShowCookieModal}
          onRequestClose={() => setShowCookieModal(false)}
        />
      )}
    </Layout>
  );
}
