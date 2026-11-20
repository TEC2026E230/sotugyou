    // liff.init({
    //     liffId: "2011943995-zP1wVM0j"
    // }).then(() =>{
    //     console.log("LIFF初期化成功");
    // }).catch((err) => {
    //     console.error("LIFF初期化失敗", err);
    // });

const shopMenus = {
    yakisoba:[
        {id: 'so-su', name:'ソース焼きそば',price:300},
        {id: 'sio', name:'塩焼きそば',price:300}
    ],
    popcorn:[
        {id: 'siopop', name:'塩ポップコーン',price:200},
        {id: 'caramel', name:'キャラメルポップコーン',prce:200}
    ],
    hamburger:[
        {id: 'hamburger', name:'ハンバーガー',price:200},
        {id: 'cheese', name:'チーズバーガー',price:300},
        {id: 'teriyaki', name:'てりやきバーガー',price:300}
    ],
    takoyaki:[
        {id: 'so-sumayo', name:'ソースマヨ',price:200},
        {id: 'mentaimayo', name:'明太マヨ',price:200},
        {id: 'ponzu', name:'ポン酢',price:200}
    ]
};

const shopSelect = document.getElementById('shop-select');
const menu = document.getElementById('menu');

let maxLimit = Number(localStorage.getItem('maxReservationLimit')) || 10;
function updateMenu(){
    const selectedshop = shopSelect.value;
    const menus = shopMenus[selectedshop] || [] 
    menu.innerHTML = " ";
    
    if(menus.length === 0) return;

    menus.forEach(item => {
        const label = document.createElement('label');
        label.className = 'menu-item-label';
        label.style.display = 'block';
        label.style.margin = '8px 0'
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'menu_ids[]';
        checkbox.value = item.id;
        checkbox.style.marginRight = '8px';
        checkbox.addEventListener('change', updateTotalPrice);

        const priceText = item.price ? `　${item.price}` : '';
        const textNode = document.createTextNode(`${item.name}${priceText}円`);
        const kosuuinput = document.createElement('input');
        kosuuinput.type = 'number';
        kosuuinput.id = `kosuu_${item.id}`;
        kosuuinput.name = `kosuu_${item.id}`;
        kosuuinput.min = '1';
        kosuuinput.max = String(maxLimit);
        kosuuinput.value = '1';
        kosuuinput.style.width = '50px';
        kosuuinput.style.marginLeft = '12px';

        kosuuinput.addEventListener('input', updateTotalPrice);
        kosuuinput.addEventListener('change', updateTotalPrice);

        label.appendChild(checkbox);
        label.appendChild(textNode);
        label.appendChild(kosuuinput);

        menu.appendChild(label);
    });
}

shopSelect.addEventListener('change', updateMenu);
updateMenu();



function getData(){
    let hasError = false;
    let totalPrice = 0;
    const timeselect = document.getElementById('time-slot-select');
    const selectedoption = timeselect.options[timeselect.selectedIndex];
    const selectedShop = shopSelect.value;
    const selectedtimeslot = document.getElementById('time-slot-select').value;

    const selectedItems = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    console.log("見つかったチェックボックスの数:", checkboxes.length);

    if(selectedoption.disabled){
        alert("この時間枠はすでに受付終了しています。")
        return null;
    }
    if(checkboxes.length == 0){
        alert("メニューを1つ以上選択してください");
        return null;
    }
    checkboxes.forEach(check =>{
        if(hasError) return;
        const itemid = check.value;
        const inputid = `kosuu_${itemid}`;
        const inputElement = document.getElementById(inputid);
        console.log("商品ID:", itemid, "数量要素:", inputElement);
      
        if(inputElement){
            const quantity = Number(inputElement.value);
            const menus = shopMenus[selectedShop];
            const targetMenu = menus.find(m => m.id === itemid);
            const itemname = targetMenu ? targetMenu.name : itemid;
            const price = targetMenu ? targetMenu.price : 0;

            totalPrice += price * quantity;

            if(quantity < 1 || quantity > maxLimit){
                alert(`1商品あたりの予約は1～${maxLimit}個までです。`)
                hasError = true;
                return;
            }
            selectedItems.push({
                itemid:itemid,
                itemname:itemname,
                price: price,
                quantity:Number(quantity)
            });
        }
    });
    if(hasError){
        return null;
    }

    const postdata = {
        shop:selectedShop,
        timeslot:Number(selectedtimeslot),
        items:selectedItems,
        totalPrice: totalPrice
    };


    console.log("送信データ:", postdata);
    return postdata
}

function pasttimeslots(){
    const select = document.getElementById('time-slot-select');
    if(!select) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimevalue = currentHour * 60 + currentMinutes;

    const options = select.querySelectorAll('option');
    options.forEach(option => {
        const text = option.textContent;
        const match = text.match(/^(\d{1,2}):(\d{2})/);
        if(match){
            const slotHour = parseInt(match[1], 10);
            const slotMinute = parseInt(match[2], 10);
            const slotTimeValue = slotHour * 60 + slotMinute;

            if(slotTimeValue < currentTimevalue){
                option.disabled = true;
                if(!option.textContent.includes('受付終了')){
                    option.textContent += '(受付終了)';
                }
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    pasttimeslots();
})

function confirm(){
    const postdata = getData();
    if(!postdata) return;

    const shopSelect = document.getElementById('shop-select');
    const shopName = shopSelect.options[shopSelect.selectedIndex].textContent;

    const timeselect = document.getElementById('time-slot-select');
    const timeslottext = timeselect.options[timeselect.selectedIndex].textContent;

    const confirmData = {
        rawData: postdata,
        shopName: shopName,
        timeslottext: timeslottext
    };

    localStorage.setItem('reservation_temp', JSON.stringify(confirmData));
    window.location.href = 'kakunin.html';
}

function updateTotalPrice(){
    const totalEl = document.getElementById('total-price');
    if(!totalEl) return;

    const selectedShop = shopSelect.value;
    const menus = shopMenus[selectedShop] || [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    let total = 0;

    checkboxes.forEach(check =>{
        const itemid = check.value;
        const inputElement = document.getElementById(`kosuu_${itemid}`);
        const targetMenu = menus.find(m => m.id === itemid);

        if(inputElement && targetMenu){
            const quantity = Math.max(0, Number(inputElement.value) || 0);
            const price = Number(targetMenu.price) || 0;
            total += price * quantity;

        }
    });

    totalEl.textContent = total.toLocaleString();
}