import { Sidebar } from '@/components/sidebar';
import { HeroContent } from '@/components/hero-content';
import { JetScene } from '@/components/jet-scene';
import { SectionReveal } from '@/components/section-reveal';

export default function Home() {
  const charterHighlights = [
    {
      title: 'On-demand access',
      description:
        'Book within hours with curated aircraft availability and global routing.',
    },
    {
      title: 'Cabin profiles',
      description:
        'Select light, midsize, or long-range cabins tuned to your mission.',
    },
    {
      title: 'Concierge-led',
      description:
        'Ground transfers, catering, and lounge access handled end-to-end.',
    },
    {
      title: 'Transparent pricing',
      description:
        'No hidden fees. Clear flight time, positioning, and handling costs.',
    },
  ];

  const planningSteps = [
    {
      step: '01',
      title: 'Request',
      description:
        'Share your cities, timing, and passenger count for a tailored itinerary.',
    },
    {
      step: '02',
      title: 'Route design',
      description:
        'We optimize aircraft, timings, and handling to minimize total travel time.',
    },
    {
      step: '03',
      title: 'Confirm',
      description:
        'Review the flight plan, crew details, and service inclusions.',
    },
    {
      step: '04',
      title: 'Fly',
      description:
        'Arrive at a private terminal and depart on your schedule.',
    },
  ];

  const fuelServices = [
    {
      title: 'Global fueling network',
      description:
        'Preferred pricing and priority service across major private terminals.',
    },
    {
      title: 'SAF availability',
      description:
        'Sustainable aviation fuel options where available for greener travel.',
    },
    {
      title: 'Ramp coordination',
      description:
        'We manage fuel releases, handling, and uplift timing behind the scenes.',
    },
  ];

  const fleet = [
    {
      title: 'Light Jets',
      seats: '4-7 seats',
      range: '1,200-1,800 nm',
      description: 'Fast regional hops with agile airport access.',
    },
    {
      title: 'Midsize Jets',
      seats: '7-9 seats',
      range: '2,000-3,000 nm',
      description: 'Balanced comfort with true coast-to-coast capability.',
    },
    {
      title: 'Long-Range Jets',
      seats: '10-14 seats',
      range: '4,500-6,500 nm',
      description: 'Flagship cabins for global nonstop itineraries.',
    },
  ];

  return (
    <main className="w-full min-h-screen overflow-x-hidden relative bg-background text-foreground">
      <Sidebar />
      <section className="w-full h-screen relative">
        <JetScene />
        <HeroContent />
      </section>

      <section id="charter" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20">
          <SectionReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">
                Jet Charter
              </p>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase">
                Private flights, precisely curated
              </h2>
              <p className="text-sm md:text-base text-foreground/60 max-w-2xl">
                Aurelian Air delivers tailored aircraft, routing, and concierge
                support so your schedule stays intact from departure to arrival.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {charterHighlights.map((item, index) => (
              <SectionReveal key={item.title} delay={100 + index * 80}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-white/40 p-6 backdrop-blur-sm">
                  <h3 className="text-sm uppercase tracking-[0.18em] text-foreground/80">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="planning" className="relative py-24 md:py-32 bg-foreground/5">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20">
          <SectionReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">
                Trip Planning
              </p>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase">
                A calm, controlled journey
              </h2>
              <p className="text-sm md:text-base text-foreground/60 max-w-2xl">
                Every route is mapped with precision: aircraft availability,
                slot coordination, and crew readiness aligned to your needs.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {planningSteps.map((item, index) => (
              <SectionReveal key={item.step} delay={120 + index * 80}>
                <div className="rounded-2xl border border-foreground/10 bg-background/70 p-6">
                  <p className="text-xs tracking-[0.25em] text-foreground/50">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-light tracking-[0.12em] uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="fuel" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20">
          <SectionReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">
                Fuel Services
              </p>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase">
                Reliable uplift, worldwide
              </h2>
              <p className="text-sm md:text-base text-foreground/60 max-w-2xl">
                We coordinate fuel releases, pricing, and sustainable options so
                your aircraft is always ready for departure.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {fuelServices.map((item, index) => (
              <SectionReveal key={item.title} delay={120 + index * 90}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-white/40 p-6 backdrop-blur-sm">
                  <h3 className="text-sm uppercase tracking-[0.18em] text-foreground/80">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="fleet" className="relative py-24 md:py-32 bg-foreground/5">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20">
          <SectionReveal>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">
                Aircraft
              </p>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase">
                A fleet for every mission
              </h2>
              <p className="text-sm md:text-base text-foreground/60 max-w-2xl">
                Choose the right cabin size, range, and experience for your next
                journey.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {fleet.map((item, index) => (
              <SectionReveal key={item.title} delay={120 + index * 90}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-background/70 p-6">
                  <h3 className="text-sm uppercase tracking-[0.18em] text-foreground/80">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-6 text-xs text-foreground/60 uppercase tracking-[0.2em]">
                    <span>{item.seats}</span>
                    <span>{item.range}</span>
                  </div>
                  <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <SectionReveal>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">
                  Contact
                </p>
                <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase">
                  Request your next flight
                </h2>
                <p className="text-sm md:text-base text-foreground/60 max-w-xl">
                  Speak with a charter advisor at any hour. We respond within
                  minutes for urgent travel and within the hour for all other
                  requests.
                </p>
                <div className="mt-4 space-y-2 text-sm text-foreground/60">
                  <p>24/7 Charter Desk</p>
                  <p>+1 (212) 555-0124</p>
                  <p>charter@aurelianair.com</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={140}>
              <div
                className="rounded-2xl border border-foreground/10 bg-white/40 p-6 backdrop-blur-sm"
                role="group"
                aria-label="Request a quote"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="mt-2 w-full rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground/70 placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="mt-2 w-full rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground/70 placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Route
                    </label>
                    <input
                      type="text"
                      placeholder="Departure to destination"
                      className="mt-2 w-full rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground/70 placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Dates, passengers, special requests"
                      className="mt-2 w-full rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground/70 placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full border border-foreground/20 bg-foreground/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-foreground/80 transition hover:bg-foreground/20"
                >
                  Request Quote
                </button>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
