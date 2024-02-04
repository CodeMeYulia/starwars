
const btn = document.getElementById('btn'); //переменная кнопки

async function asking() {

    //получение значений из инпутов
    const askingObj = document.getElementById('askingObj').value;
    const id = document.getElementById('id').value;

    document.querySelector('.process').textContent = "Идёт загрузка"; //подсказка, что процесс запущен

    //функция запроса-получения данных
    function getData() {
        fetch(`https://swapi.dev/api/${askingObj}/${id}`)
            .then(res => {
                console.log(res.status);
                return res.json();
            })
            .then(data => {
                console.log(data);
                let result = JSON.stringify(data);
                document.querySelector('.resultSearch').textContent = result.replaceAll(",", "\n");
            })
    }

    //проверка статуса запроса, 
    try {
        const response = await fetch(`https://swapi.dev/api/${askingObj}/${id}`);

        if (response.ok) {
            console.log('successful. данные получены');
            document.querySelector('.process').textContent = "";
            getData();
        } else {
            if (response.status === 404) throw new Error('404. Not found');
            if (response.status === 500) throw new Error('500. internal server error');
            throw new Error(response.status);
        }
    } catch (err) {
        console.error('Fetch-error', err);
        document.querySelector('.process').textContent = 'Fetch', err;
    }
}

//вызов по клику на кнопке
btn.addEventListener('click', function () {
    asking();
})