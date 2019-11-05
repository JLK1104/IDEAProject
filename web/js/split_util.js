var jsCommonCp=1;//默认当前所在页
var jsCommonLs=10;//默认行数
var PageSize=null;//总页数 定义为全局变量
//创建分页条
function createSplitBar(data){
   calcPageSize(data.allRecorders);//创建分页条之前，首先需要计算总页数
   clearBar();//清空原来的内容，避免重复出现
   LastPage();
   var send=3;//定义一个种子数
    addBar(1);//第一页和最后一页一定要出现
    if (jsCommonCp>send*2){ //第七页 超出预期才会出现
        addDetailPageBar();//增加省略页
        var startBar=jsCommonCp-2;//起始页
        var endBar=jsCommonCp+2;//结束页
        for (var x=startBar;x<=endBar;x++){
            if (x<PageSize){
                addBar(x);
            }
        }
        if (jsCommonCp+send*2<PageSize){//表示前面还有很多页
            addDetailPageBar();
        }
    }else{ //没有超出预期
        for (var x=2;x<=send*2+1;x++){
            if (x<PageSize){
                addBar(x);
            }
        }
    }
    addBar(PageSize);//最后一页一定出现
   NextPage();
}
function calcPageSize(allRecorders) { //计算总页数
     if (allRecorders==0){ //现在没有任何记录
        PageSize=1; //保持1页
     }else{
        //计算总页数的时候一定要考虑到小数点的问题
        PageSize=parseInt((allRecorders + jsCommonLs - 1) / jsCommonLs);
     }
}

function addBar(index) { //增加页码函数
     var liObj=$("<li></li>");
     var aObj=$("<a style='cursor: pointer'>"+index+"</a>");

     if (jsCommonCp==index){//当前所在页为选中状态
        liObj.addClass("active");

     }else{
        aObj.on("click",function () {//表示要进行其他页面的加载
           jsCommonCp=index;//当前页更改
           loadData();//重新加载数据
        });
     }
     liObj.append(aObj);
     $(".pagination").append(liObj);
}
function LastPage() {
   var liObj=$("<li></li>");
   var aObj=$("<a style='cursor: pointer'>上一页</a>");

   if (jsCommonCp==1){ //当前所在页为第一页
      liObj.addClass("disabled");

   }else{
      aObj.on("click",function () {//表示要进行其他页面的加载
         jsCommonCp--;//当前页更改
         loadData();//重新加载数据
      });
   }
   liObj.append(aObj);
   $(".pagination").append(liObj);
}
function NextPage() {
   var liObj=$("<li></li>");
   var aObj=$("<a style='cursor: pointer'>下一页</a>");

   if (jsCommonCp==PageSize){ //当前所在页为最后一页
      liObj.addClass("disabled");

   }else{
      aObj.on("click",function () {//表示要进行其他页面的加载
         jsCommonCp++;//当前页更改
         loadData();//重新加载数据
      });
   }
   liObj.append(aObj);
   $(".pagination").append(liObj);
}
function addDetailPageBar(){ //为分页条增加...控制 增加省略页
    $(".pagination").append("<li><span>...</span></li>");
}

function clearBar() {//进行原有分页内容的清空
   $("#splitBarDIV").empty(); //清空已有的内容
   $("#splitBarDIV").append("<ul class=\"pagination\"></ul>");
}