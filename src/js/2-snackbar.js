import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDelay = document.querySelector('.delay-input');
const formEl = document.querySelector('.form');

const createPromise = event => {
    event.preventDefault();

    const selectedState = document.querySelector('input[name="state"]:checked').value;
    const delay = parseInt(inputDelay.value);

    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (selectedState === 'fulfilled') {
                resolve(
                    iziToast.success({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    })
                );
            } else {
                reject(
                    iziToast.error({
                    message: `❌ Rejected promise in ${delay}ms`,
                    })
                );
            };

        }, delay)
    });

    formEl.reset();

    promise
        .then(() => console.log(`✅ Fulfilled promise in ${delay}ms`))
        .catch(() => console.log(`❌ Rejected promise in ${delay}ms`));
};

formEl.addEventListener('submit', createPromise);

