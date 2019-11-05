var jsCommonCp=1;//默认当前所在页
var jsCommonLs=10;//默认行数
var jsCommonCol="";
var jsCommonKw ="";

function createSearchBar(data) { //创建搜索组件
    jsCommonCol=data.column;//当前使用的模糊查询列
    jsCommonKw=data.keyword;//当前使用的模糊查询关键字
    clearSearchBar();
    addColumnBar(data.columnData);
    addSearchText(jsCommonKw,data.allRecorders);
}

function addColumnBar(columnData) {
    var result=columnData.split("|");
    for(var x=0;x<result.length;x++){
        var temp= result[x].split(":");
        if (jsCommonCol==temp[1]){
            $("#col").append("<option value=\""+temp[1]+"\" selected>"+temp[0]+"</option>");
        }else{
            $("#col").append("<option value=\""+temp[1]+"\">"+temp[0]+"</option>");
        }
    }
}
function addSearchText(keyword,allRecorders) {
    $("#SearchDIV").append("<input type=\"text\" id=\"kw\" value=\""+keyword+"\">");
    var butObj=$("<input type=\"button\" value=\"检索\">");
    butObj.on("click",function () {
        jsCommonCol=$("#col").val();
        jsCommonKw=$("#kw").val();
        loadData();
    });
    $("#SearchDIV").append(butObj);

    $("#SearchDIV").append("<div>一共查询到的数据总数为："+allRecorders+"</div>");
}
function clearSearchBar() {
    $("#SearchDIV").empty();
    $("#SearchDIV").append("<select id=\"col\"></select>");
}