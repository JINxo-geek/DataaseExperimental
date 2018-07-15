

<template>
  <div id="app">
      <p style= "text-align: center;">供货商表</p>
  <el-table :data="tableData" border style="width: 100%">

     <el-table-column type="selection" width="55">
    </el-table-column>
 <el-table-column
  prop="Supnumber"
  label="供货商编码"
  width="180">
 </el-table-column>
 <el-table-column
  prop="Supname"
  label="供货商名称"
  width="180">
 </el-table-column>
 <el-table-column
  prop="Supadress"
  label="供货商地址">
 </el-table-column>
 <el-table-column
 prop="Supphone"
 label="供货商电话"
 >
 </el-table-column>

 <el-table-column label="操作">
      <template slot-scope="scope">
            <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

    </el-table>

    <el-button @click="dialogFormVisible = true" style="margin-left: 23%;margin-top: 3%;">添加供货商</el-button>
    <el-button id="shuaxin" @click="fun2()" style="margin-left: 30%;margin-top: 3%;">刷新数据</el-button>


    <el-dialog title="添加供货商" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="供货商编号" :label-width="formLabelWidth">
      <el-input v-model="form.supcode" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="供货商名称" :label-width="formLabelWidth">
      <el-input v-model="form.supname" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="供货商地址" :label-width="formLabelWidth">
      <el-input v-model="form.supadress" auto-complete="off"></el-input>
    </el-form-item>
            <el-form-item label="供货商电话" :label-width="formLabelWidth">
      <el-input v-model="form.supphone" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="button" @click="fun3()">添加</el-button>
  </div>
</el-dialog>


  </div>
</template>
<script>
export default {
  methods: {
    //删除表格
          handleDelete(index, row) {
        console.log(index, row);
        console.log(row.Supnumber);
this.axios.post('http://127.0.0.1:8080/despur',row)
.then(function() {
console.log("删除");
$("#shuaxin").click();
})
.catch(function(error) {
console.log(error);
});
},
        


fun1:function(){

            this.dialogFormVisible = false;
              this.axios.get("http://127.0.0.1:8080/insert").then(body => { alert(body);
        $("#shuaxin").click();
              })
                
  },
fun2:function(){

      this.axios.get("http://127.0.0.1:8080/search").then(body => {this.tableData = body.data;});
},

fun3:function(){
this.dialogFormVisible = false;
this.axios.post('http://127.0.0.1:8080/insert',this.form)
.then(function() {
console.log("接受成功");
$("#shuaxin").click();
})
.catch(function(error) {
console.log(error);
});
}
  },

    mounted() {
    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
  this.axios.get("http://127.0.0.1:8080/search").then(body => {this.tableData = body.data;});
                                                     
        },

  data() {
    return {

      tableData: null,
       dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          supcode: '',
          supname: '',
          supadress: '',
          supphone: '',
        },
        formLabelWidth: '120px'
    };
  }
};
</script>





