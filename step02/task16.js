/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var index = 0;





/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

  var city = document.getElementById("aqi-city-input").value.trim();
  var air = document.getElementById('aqi-value-input').value.trim();
  aqiData[city] = air;
  if(!city.match(/[a-zA-Z\u4e00-\u9fa5]+$/)){
      delete aqiData[city];
      alert("please input characters for city");
  }
  if(!air.match(/\d+$/)){
      delete aqiData[city];
      alert("please input number for air");
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

var list = document.getElementById("aqi-table");
while(list.hasChildNodes()){
  list.removeChild(list.childNodes[0]);
}

var rowhead =document.createElement("thead");
rowhead.innerHTML = "<th>城市</th><th>空气质量</th><th>刪除</th>";
list.appendChild(rowhead);

for (tmp in aqiData){
  var row =document.createElement("tr");
  row.innerHTML = "<td>" + tmp +"</td><td>" + aqiData[tmp] + "</td><td><button class=\"btn btn-danger\">刪除</button></td>";
  row.className = tmp;
  list.appendChild(row);
}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(prop) {
  // do sth.
  delete aqiData[prop];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
// document.getElementById("add-btn").addEventListener("click", addAqiData);
document.getElementById("add-btn").addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
document.getElementById("aqi-table").addEventListener("click",function(event){
  if(event.target && event.target.nodeName.toLowerCase()== "button"){
    var rmprop = event.target.parentNode.parentNode.className;
    delBtnHandle(rmprop);
  }
})

}

window.onload = function(){
  init();
}
