window.addEventListener('DOMContentLoaded', ()=>{

    let form = document.getElementById('form')
    let progress = document.getElementById('progress')
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let formData = new FormData(form);
        let request = new XMLHttpRequest();

        request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php')
        request.send(formData)
        request.onprogress = (e) => {
          progress.value = e.loaded / 10000000
        };
    });
});