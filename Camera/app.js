const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.getElementById('btn-abrir-camera').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            alert('Erro ao acessar a câmera: ' + err);
        });
    } else {
        alert('Câmera não suportada neste dispositivo ou navegador.');
    }
});

document.getElementById('btn-tirar-foto').addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block';
    video.style.display = 'none';
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
    });
}
