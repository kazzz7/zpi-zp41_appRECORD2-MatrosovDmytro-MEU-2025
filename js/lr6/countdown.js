import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.getElementById('datetime-picker');
const refs = {
  days:   document.querySelector('[data-days]'),
  hours:  document.querySelector('[data-hours]'),
  minutes:document.querySelector('[data-minutes]'),
  seconds:document.querySelector('[data-seconds]')
};

let intervalId = null;
startBtn.disabled = true;

flatpickr(input, {
  enableTime: true,
  defaultDate: new Date(),
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      clearInterval(intervalId);
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const targetTime = new Date(input.value).getTime();
  intervalId = setInterval(() => {
    const delta = targetTime - Date.now();
    if (delta <= 0) {
      clearInterval(intervalId);
      updateTimer(0,0,0,0);
      return;
    }
    const days    = String(Math.floor(delta / (1000*60*60*24))).padStart(2,'0');
    const hours   = String(Math.floor((delta % (1000*60*60*24))/(1000*60*60))).padStart(2,'0');
    const minutes = String(Math.floor((delta % (1000*60*60))/(1000*60))).padStart(2,'0');
    const seconds = String(Math.floor((delta % (1000*60))/1000)).padStart(2,'0');
    updateTimer(days,hours,minutes,seconds);
  }, 1000);
});

function updateTimer(d,h,m,s) {
  refs.days.textContent    = d;
  refs.hours.textContent   = h;
  refs.minutes.textContent = m;
  refs.seconds.textContent = s;
}
