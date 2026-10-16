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

