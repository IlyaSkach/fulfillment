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


