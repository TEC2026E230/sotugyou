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

    let calculatedTotal = 0;

    confirmData.rawData.items.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        const subtotal = price * quantity;
        calculatedTotal += subtotal;

        const li = document.createElement('li');
        li.textContent = `商品名: ${item.itemname} × ${item.quantity}個  ${item.quantity* item.price}円`;
        itemsUl.appendChild(li);
    });

    const totalEl = document.getElementById('confirm-total');
    if(totalEl){
        const total = confirmData.rawData.totalPrice ?? calculatedTotal;
        totalEl.textContent = Number(total).toLocaleString();
    }
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
    window.location.href = './rireki.html';
}

function back(){
    window.location.href = './yoyaku.html';
}