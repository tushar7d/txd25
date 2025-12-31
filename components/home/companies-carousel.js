"use client";

export const CompaniesCarousel = () => {
  const companies = [
    { name: "Expedia", path: "/companies/Expedia.svg" },
    { name: "Hike", path: "/companies/Hike.svg" },
    { name: "Makemytrip", path: "/companies/Makemytrip.svg" },
    { name: "Revolut", path: "/companies/Revolut.svg" },
    { name: "Zomato", path: "/companies/Zomato.svg" },
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="w-full overflow-hidden">
      
      <div className="relative w-full">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .carousel-wrapper {
            position: relative;
            overflow: hidden;
          }

          .carousel-container {
            display: flex;
            animation: scroll 30s linear infinite;
          }

          .carousel-container:hover {
            animation-play-state: paused;
          }

          .carousel-item {
            flex: 0 0 calc(100% / 5);
            min-width: calc(100% / 5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
          }

          .carousel-item img {
            transition: all 0.3s ease;
          }

          :root .carousel-item img {
            filter: grayscale(100%) opacity(0.8) brightness(0.6);
          }

          .dark .carousel-item img {
            filter: grayscale(100%) opacity(0.6);
          }

          :root .carousel-item img:hover {
            filter: grayscale(0%) opacity(1) brightness(0.7);
          }

          .dark .carousel-item img:hover {
            filter: grayscale(0%) opacity(1) brightness(1);
          }

          .carousel-gradient {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 15%;
            pointer-events: none;
            z-index: 10;
          }

          .carousel-gradient-left {
            left: 0;
            background: linear-gradient(to right, var(--background), transparent);
          }

          .carousel-gradient-right {
            right: 0;
            background: linear-gradient(to left, var(--background), transparent);
          }

          @media (max-width: 1024px) {
            .carousel-item {
              flex: 0 0 calc(100% / 3);
              min-width: calc(100% / 3);
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-66.666%);
              }
            }
          }

          @media (max-width: 768px) {
            .carousel-item {
              flex: 0 0 calc(100% / 2);
              min-width: calc(100% / 2);
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .carousel-gradient {
              width: 20%;
            }
          }
        `}</style>

        <div className="carousel-wrapper">
          <div className="carousel-container">
            {duplicatedCompanies.map((company, index) => (
              <div key={`${company.name}-${index}`} className="carousel-item">
                <img
                  src={company.path}
                  alt={company.name}
                  className="h-16 md:h-20 w-auto object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="carousel-gradient carousel-gradient-left"></div>
          <div className="carousel-gradient carousel-gradient-right"></div>
        </div>
      </div>
    </section>
  );
};
