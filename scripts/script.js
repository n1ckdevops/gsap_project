window.onload = function () {
  const animateBacteria = (selector, delay = 0) => {
    gsap.to(selector, {
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 2,
      delay: delay,
    });
  };

  animateBacteria("#bacteria-2");
  animateBacteria("#bacteria-3", 0.5);
  animateBacteria("#bacteria-4", 1);

  gsap.fromTo(
    ".start_screen",
    { opacity: 0 },
    { opacity: 1, duration: 3, delay: 0.5 }
  );

  gsap.to(".button", {
    scale: 1.1,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });

  document.querySelector(".button").addEventListener("click", function () {
    gsap.to(".start_screen", {
      opacity: 0,
      duration: 0.5,
      onComplete: function () {
        document.querySelector(".start_screen").style.display = "none";
        document.querySelector(".game").style.display = "none";
        document.querySelector(".start_game").style.zIndex = "3";
        gsap.to(".start_game", { opacity: 1, duration: 0.5 });
        gsap.to(".arrow_left", {
          x: -10,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
        });

        let clickedBacteriaCount = 0;
        const totalBacteriaCount = 6;
        const handleBacteriaClick = (bacteria) => {
          gsap.to(bacteria, { opacity: 0, duration: 1 });
          const bacteriaType = bacteria.classList[0].split("-")[1];
          const penaClass = `.pena_${bacteriaType}`;
          const drtyClass = `.drty_${bacteriaType}`;
          const tl = gsap.timeline();
          tl.to(penaClass, { opacity: 1, duration: 1, delay: 0.5 })
            .to(penaClass, { y: 150, duration: 1 })
            .to(penaClass, { opacity: 0, duration: 1 })
            .to(drtyClass, { opacity: 0, duration: 1 }, "-=1")
            .add(() => {
              clickedBacteriaCount++;
              if (clickedBacteriaCount === totalBacteriaCount) {
                gsap.to(".start_game", {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: function () {
                    document.querySelector(".start_game").style.display =
                      "none";
                    document.querySelector(".end_game").style.zIndex = "3";
                    setTimeout(() => {
                      gsap.to(".end_game", { opacity: 1, duration: 0.5 });
                      gsap.to(".end_screen_text", {
                        display: "block",
                        duration: 0,
                      });
                      gsap.to(".end_screen_text_2", {
                        display: "none",
                        duration: 0,
                      });
                    }, 2000);
                  },
                });
              }
            });
        };

        const bacteriaFridge = document.querySelector(".bacteria-fridge");
        const handleFridgeClick = function () {
          gsap.to(".bacteria-fridge", { opacity: 0, duration: 1 });
          gsap.to(".text_pregame", { opacity: 0, duration: 0.5 });
          gsap.to(".spray", { opacity: 1, duration: 1, delay: 0.5 });
          gsap.to(".scale", { opacity: 1, duration: 1, delay: 0.5 });
          gsap.to(".scale2", { opacity: 1, duration: 1, delay: 0.5 });
          gsap.to(".pena", { opacity: 1, duration: 1, delay: 1 });
          gsap.to(".pena", {
            y: 350,
            opacity: 0,
            duration: 2,
            delay: 2,
            ease: "power1.inOut",
          });
          gsap.to(".drty_fridge", { opacity: 0, duration: 1, delay: 2 });
          gsap.to(".drty_fridge2", { opacity: 0, duration: 1, delay: 2 });

          const animationDuration = 30;
          const timeline = gsap.timeline();
          timeline
            .to(".bacteria-oven", { opacity: 1, duration: 1, delay: 3 })
            .to(".bacteria-cooker", { opacity: 1, duration: 1 })
            .to(".bacteria-sink", { opacity: 1, duration: 1 })
            .add([
              gsap.to(".bacteria-switch", {
                opacity: 1,
                duration: 1,
                delay: 4,
              }),
              gsap.to(".bacteria-bath", { opacity: 1, duration: 1, delay: 5 }),
              gsap.to(".bacteria-door", { opacity: 1, duration: 1, delay: 6 }),
              gsap.to(".scale2", {
                clipPath: "inset(0% 0% 0% 100%)",
                duration: animationDuration,
                onComplete: function () {
                  setTimeout(() => {
                    gsap.to(".start_game", {
                      opacity: 0,
                      duration: 0.5,
                      onComplete: function () {
                        document.querySelector(".start_game").style.display =
                          "none";
                        document.querySelector(".end_game").style.zIndex = "3";
                        setTimeout(() => {
                          gsap.to(".end_game", { opacity: 1, duration: 0.5 });
                          if (clickedBacteriaCount < totalBacteriaCount) {
                            gsap.to(".end_screen_text_2", {
                              display: "block",
                              duration: 0,
                            });
                            gsap.to(".end_screen_text", {
                              display: "none",
                              duration: 0,
                            });
                          } else {
                            gsap.to(".end_screen_text", {
                              display: "block",
                              duration: 0,
                            });
                            gsap.to(".end_screen_text_2", {
                              display: "none",
                              duration: 0,
                            });
                          }
                          gsap.fromTo(
                            ".end_screen_spray",
                            { x: 50, opacity: 0 },
                            {
                              x: 0,
                              opacity: 1,
                              duration: 1,
                              ease: "power1.inOut",
                            }
                          );
                          gsap.fromTo(
                            ".end_screen_pena",
                            { y: -50, opacity: 0 },
                            {
                              y: 30,
                              opacity: 1,
                              duration: 1,
                              ease: "power1.inOut",
                            }
                          );
                        }, 500);
                      },
                    });
                  }, 500);
                },
              }),
              gsap.to(".start_screen_2", {
                x: -1200,
                duration: animationDuration,
              }),
            ]);

          const bacteriaElements = document.querySelectorAll(
            ".bacteria-fridge, .bacteria-oven, .bacteria-sink, .bacteria-cooker, .bacteria-switch, .bacteria-door, .bacteria-bath"
          );

          bacteriaElements.forEach((bacteria) => {
            bacteria.addEventListener("click", () =>
              handleBacteriaClick(bacteria)
            );
          });

          bacteriaFridge.removeEventListener("click", handleFridgeClick);
        };

        bacteriaFridge.addEventListener("click", handleFridgeClick);
      },
    });
  });
};
