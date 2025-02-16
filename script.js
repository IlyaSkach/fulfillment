document.querySelectorAll(".services-item-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      border: "2px solid var(--primary-color)", // Плавное появление бордера
      zIndex: 10, // Поднимаем карточку над остальными
      duration: 0.3,
      ease: "power2.out",
    });

    // Прячем линии (::before и ::after) одновременно с появлением бордера
    gsap.to(card, {
      "--line-height": "0px",
      "--small-line-height": "0px",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      rotate: 0,
      boxShadow: "none",
      border: "2px solid transparent", // Убираем бордер
      zIndex: 1, // Возвращаем стандартный уровень
      duration: 0.3,
      ease: "power2.out",
    });

    // Возвращаем линии (::before и ::after)
    gsap.to(card, {
      "--line-height": "517px",
      "--small-line-height": "31px",
      duration: 0.3,
      ease: "power2.out",
    });
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
  onUpdate: function () {
    let progress = this.progress(); // Получаем текущий прогресс анимации (от 0 до 1)
    if (Math.random() < 0.003) {
      // 0.3% вероятность подпрыгивания
      gsap.to("#movingSvg", {
        y: -10, // Подпрыгивание вверх
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to("#movingSvg", { y: 0, duration: 0.2, ease: "power1.inOut" });
        }, // Плавный возврат на линию
      });
    }
  },
});

ScrollTrigger.create({
  trigger: "#how", // Элемент, который должен быть видимым для запуска анимации
  start: "top center", // Начало триггера (когда верхняя часть элемента достигает центра области просмотра)
  onEnter: () => mainAnimation.play(), // Запуск анимации при входе в область просмотра
  onLeave: () => mainAnimation.pause(), // Пауза анимации при выходе из области просмотра
  onEnterBack: () => mainAnimation.play(), // Возобновление анимации при возврате в область просмотра
  onLeaveBack: () => mainAnimation.pause(), // Пауза анимации при выходе из области просмотра назад
});

let currentQuestion = 1;
const totalQuestions = 4; // Количество вопросов

const questions = [
  { text: "", options: ["", "", ""] },
  {
    text: "Какие услуги фулфилмента вам нужны?",
    options: [
      "Хранение",
      "Проверка на брак",
      "Упаковка",
      "Маркировка",
      "Доставка",
      "Возврат брака",
      "Контент",
      "Комплекс под ключ",
    ],
  },
  {
    text: "На какие маркетплейсы планируется поставка товаров?",
    options: ["Wildberries (Вайлдберриз)", "Ozon (Озон)", "Другой"],
  },
  {
    text: "Какое количество единиц товара необходимо упаковать и отгрузить?",
    options: [
      "от 100",
      "от 500",
      "от 1000",
      "от 3000",
      "от 5000",
      "более 10 000",
    ],
  },
];

document.addEventListener("scroll", function () {
  const button = document.querySelector(".calc-button");
  if (window.scrollY > 0) {
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
});

function startQuiz() {
  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".quiz-screen").style.display = "block";
  document.getElementById("question-1").style.display = "block";
  document.querySelector(".welcome-text").style.display = "block";
}

