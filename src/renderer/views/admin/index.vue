<template>
<div id="body">
  <div class="dashboard-container">
<div id='menu'>
  <h2>修改</h2>
  <p>TEST</p>
<!--   <input type='password' id='one'><br>
  <input type='password' id='two'><br>
  <button id='button'>Change</button> -->

   <div class="jz" style="">
<el-form size="small"  popper-class="my-autocomplete" :model="ruleForm2" status-icon label-position="top"  :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
   
   <el-form-item label="选择库位">
    <el-select v-model="ruleForm2.kw" placeholder="请选择库位">
      <el-option label="库位一" value="kname1"></el-option>
      <el-option label="库位二" value="kname2"></el-option>
       <el-option label="库位三" value="kname3"></el-option>
      <el-option label="库位四" value="kname4"></el-option>
       <el-option label="库位五" value="kname5"></el-option>
      <el-option label="库位六" value="kname6"></el-option>
      <el-option label="库位七" value="kname7"></el-option>
    </el-select>
</el-form-item>

<el-col>
      <el-form-item label="修改仓库名称">
    <el-input v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
<!--   <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm2.age"></el-input>
  </el-form-item> -->
  <br/>
   <br/>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
  </el-col>

</el-form>
</div>
</div>
  </div>
  
  </div>

</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
          kw:'',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
.el-input__inner {
    width:70%;
}
.el-form-item__label{
        font-size: 26px;
    color: white;
}
.el-form-item__error {
    color: #f56c6c;
    font-size: 18px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 108px;
}
</style> 
<style scoped>

 #body{
  height: 100vh;
  margin: 0;
  background: linear-gradient(45deg,#0267C1,#00AFB5);
  background-size: cover;
}

#menu{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 800px;
  display: table;
  margin:auto;
  background-color: #212121;
  opacity: .75;
  text-align: center;
  color: white;
  font-size: 50px;
  box-shadow: 0px 0px 23px 2px black;
}
h2{
  font-size: .6em;
  margin-top: 10px;
  margin-bottom: 0px;
  font-weight: 100;
}

p{
  font-size: .5em;
  font-weight: 100;
  margin: 0;
}


/* input{
  margin-top: none;
  margin: 0 auto;
  background-color: transparent;
  border: none;
  width: 60%;
  border-bottom: 1px solid black;
  text-align: center;
  font-size: .5em;
  color: white;
}

input:focus{
  outline: none;
  border-bottom: 1px solid white;
  color: #00bcd4;
}

button{
  margin-top: none;
  margin: 0 auto;
  background-color: transparent;
  border: none;
  width: 60%;
  border: 1px solid black;
  text-align: center;
  font-size: .5em;
  color: white;
}

button:focus{
  outline: white;
}  */
</style>
