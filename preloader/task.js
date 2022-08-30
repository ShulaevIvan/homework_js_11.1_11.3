function getData(){
 
    if (localStorage.getItem('valutes') != null){

        let storageData = JSON.parse(localStorage.getItem('valutes'))
        let loader = document.querySelector('#loader')

        for (arr in storageData) {

            let itemCode = storageData[arr]['code']
            let itemValue = storageData[arr]['value']

            createElement(itemCode, 'item__code')
            createElement(itemValue, 'item__value')
        };
        loader.classList.remove('loader_active')
    };
    
    return new Promise((resolve, reject)=>{

        let request = new XMLHttpRequest()
        request.open('GET', 'https://netology-slow-rest.herokuapp.com')
        request.send()
        
        request.addEventListener('readystatechange', ()=>{

            if (request.readyState === request.DONE){
                resolve(request.response)
            }
            else if (request.status >= 400 || request.status >= 300 || request.status >=500){
                reject('что то пошло не так!')
            };
        });
    });
};

function createElement(text, itemClass){

    let items = document.querySelector('#items')
    let divCode = document.createElement('div')

    divCode.classList.add(itemClass)
    divCode.textContent = text
    items.appendChild(divCode)
};

window.addEventListener('DOMContentLoaded', ()=>{
    // localStorage.clear()
    let storageValueArr = []
    let data = getData()
    data.then((value)=>{

        let loader = document.querySelector('#loader')
        let data = JSON.parse(value)['response']['Valute']

        for (key in data){

            let itemCode = data[key]['CharCode']
            let itemValue = data[key]['Value']
            let itemObj = {
                'code': itemCode,
                'value': itemValue
            };

            storageValueArr.push(itemObj)
            localStorage.setItem('valutes', JSON.stringify(storageValueArr)) 

            createElement(itemCode, 'item__code')
            createElement(itemValue, 'item__value')
        };
        loader.classList.remove('loader_active')
    })
    .catch((err)=>{
        alert(err)
    });
});