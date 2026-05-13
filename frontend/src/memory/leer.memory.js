export default function leerMemory() {
    return JSON.parse(localStorage.getItem('notas')) || [];
}