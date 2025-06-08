// js/lr6/countdown.js

// Знаходимо інпут та кнопку
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

// Змінна для setInterval
let intervalId = null;

// Спочатку блокуватимемо кнопку Start
startBtn.disabled = true;

// Ініціалізуємо flatpickr
flatpickr(input, {
  enableTime: true,            // дозвіл на вибір часу
  time_24hr: true,             // 24-годинний формат
  dateFormat: "Y-m-d H:i",     // як показувати дату й час в полі
  defaultDate: new Date(),     // заповнити поле поточними датою+часом
  minuteIncrement: 1,          // крок вибору хвилин
  onClose(selectedDates) {
    // Якщо обрана дата в минулому — показати помилку і лишити кнопку заблокованою
    if (selectedDates[0] <= new Date()) {
      iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
      startBtn.disabled = true;
    } else {
      // Інакше — розблокувати кнопку і скидати попередній інтервал
      startBtn.disabled = false;
      clearInterval(intervalId);
    }
  },
});

// По кліку на Start запускаємо відлік
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const targetTime = new Date(input.value).getTime();

  intervalId = setInterval(() => {
    const now = Date.now();
    const delta = targetTime - now;

    if (delta <= 0) {
      clearInterval(intervalId);
      return;
    }

    const days    = String(Math.floor(delta / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours   = String(Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((delta % (1000 * 60)) / 1000)).padStart(2, '0');

    document.querySelector('[data-days]').textContent    = days;
    document.querySelector('[data-hours]').textContent   = hours;
    document.querySelector('[data-minutes]').textContent = minutes;
    document.querySelector('[data-seconds]').textContent = seconds;
  }, 1000);
});
