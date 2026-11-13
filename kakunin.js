window.addEventListener('DOMContentLoaded', () =>{
    const dataString = localStorage.getItem('reservation_temp');
    if(!dataString){
        alert("予約情報が見つかりません。入力画面に戻ります。");
        window.location.href = 'yoyaku.html';
        return;
    } 

    const confirmData = JSON.parse(dataString);

    document.getElementById('confirm-shop').textContent = confirmData.shopName;
    document.getElementById('confirm-timeslot').textContent = confirmData.timeslottext;

    const itemsUl = document.getElementById('confirm-items');
    itemsUl.innerHTML = " ";

    confirmData.rawData.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `商品名: ${item.itemname} × ${item.quantity}個`;
        itemsUl.appendChild(li);
    });
});

function submit(){
    const dataString = localStorage.getItem('reservation_temp');
    const confirmData = JSON.parse(dataString);

    console.log("Javaへ送信するデータ:", confirmData.rawData);

    fetch('http://[JavaのIP]:8080/api/reservations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(confirmData.rawData)
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItm('reservation_temp');
        window.location.href = 'qr.html';
    });

    alert("予約が確定しました");
    //window.location.href = 'qr.html';
    window.location.href = 'yoyaku.html';
}

function back(){
    window.location.href = './yoyaku.html';
}