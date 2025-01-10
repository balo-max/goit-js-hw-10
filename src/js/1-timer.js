import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');

startButton.disabled = true;

let userSelectedDate; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {  
        userSelectedDate = selectedDates[0];

        if (userSelectedDate <= options.defaultDate) {
            iziToast.warning({
              title: 'Warning',
              message: 'Please choose a date in the future!'
            });

            startButton.disabled = true;

            return;
        } else {
            startButton.disabled = false;
        }

        console.log(selectedDates[0]);
    },
};

new flatpickr('#datetime-picker', options); 

const timer = {
    intervalId: null,
    elements: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },

    start() {
        this.intervalId = setInterval(() => {
            inputEl.disabled = true;
            startButton.disabled = true;

            const ms = this.deadline - Date.now();

            if (ms <= 0) {
                this.stop();
                return;
            }

            const timeComponents = this.convertMs(ms);

            this.elements.days.textContent = this.pad(timeComponents.days);
            this.elements.hours.textContent = this.pad(timeComponents.hours);
            this.elements.minutes.textContent = this.pad(timeComponents.minutes);
            this.elements.seconds.textContent = this.pad(timeComponents.seconds);

        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
        startButton.disabled = true;
        inputEl.disabled = false;

        location.reload();
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;


        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    },

    pad(value) {
        return String(value).padStart(2, '0');
    },
};

startButton.addEventListener('click', () => {
    timer.deadline = userSelectedDate;
    timer.start();
}); 
