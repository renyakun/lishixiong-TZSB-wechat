const province = ["不限", "北京市", "上海市", "天津市", "广东省", "江苏省", "浙江省", "重庆市", "安徽省", "福建省", "甘肃省", "广西省",
  "贵州省", "海南省", "河北省", "黑龙江省", "河南省", "湖北省", "湖南省", "江西省", "吉林省", "辽宁省", "内蒙古自治区",
  "宁夏回族自治区", "青海省", "山东省", "山西省", "陕西省", "四川省", "天津市", "新疆维吾尔自治区", "西藏藏族自治区", "云南省", "香港特别行政区",
  "澳门特别行政区", "台湾省", "海外"
];

const municipal = [
  ["不限"],
  ["北京市"],       
  ["上海市"],  
  ["天津市"],       
  ["广州", "深圳", "珠海", "东莞", "中山", "佛山", "惠州", "河源", "潮州", "江门", "揭阳", "茂名", "梅州", "清远", "汕头", "汕尾", "韶关", "顺德", "阳江", "云浮", "湛江", "肇庆"],       
  ["南京", "常熟", "常州", "海门", "淮安", "江都", "江阴", "昆山", "连云港", "南通", "启东", "沭阳", "宿迁", "苏州", "太仓", "泰州", "同里", "无锡", "徐州", "盐城", "宜兴", "仪征", "张家港", "镇江", "周庄"],       
  ["杭州", "安吉", "慈溪", "定海", "奉化", "海盐", "黄岩", "湖州", "嘉兴", "金华", "临安", "临海", "丽水", "宁波", "瓯海", "平湖", "千岛湖", "衢州", "江山", "瑞安", "绍兴", "嵊州", "台州", "温岭", "温州", "余姚", "舟山"],       
  ["万州", "涪陵", "渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "黔江", "长寿", "綦江", "潼南", "铜梁", "大足", "荣昌", "璧山", "梁平", "城口", "丰都", "垫江", "武隆", "忠县", "开县", "云阳", "奉节", "巫山", "巫溪", "石柱", "秀山", "酉阳", "彭水", "江津", "合川", "永川", "南川"],       
  ["合肥", "安庆", "蚌埠", "亳州", "巢湖", "滁州", "阜阳", "贵池", "淮北", "淮南", "黄山", "九华山", "六安", "马鞍山", "宿州", "铜陵", "屯溪", "芜湖", "宣城"],       
  ["福州", "厦门", "泉州", "漳州", "龙岩", "南平", "宁德", "莆田", "三明"],       
  ["兰州", "白银", "定西", "敦煌", "甘南", "金昌", "酒泉", "临夏", "平凉", "天水", "武都", "武威", "西峰", "张掖"],       
  ["南宁", "百色", "北海", "桂林", "防城港", "贵港", "河池", "贺州", "柳州", "钦州", "梧州", "玉林"],       
  ["贵阳", "安顺", "毕节", "都匀", "凯里", "六盘水", "铜仁", "兴义", "玉屏", "遵义"],       
  ["海口", "儋县", "陵水", "琼海", "三亚", "通什", "万宁"],       
  ["石家庄", "保定", "北戴河", "沧州", "承德", "丰润", "邯郸", "衡水", "廊坊", "南戴河", "秦皇岛", "唐山", "新城", "邢台", "张家口"],       
  ["哈尔滨", "北安", "大庆", "大兴安岭", "鹤岗", "黑河", "佳木斯", "鸡西", "牡丹江", "齐齐哈尔", "七台河", "双鸭山", "绥化", "伊春"],       
  ["郑州", "安阳", "鹤壁", "潢川", "焦作", "济源", "开封", "漯河", "洛阳", "南阳", "平顶山", "濮阳", "三门峡", "商丘", "新乡", "信阳", "许昌", "周口", "驻马店"],       
  ["武汉", "恩施", "鄂州", "黄冈", "黄石", "荆门", "荆州", "潜江", "十堰", "随州", "武穴", "仙桃", "咸宁", "襄阳", "襄樊", "孝感", "宜昌"],       
  ["长沙", "常德", "郴州", "衡阳", "怀化", "吉首", "娄底", "邵阳", "湘潭", "益阳", "岳阳", "永州", "张家界", "株洲"],       
  ["南昌", "抚州", "赣州", "吉安", "景德镇", "井冈山", "九江", "庐山", "萍乡", "上饶", "新余", "宜春", "鹰潭"],       
  ["长春", "吉林", "白城", "白山", "珲春", "辽源", "梅河", "四平", "松原", "通化", "延吉"],       
  ["沈阳", "鞍山", "本溪", "朝阳", "大连", "丹东", "抚顺", "阜新", "葫芦岛", "锦州", "辽阳", "盘锦", "铁岭", "营口"],       
  ["呼和浩特", "阿拉善盟", "包头", "赤峰", "东胜", "海拉尔", "集宁", "临河", "通辽", "乌海", "乌兰浩特", "锡林浩特"],       
  ["银川", "固源", "石嘴山", "吴忠"],       
  ["西宁", "德令哈", "格尔木", "共和", "海东", "海晏", "玛沁", "同仁", "玉树"],       
  ["济南", "滨州", "兖州", "德州", "东营", "菏泽", "济宁", "莱芜", "聊城", "临沂", "蓬莱", "青岛", "曲阜", "日照", "泰安", "潍坊", "威海", "烟台", "枣庄", "淄博"],       
  ["太原", "长治", "大同", "侯马", "晋城", "离石", "临汾", "宁武", "朔州", "沂州", "阳泉", "榆次", "运城"],       
  ["西安", "安康", "宝鸡", "汉中", "渭南", "商州", "绥德", "铜川", "咸阳", "延安", "榆林"],       
  ["成都", "巴中", "达川", "德阳", "都江堰", "峨眉山", "涪陵", "广安", "广元", "九寨沟", "康定", "乐山", "泸州", "马尔康", "绵阳", "眉山", "南充", "内江", "攀枝花", "遂宁", "汶川", "西昌", "雅安", "宜宾", "自贡", "资阳"],        
  ["乌鲁木齐", "阿克苏", "阿勒泰", "阿图什", "博乐", "昌吉", "东山", "哈密", "和田", "喀什", "克拉玛依", "库车", "库尔勒", "奎屯", "石河子", "塔城", "吐鲁番", "伊宁"],       
  ["拉萨", "阿里", "昌都", "林芝", "那曲", "日喀则", "山南"],       
  ["昆明", "大理", "保山", "楚雄", "东川", "个旧", "景洪", "开远", "临沧", "丽江", "六库", "潞西", "曲靖", "思茅", "文山", "西双版纳", "玉溪", "中甸", "昭通"],       
  ["香港", "九龙", "新界"],       
  ["澳门"],       
  ["台北", "基隆", "台南", "台中", "高雄", "屏东", "南投", "云林", "新竹", "彰化", "苗栗", "嘉义", "花莲", "桃园", "宜兰", "台东", "金门", "马祖", "澎湖"],       
  ["俄罗斯", "美国", "日本", "英国", "法国", "德国", "澳大利亚", "东南亚", "阿拉伯半岛", "非洲", "南美洲"]
];

module.exports = {
  province,
  municipal
}