

<template>
  <div id="app">
      <p style= "text-align: center;">供货商表</p>
  <el-table :data="tableData" border="true" style="width: 100%">

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
  label="供货商地址地址">
 </el-table-column>
 <el-table-column
 prop="Supphone"
 label="供货商电话"
 >
 </el-table-column>

    </el-table>

    <el-button @click="dialogFormVisible = true" style="margin-left: 23%;margin-top: 3%;">添加供货商</el-button>
    <el-button id="shuaxin" @click="fun2()" style="margin-left: 30%;margin-top: 3%;">刷新数据</el-button>


    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="fun1()">添加</el-button>
  </div>
</el-dialog>


  </div>
</template>
<script>
export default {
  methods: {
fun1:function(){

            this.dialogFormVisible = false;
              this.axios.get("http://127.0.0.1:8080/insert").then(body => { alert(body);
        $("#shuaxin").click();
              })
                
  },
fun2:function(){

      this.axios.get("http://127.0.0.1:8080/search").then(body => {this.tableData = body.data;});
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  }
};
</script>





