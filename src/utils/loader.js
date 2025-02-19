export function showLoader() {
    const element = document.getElementById('loading');
    element.classList.remove('hide');
}

export function hideLoader() {
    const element = document.getElementById('loading');
    element.classList.add('hide');
}
