document.addEventListener('DOMContentLoaded', () => {
    fetch('http://[JavaのIP]:8080/api/reservations/history')//実際のapiエンドポイントに合わせる
        .then(response => response.json())
        .then(data => {
            const yoyakuList = document.getElementById('yoyaku-list');
            yoyakuList.innerHTML = ' ';

            if(!data || data.length === 0){
                yoyakuList.innerHTML = '<li>予約履歴はありません。</li>';
                return;
            }

            data.forEach(reservation => {
                const li = document.createElement('li');
                li.textContent = `店舗: ${reservation.shop} / 時間枠: ${reservation.timeslot} (商品数: ${reservation.items.length}件)`;
                yoyakuList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('履歴の取得に失敗しました:', error);
            const yoyakuList = document.getElementById('yoyaku-list');
            yoyakuList.innerHTML = '<li>履歴の読み込みに失敗しました</li>';
        })
})