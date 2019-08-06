if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((response) => {
            console.log('Service worker registered!', response);
        }).catch((error) => {
            console.error('Could not register service worker', error);
        })
    })
}