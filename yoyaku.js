liff.init({
    liffId: "2011943995-zP1wVM0j"
}).then(() =>{
    console.log("LIFF初期化成功");
}).catch((err) => {
    console.error("LIFF初期化失敗", err);
});

const shopMenus = {
    yakisoba:[
        {id: 'so-su', name:'ソース焼きそば'},
        {id: 'sio', name:'塩焼きそば'}
    ],
    popcorn:[
        {id: 'siopop', name:'塩ポップコーン'},
        {id: 'caramel', name:'キャラメルポップコーン'}
    ],
    hamburger:[
        {id: 'hamburger', name:'ハンバーガー'},
        {id: 'cheese', name:'チーズバーガー'},
        {id: 'teriyaki', name:'てりやきバーガー'}
    ],
    takoyaki:[
        {id: 'so-sumayo', name:'ソースマヨ'},
        {id: 'mentaimayo', name:'明太マヨ'},
        {id: 'ポン酢', name:'ポン酢'}
    ]
};

const shopSelect = document.getElementById('shop-select');
const menu = document.getElementById('menu');

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

        const textNode = document.createTextNode(item.name);

        const kosuuinput = document.createElement('input');
        kosuuinput.type = 'number';
        kosuuinput.name = `kosuu_${item.id}`;
        kosuuinput.min = '1';
        kosuuinput.value = '1';
        kosuuinput.style.width = '50px';
        kosuuinput.style.marginLeft = '12px';

        label.appendChild(checkbox);
        label.appendChild(textNode);
        label.appendChild(kosuuinput);

        menu.appendChild(label);
    });
}

shopSelect.addEventListener('change', updateMenu);
updateMenu();

function getData(){
    const selectedShop = shopSelect.value;
    const selectedtimeslot = document.getElementById('time-slot-select').value;

    const selectedItems = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(check =>{
        const itemid = check.value;
        const inputid = `kosuu_${itemid}`;

        const inputElement = document.getElementById(inputid);

        if(inputElement){
            const quantity = inputElement.value;
            selectedItems.push({
                itemid:itemid,
                quantity:Number(quantity)
            });
        }
    });

    const postdata = {
        shop:selectedShop,
        timeslot:Number(selectedtimeslot),
        items:selectedItems
    };

    console.log("送信データ:", postdata);
    return postdata
}