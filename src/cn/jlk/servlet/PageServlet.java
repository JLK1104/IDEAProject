package cn.jlk.servlet;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet(urlPatterns = "/PageServlet")
public class PageServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //分页处理前有几个核心的操作参数 ：cp,ls,col,kw
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        int currentPage=1; //当前所在页
        int lineSize=10;  //每页显示行数
        String column= null; //模糊查询的列
        String keyword =null;//模糊查询关键字
        String columnData="部门编号:deptno|部门姓名:dname|部门位置:loc";
        try {
            currentPage =Integer.parseInt(request.getParameter("cp"));
            lineSize = Integer.parseInt(request.getParameter("ls"));
        }catch (Exception e){}
        column= request.getParameter("col");
        keyword=request.getParameter("kw");
        if (column==null|| "".equals(column)){
            column="dname";
        }
        if (keyword==null){
            keyword="";
        }

        System.out.println("【分页参数】："+"cp:"+currentPage+"、ls:"+lineSize+"、col:"+column+"、kw:"+keyword);
        //以下的数据应该都是通过数据库查询得来的，通过业务层得来
        JSONObject all=new JSONObject();
        all.put("allRecorders",880);//总记录数
        JSONArray jsa=new JSONArray();//保存所有的部门数据
        for (int x=currentPage*lineSize;x<currentPage*lineSize+10;x++){
           JSONObject obj=new JSONObject();
           obj.put("deptno",x);
           obj.put("dname","jlk-"+x);
           jsa.add(obj);
        }
        all.put("allDepts",jsa);
        all.put("columnData",columnData);//作为下拉列表内容存在
        all.put("column",column);
        all.put("keyword",keyword);
        response.getWriter().print(all);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}


