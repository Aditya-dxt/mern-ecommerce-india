'use client';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import PromoBanner from '@/components/home/PromoBanner';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="snap-scroll-container">
      {/* Snap sections — one at a time */}
      <section className="snap-section">
        <HeroSection />
      </section>
      <section className="snap-section">
        <FeaturedProducts />
      </section>
      <section className="snap-section">
        <Categories />
      </section>

      {/* Free sections — scroll naturally */}
      <div className="snap-section-free">
        <PromoBanner />
        <Footer />
      </div>
    </div>
  );
}
