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
    const selectedshop = shopSelect.ariaValueMax;
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

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(item.name));

        menu.appendChild(label);
    });
}

shopSelect.addEventListener('change', updateMenu);
updateMenu();