document.querySelectorAll('.services-item-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { 
      scale: 1.05, 
      rotate: 2, 
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", 
      border: "2px solid var(--primary-color)", // Плавное появление бордера
      zIndex: 10, // Поднимаем карточку над остальными
      duration: 0.3, 
      ease: "power2.out" 
    });

    // Прячем линии (::before и ::after) одновременно с появлением бордера
    gsap.to(card, { "--line-height": "0px", "--small-line-height": "0px", duration: 0.3, ease: "power2.out" });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { 
      scale: 1, 
      rotate: 0, 
      boxShadow: "none",
      border: "2px solid transparent", // Убираем бордер
      zIndex: 1, // Возвращаем стандартный уровень
      duration: 0.3, 
      ease: "power2.out" 
    });

    // Возвращаем линии (::before и ::after)
    gsap.to(card, { "--line-height": "517px", "--small-line-height": "31px", duration: 0.3, ease: "power2.out" });
  });
});

gsap.registerPlugin(ScrollTrigger);

let mainAnimation = gsap.to("#movingSvg", {
    x: "100vw", // Двигаем вправо
    duration: 15, // Делаем движение медленнее
    ease: "power1.inOut", // Плавное начало и конец
    yoyo: false, // Не повторяем назад
    repeat: -1, // Зацикливаем анимацию
    paused: true, // Начинаем анимацию в паузе
    onUpdate: function() {
        let progress = this.progress(); // Получаем текущий прогресс анимации (от 0 до 1)
        if (Math.random() < 0.003) { // 0.3% вероятность подпрыгивания
            gsap.to("#movingSvg", { 
                y: -10, // Подпрыгивание вверх
                duration: 0.2, 
                ease: "power1.out", 
                yoyo: true, 
                repeat: 1, 
                onComplete: () => { gsap.to("#movingSvg", { y: 0, duration: 0.2, ease: "power1.inOut" }); } // Плавный возврат на линию
            });
        }
    }
});

ScrollTrigger.create({
    trigger: "#how", // Элемент, который должен быть видимым для запуска анимации
    start: "top center", // Начало триггера (когда верхняя часть элемента достигает центра области просмотра)
    onEnter: () => mainAnimation.play(), // Запуск анимации при входе в область просмотра
    onLeave: () => mainAnimation.pause(), // Пауза анимации при выходе из области просмотра
    onEnterBack: () => mainAnimation.play(), // Возобновление анимации при возврате в область просмотра
    onLeaveBack: () => mainAnimation.pause() // Пауза анимации при выходе из области просмотра назад
});


