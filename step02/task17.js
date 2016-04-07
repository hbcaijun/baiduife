/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  document.getElementById("form-gra-time").addEventListener("RadioStateChange",function(event){
      if(event.target.nodeName.toLowerCase() == "input"　&& event.target.checked == true){
        pageState.nowGraTime = event.target.value;
    }
  });



}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city = document.getElementById("city-select");
  for (var tmp in aqiSourceData){
    var optionAdd = document.createElement("option");
    optionAdd.text = tmp;
    city.add(optionAdd,null);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  document.getElementById("city-select").addEventListener("change",function(event){
      if(event.target.nodeName.toLowerCase() == "select"){
        // console.log(event.target.selectedIndex);
        pageState.nowSelectCity = event.target.selectedIndex;
    }
  });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  pageState.nowSelectCity = 0;
  pageState.nowGraTime = "month";
  if(pageState.nowGraTime == "day"){
    chartData = aqiSourceData[Object.keys(aqiSourceData)[pageState.nowSelectCity]];
  }
  if(pageState.nowGraTime == "week"){
    var weekData = aqiSourceData[Object.keys(aqiSourceData)[pageState.nowSelectCity]];
    var weekSum = 0;
    var day = 0;
    var week =0;
    for (prop in weekData){
      var dat = new Date(prop);
      if (dat.getDay()<6){
        weekSum += weekData[prop];
        day++;

      }
      if(dat.getDay() == 6){
        weekSum += weekData[prop];
        day++;
        week++;
        chartData["第"+ week + "周"] = Math.ceil(weekSum/day);
        console.log(chartData);
        day = 0;
        weekSum = 0;
      }
    }
    week++;
    chartData["第"+ week + "周"] = Math.ceil(weekSum/day);
  }
  if(pageState.nowGraTime == "month"){
    var monthData = aqiSourceData[Object.keys(aqiSourceData)[pageState.nowSelectCity]];
    console.log(monthData[Object.keys(monthData).length])
    var monthSum = 0;
    var day = 0;
    var month = 1;
    for (prop in monthData){
      var dat = new Date(prop);
      if (dat.getMonth() < month){
        monthSum += monthData[prop];
        day++;
        if(monthData[Object.keys(monthData).length-1] == prop){
            chartData["第"+ month + "月"] = Math.ceil(monthSum/day);
        }
      }
      if(dat.getMonth() == month){
        chartData["第"+ month + "月"] = Math.ceil(monthSum/day);
        console.log(chartData);
        day = 1;
        month++;
        monthSum = monthData[prop];
      }
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
initAqiChartData();
