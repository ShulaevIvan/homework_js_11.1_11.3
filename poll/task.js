function getData(){

    return new Promise((resolve, reject)=>{
        let request = new XMLHttpRequest()
        request.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php')
        request.send()

        request.addEventListener('readystatechange', ()=>{

            if (request.readyState === request.DONE){
                resolve(request.responseText)
            }
            else if (request.status >= 400 || request.status >= 500){
                alert('Ошибка, повторите позднее')
            };
        });
    });
};

function sendData(votId, ansId, ansWrap){

    return new Promise((resolve, reject)=>{

        let request = new XMLHttpRequest
        request.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php')
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        request.send(`vote=${votId}&answer=${ansId}`)
        
        request.addEventListener('readystatechange', ()=>{

            if(request.readyState === request.DONE){
                resolve()

                let responseData = JSON.parse(request.responseText)
                let stats = responseData['stat']
                let poolAns = document.querySelector('#poll__answers')
                let btnsArr = Array.from(poolAns.querySelectorAll('.poll__answer'))
                let allVotes = 0

                stats.forEach((item)=> allVotes += item['votes'])
                btnsArr.forEach((btn)=> btn.remove())

                stats.forEach((item)=>{

                    let voteTag = document.createElement('p')
                    let ans = item['answer']
                    let vote = item['votes']
                    let persentVotes = (vote * 100 / allVotes).toFixed(2)

                    voteTag.innerHTML = `${ans}: <strong>${persentVotes} %</strong>`
                    poolAns.appendChild(voteTag)
                });
            }
            else if (request.status >= 400 || request.status >= 500){
                alert('Ошибка, повторите позднее')
            };
        });
    });
};



function createAnsElements(title, ans){

    let ansWrap = document.querySelector('#poll__answers')
    let titleWrap = document.querySelector('#poll__title')
    let btn = document.createElement('button')

    titleWrap.textContent = title
    titleWrap.style.fontWeight = 'bold'
    titleWrap.style.marginBottom = '5px'
    btn.textContent = ans
    btn.classList.add('poll__answer')
    ansWrap.appendChild(btn)

    return btn
};


window.addEventListener('DOMContentLoaded', ()=>{

    let responseData = getData()

    responseData.then((request)=>{

        let data = JSON.parse(request)
        let voteId = data['id']
        let ansArr = data['data']['answers']
        let title = data['data']['title']

        for (let i = 0; i < ansArr.length; i++){

            let btn = createAnsElements(title, ansArr[i])
            let ansId = i

            btn.addEventListener('click', (e)=>{

                let target = e.target
                if (target && target.classList.contains('poll__answer')){
                    sendData(voteId, ansId)
                    alert('Спасибо, ваш голос засчитан!')
                };
            })
        };

    });
});