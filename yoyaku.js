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