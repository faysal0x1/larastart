

import { useEffect, useRef, useState } from "react"

const Slider = ({ slides }) => {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const go = (dir) => {
    setIndex((prev) => {
      const next = dir === "next" ? prev + 1 : prev - 1
      if (next < 0) return slides.length - 1
      if (next >= slides.length) return 0
      return next
    })
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.style.transform = `translateX(-${index * 100}%)`
  }, [index])

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow">
      <div ref={trackRef} className="flex transition-transform duration-500 ease-out">
        {slides.map((s, i) => (
          <div className="min-w-full" key={i}>
            <div className="px-3 py-2">
              <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
            </div>
            <div className="p-2">
              <a href={s.href} className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src={s.img || "/placeholder.svg"}
                    alt={s.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white font-medium text-sm">{s.label}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go("prev")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-gray-700"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go("next")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-gray-700"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    </div>
  )
}

export default function FeatureTiles() {
  return (
    <section className="w-full bg-[#eef5ff] py-3">
      <div className="mx-auto max-w-[1680px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Home Electronics Deals */}
          <div className="grid gap-2 rounded-2xl bg-white p-3 shadow">
            <div className="px-3 py-2">
              <h3 className="text-lg font-semibold text-gray-800">Home Electronics Deals</h3>
            </div>
            <div className="grid gap-2 p-2">
              <a href="#" className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/19] relative">
                  <img
                    src="/image/Hero.jpg"
                    alt="Upgrade Your Space Today"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-medium">Upgrade Your Space Today</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Daily Savings */}
          <div className="grid gap-2 rounded-2xl bg-white p-3 shadow">
            <div className="px-3 py-2">
              <h3 className="text-lg font-semibold text-gray-800">Daily Savings</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <a href="#" className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src="/image/BannerOne.jpg"
                    alt="Under ৳30"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white font-medium text-sm">Under ৳30</span>
                  </div>
                </div>
              </a>
              <a href="#" className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src="/image/MSI.jpg"
                    alt="Under ৳75"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white font-medium text-sm">Under ৳75</span>
                  </div>
                </div>
              </a>
              <a href="#" className="col-span-2 block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src="/image/C-Chair.jpg"
                    alt="Shop All"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white font-medium text-sm">Shop All</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Slider Section */}
          <div className="grid gap-2 rounded-2xl bg-white p-3 shadow ">
            <Slider
              slides={[
                {
                  title: "The Keyboard Collection",
                  href: "#",
                  bg: "/image/Hp.jpg",
                  img: "/image/Hp.jpg",
                  label: "Find Yours Now",
                },
                {
                  title: "Power Up Season",
                  href: "#",
                  bg:"/image/BannerOne.jpg",
                  img: "/image/BannerOne.jpg",
                  label: "Charge Up Now",
                },
              ]}
            />
          </div>

          {/* Feature Event */}
          <div className="grid gap-2 rounded-2xl bg-white p-3 shadow">
            <div className="px-3 py-2">
              <h3 className="text-lg font-semibold text-gray-800">Feature Event</h3>
            </div>
            <div className="grid gap-2 p-2">
              <a href="#" className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src="/image/BannerTwo.jpg"
                    alt="Gear Up to Victory"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white font-medium text-sm">Gear Up to Victory</span>
                  </div>
                </div>
              </a>
              <a href="#" className="block relative overflow-hidden rounded-lg group">
                <div className="aspect-[21/9] relative">
                  <img
                    src="/image/C-Chair.jpg"
                    alt="Gotta Collect 'Em All"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white font-medium text-sm">Gotta Collect 'Em All</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
