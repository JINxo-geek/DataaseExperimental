

<template>
  <div id="app">
      <p style= "text-align: center;">药品表</p>
  <el-table :data="tableData" border style="width: 100%">

     <el-table-column type="selection" width="55">
    </el-table-column>
 <el-table-column
  prop="Gname"
  label="药品名称"
  width="180">
 </el-table-column>
 <el-table-column
  prop="Gkind"
  label="药品分类"
  width="180">
 </el-table-column>
 <el-table-column
  prop="Gtype"
  label="药品剂型">
 </el-table-column>
 <el-table-column
 prop="Gprice"
 label="药品单价"
 >
 </el-table-column>
 <el-table-column
 prop="Gshelf"
 label="药品保质期"
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

    <el-button @click="dialogFormVisible = true" style="margin-left: 23%;margin-top: 3%;">添加药品</el-button>
    <el-button id="shuaxin" @click="fun2()" style="margin-left: 30%;margin-top: 3%;">刷新数据</el-button>


    <el-dialog title="添加药品" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="药品名称" :label-width="formLabelWidth">
      <el-input v-model="form.Gname" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="药品分类" :label-width="formLabelWidth">
      <el-input v-model="form.Gkind" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="药品剂型" :label-width="formLabelWidth">
      <el-input v-model="form.Gtype" auto-complete="off"></el-input>
    </el-form-item>
            <el-form-item label="药品单价" :label-width="formLabelWidth">
      <el-input v-model="form.Gprice" auto-complete="off"></el-input>
    </el-form-item>
              <el-form-item label="药品保质期" :label-width="formLabelWidth">
      <el-input v-model="form.Gshelf" auto-complete="off"></el-input>
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
        console.log(row.Gname);
this.axios.post('http://127.0.0.1:8080/degoods',row)
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
              this.axios.get("http://127.0.0.1:8080/insertgoods").then(body => { alert(body);
        $("#shuaxin").click();
              })
                
  },
fun2:function(){

      this.axios.get("http://127.0.0.1:8080/searchgoods").then(body => {this.tableData = body.data;});
},

fun3:function(){
this.dialogFormVisible = false;
this.axios.post('http://127.0.0.1:8080/insertgoods',this.form)
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
  this.axios.get("http://127.0.0.1:8080/searchgoods").then(body => {this.tableData = body.data;});
                                                     
        },

  data() {
    return {

      tableData: null,
       dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          Gname: '',
          Gkind: '',
          Gtype: '',
          Gprice: '',
          Gshelf: '',
        },
        formLabelWidth: '120px'
    };
  }
};
</script>