function nextQuestion(questionNumber, userAnswer) {
  if (questionNumber !== currentQuestion) {
    return; // Если номер вопроса не совпадает с текущим, ничего не делаем
  }

  // Скрываем текст приветствия после ответа на первый вопрос
  if (currentQuestion === 1) {
    document.querySelector(".welcome-text").style.display = "none";
    document.querySelector(".call-button").style.display = "block"; // Показываем кнопку "Позвонить"
  }

  // Добавляем ответ пользователя в чат
  const userAnswerMessage = document.createElement("div");
  userAnswerMessage.classList.add("chat-message", "user-answer");

  const userAvatar = document.createElement("div");
  userAvatar.classList.add("avatar");
  userAvatar.style.backgroundColor = "#007bff"; // Цвет аватара пользователя

  const userMessage = document.createElement("div");
  userMessage.classList.add("message");
  userMessage.textContent = userAnswer;

  userAnswerMessage.appendChild(userAvatar);
  userAnswerMessage.appendChild(userMessage);
  document.querySelector(".chat").appendChild(userAnswerMessage);

  // Появляется сообщение "Оля печатает..."
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("chat-message", "operator");
  typingMessage.innerHTML = `
          <div class="avatar operator-avatar">
              <img src="Images/olga.gif" alt="avatar"></div>
          <div class="message typing">
              Оля печатает<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
          </div>
      `;
  document.querySelector(".chat").appendChild(typingMessage);

  // Скролл вниз
  window.scrollTo(0, document.body.scrollHeight);

  // Задержка перед появлением следующего вопроса
  setTimeout(() => {
    typingMessage.remove();

    if (currentQuestion < totalQuestions) {
      const nextQuestionData = questions[currentQuestion];

      const nextQuestion = document.createElement("div");
      nextQuestion.classList.add("chat-message", "operator");
      nextQuestion.innerHTML = `
                  <div class="avatar operator-avatar">
                      <img src="Images/olga.gif" alt="avatar"></div>
                  <div class="message">${nextQuestionData.text}</div>
                  <div class="options">
                      ${nextQuestionData.options
                        .map(
                          (option) =>
                            `<button class="option" onclick="nextQuestion(${
                              currentQuestion + 1
                            }, '${option}')">${option}</button>`
                        )
                        .join("")}
                  </div>
              `;
      document.querySelector(".chat").appendChild(nextQuestion);
      currentQuestion++;
    } else {
      // После последнего вопроса форма для имени и телефона
      const endMessage = document.createElement("div");
      endMessage.classList.add("chat-message", "operator");
      endMessage.innerHTML = `
                  <div class="avatar operator-avatar">
                      <img src="Images/olga.gif" alt="avatar"></div>
                  <div class="message">
                      <p>Введите Ваше имя:</p>
                      <input type="text" id="user-name" placeholder="Ваше имя">
                      <p>Введите Ваш телефон:</p>
                      <input type="tel" id="user-phone" placeholder="+7 (999) 999-99-99" maxlength="18" oninput="formatPhoneNumber(this)">
                      <button class="submit-button" onclick="submitForm()">Отправить </button>
                  </div>
              `;
      document.querySelector(".chat").appendChild(endMessage);
    }

    // Обновляем прогресс-бар
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector(".progress").style.width = `${progress}%`;

    // Скролл вниз
    window.scrollTo(0, document.body.scrollHeight);
  }, 2000); // Задержка 2 секунды
}

function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

  if (value.startsWith("7")) {
    value = value.slice(1); // Убираем лишнюю первую семерку
  }

  let formattedValue = "+7 (";

  if (value.length > 0) {
    formattedValue += value.substring(0, 3); // Код региона
  }
  if (value.length >= 4) {
    formattedValue += ") " + value.substring(3, 6); // Первые три цифры
  }
  if (value.length >= 7) {
    formattedValue += " " + value.substring(6, 8); // Следующие две цифры
  }
  if (value.length >= 9) {
    formattedValue += "-" + value.substring(8, 10); // Последние две цифры
  }
  if (value.length >= 11) {
    formattedValue += "-" + value.substring(10, 12); // Последние две цифры
  }

  // Устанавливаем значение обратно в поле ввода
  input.value = formattedValue.slice(0, 18);
}

function submitForm() {
  const name = document.getElementById("user-name").value;
  const phone = document.getElementById("user-phone").value;
  const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}-\d{2}$/;

  if (!name || !phonePattern.test(phone)) {
    showPopup("Введите корректное имя и номер телефона.");
    return;
  }
  // Отображаем благодарность
  document.querySelector(".quiz-screen").style.display = "none";
  document.querySelector(".final-screen").style.display = "block";
  document.getElementById(
    "final-message"
  ).innerHTML = `Спасибо, ${name}! Ваши данные успешно отправлены. Пока мы с вами свяжемся, вы можете ознакомится с ответами на часто задоваемые вопросы или <a href="tel:+1234567890">позвонить нам</a>.`;
}

function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function toggleAnswer(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector(".faq-answer");
  const icon = faqItem.querySelector(".faq-icon");

  if (answer.style.display === "none") {
    answer.style.display = "block";
    icon.textContent = "×"; // Меняем плюсик на крестик
    element.classList.add("active");
  } else {
    answer.style.display = "none";
    icon.textContent = "+"; // Меняем крестик на плюсик
    element.classList.remove("active");
  }
}
