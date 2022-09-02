function sendRequest(data){

  return new Promise((resolve, reject)=> {

    let request = new XMLHttpRequest()
    let progress = document.querySelector('#progress')
    let card = document.querySelector('.card')
    let progressText = document.createElement('p')

    card.appendChild(progressText) 
   
    request.upload.onprogress = (e)=> {

      let percent = (e.loaded / e.total * 100).toFixed()

      e.loaded == e.total ? progressText.remove() : ('')

      progress.setAttribute('value', percent/100)
      progressText.textContent = `загружено ${e.loaded} из ${e.total} байт`
      
    };

  
    request.upload.onloadend = ()=> {
      if (request.status >= 200 && request.status < 300) {

        progress.setAttribute('value', 1)
        progressText.remove()
        resolve('good')
      }
      else {
        reject(this.status)
      };
    };

    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php')
    request.send(data)
  });
};


window.addEventListener('DOMContentLoaded', ()=>{

  const form = document.querySelector('#form')
  const btn = document.querySelector('#send')

  btn.addEventListener('click', (e)=>{

    e.preventDefault()
    let data = new FormData(form)

    btn.disabled = true

    sendRequest(data)
    .then((value)=> {
      console.log(value)
      btn.disabled = false
    })
    .catch((err)=>{
      console.log(err)
      btn.disabled = false
      
    });
  });
});
