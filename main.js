var app = new Vue({
    el:'#app',
    data:{
        navlistInit:0,  //分类下标
        sortMethdsIndex:0,    // 筛选方法下标  
        navList:[
            {id:0,value:'推荐'},
            {id:1,value:'母婴'},
            {id:2,value:'鞋包饰品'},
            {id:3,value:'食品'},
            {id:4,value:'数码家电'},
            {id:5,value:'居家百货'}
        ],
        sortList:[
            {index:0,value:'综合排序',method:'setList'},
            {index:1,value:'销量优先',method:'sortSale'},
            {index:2,value:'价格',method:'sortPrice'}
        ],
        goods: [
            {
                id: 1001,//id
                name: 'Beats EP头戴式耳机',
                price: 558,//单价
                type: 4,//种类
                stock: 128,//库存
                sales: 1872,//销量
                img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
            }, {
                id: 1002,
                name: '雀巢（Nestle）高钙成人奶粉',
                price: 60,
                type: 3,
                stock: 5,
                sales: 2374,
                img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
            }, {
                id: 1003,
                name: '煎炒烹炸一锅多用',
                price: 216,
                type: 5,
                stock: 2,
                sales: 351,
                ishot: true,
                img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
            }, {
                id: 1004,
                name: 'ANNE KLEIN 潮流经典美式轻奢',
                price: 585,
                type: 2,
                stock: 465,
                sales: 8191,
                ishot: true,            
                img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
            }, {
                id: 1005,
                name: '乐高EV3机器人积木玩具',
                price: 3099,
                type: 1,
                stock: 154,
                sales: 165,
                img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
            }, {
                id: 1006,
                name: '全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112',
                price: 10967,
                type: 2,
                stock: 12,
                sales: 6,
                img: 'https://m.360buyimg.com/n1/s220x220_jfs/t1429/17/1007119837/464370/310392f4/55b5e5bfN75daf703.png!q70.jpg'
            }, {
                id: 1007,
                name: 'Kindle Paperwhite3 黑色经典版电纸书',
                price: 805,
                type: 4,
                stock: 3,
                sales: 395,
                img: 'http://img12.360buyimg.com/n1/s528x528_jfs/t4954/76/635213328/51972/ec4a3c3c/58e5f717N4031d162.jpg!q70.jpg'
            }, {
                id: 1008,
                name: 'DELSEY 男士双肩背包',
                price: 269,
                type: 2,
                stock: 18,
                sales: 69,
                ishot: true,
                img: 'http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png'
            }, {
                id: 1009,
                name: '荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g',
                price: 89,
                type: 1,
                stock: 36,
                sales: 1895,
                img: 'http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp'
            }, {
                id: 1010,
                name: '【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋',
                price: 19.9,
                type: 3,
                stock: 353,
                sales: 3041,
                ishot: true,
                img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3169/228/5426689121/95568/d463e211/586dbf56N37fcd503.jpg!q50.jpg'
            }, {
                id: 1011,
                name: '正品FENDI/芬迪女包钱包女长款 百搭真皮钱夹 女士小怪兽手拿包',
                price: 3580,
                type: 2,
                stock: 5,
                sales: 18,
                img: 'http://img.alicdn.com/imgextra/i3/TB16avCQXXXXXcsXpXXXXXXXXXX_!!0-item_pic.jpg_400x400q60s30.jpg_.webp'
            }
        ],
        list:[]
    },
    filter:{
        totMoney:function (value){
            return value.toFixed(3);
        }
    },
    created: function () {
        this.setList()
    },
    methods:{
        /**
         * 选择分类
         */
        toggleNavList:function(index){
            this.navlistInit = index;
            var sortMethodsIndex2 = this.sortMethdsIndex;
            this.setList();
            var methodObj = this.sortList[sortMethodsIndex2];
            this.sortMethods(methodObj);
        },

        compare: function (prop, type) {
            type = type || 'desc';

            var flag1, flag2;
            if (type === 'desc') {
                flag1 = -1;
                flag2 = 1;
            } else if (type === 'asc') {
                flag1 = 1;
                flag2 = -1;
            }

            return function (obj1, obj2) {
                var val1 = obj1[prop],
                    val2 = obj2[prop];

                if (val2 < val1) {
                    return flag1;
                } else if (val2 > val1) {
                    return flag2;
                } else {
                    return 0;
                }
            }
        },
        sortMethods:function(item){
            this.sortMethdsIndex = item.index;
            this[item.method]();
        },

        /**
         * 综合排序
         */
        setList:function(){
            this.list = this.goods.filter((good)=>{
                return this.navlistInit!==0 ? good.type == this.navlistInit : good
            });
        },

        /**
         *  销量排序
         */
        sortSale:function(){
            this.list.sort(this.compare('sales'))

        },

        /**
         * 价格排序
         */
        sortPrice:function(){
            this.list.sort(this.compare('price'))
        },
        addToCar:function(good){
            var goodList = Car.goodsInCar; //购物车的产品列表
            var newaarr = goodList.findIndex((item)=>{
                return item.id == good.id
            })
            var arrlength = goodList.length;
            if (newaarr == -1){
                
                goodList.push(good);
                Car.$set(goodList[arrlength], 'quantity', 1)
                Car.$set(goodList[arrlength], 'checked', true)

            }else{
                var arr = goodList[newaarr];
                arr.quantity++;
                if (arr.quantity >= good.stock){
                    arr.quantity = good.stock
                }
            }

            Car.checkGood()
            
        }

    },
    
})


var Car = new Vue({
    el:'#shoppingcar',
    data:{
        btnCondition:true,
        goodsInCar:[],
        checkAllBool:false,
    },
    filters: {
        totMoney: function (value) {
            return value.toFixed(2);
        }
    },
    computed: {
        allMoney: function(){
                var totCar = 0;
                this.goodsInCar.map((item)=>{
                    if(item.checked){
                        totCar += item.quantity*item.price;
                    }
                })
                
            return totCar;
        },
        checkGoodNum: function(){
            var num = 0;
            this.goodsInCar.map((item)=>{
                if (item.checked){
                    num++;
                }
              
            })
            return num
        },
       
    },
    methods:{
        checkAll:function (){

            this.goodsInCar.map((item)=>{
                this.checkAllBool ? item.checked = true : item.checked = false
                
            })
        },
        changeQuantity:function (good,type){
            if(type > 0){
                good.quantity>=good.stock ? good.quantity = good.stock : good.quantity++;
            }else{
                good.quantity <= 1 ? good.quantity = 1 : good.quantity--;
            }
        },

        checkGood:function (){
            
            var boor = this.goodsInCar.findIndex((item)=>{
                return item.checked == false
            })
            boor == -1 ? this.checkAllBool = true : this.checkAllBool = false;


        },
        delGood:function (){

            this.goodsInCar= this.goodsInCar.filter(function(item){
                return item.checked === false;
            });
            this.checkAllBool = false

        },
        finish:function(){
            this.btnCondition=!this.btnCondition;
        }
        
    }

})