<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登陆</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登陆</el-button>
      <a class="register" @click="handleRegister">注册</a>
    </el-form>
    <div>
      <!-- 注册表单 -->
      <el-dialog title="注册" :visible.sync="regVisible" :fullscreen="true" width="50%" class="reg">
        <div>
          <span></span>
        </div>
        <el-form :model="registerFormData" :rules="rules" ref="registerForm" label-position="left">
          <!-- 用户账号 -->
          <el-form-item class="item" label="账号" prop="userAccount">
            <el-input style="color:#222;" v-model="registerFormData.userAccount"></el-input>
          </el-form-item>
          <!-- 用户姓名 -->
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="registerFormData.userName"></el-input>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item label="性别" prop="userSex">
            <el-radio-group v-model="registerFormData.userSex">
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 电话 -->
          <el-form-item label="电话" prop="phone">
            <el-input v-model="registerFormData.phone"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerFormData.email"></el-input>
          </el-form-item>
          <!-- 身份证 -->
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model="registerFormData.idCard"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerFormData.password"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerFormData.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 积分金额 -->
          <el-form-item label="积分金额" prop="frontScore">
            <el-input v-model="registerFormData.frontScore"></el-input>
          </el-form-item>
          <!-- 账号或者手机号 -->
          <el-form-item label="账号或者手机号" prop="loginAccount">
            <el-input v-model="registerFormData.loginAccount"></el-input>
          </el-form-item>

          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="regVisible = false">取消</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { addCustomer } from "@/api/user";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerFormData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "wzm",
        password: "123456"
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      },
      // 注册
      regVisible: false,
      registerFormData: {
        checkPass: "",
        userAccount: "",
        userName: "",
        userSex: "",
        phone: "",
        email: "",
        idCard: "",
        password: "",
        frontScore: "",
        loginAccount: "",
        isAdmin: "1"
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      rules: {
        userAccount: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11个字符", trigger: "blur" }
        ],
        userSex: [
          { required: true, message: "请选择用户性别", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        frontScore: [
          {
            required: true,
            message: "请输入从前台获取的积分金额",
            trigger: "blur"
          },
          { min: 1, message: "最少为一位数 ", trigger: "blur" }
        ],
        loginAccount: [
          { required: true, message: "请输入账号或者手机号", trigger: "blur" },
          { min: 1, max: 11, message: "长度在1 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    // 注册
    handleRegister() {
      this.regVisible = true;
    },
    onSubmit() {
      if (this.registerFormData.userSex == "男") {
        this.registerFormData.userSex = "1";
      } else {
        this.registerFormData.userSex = "0";
      }
      console.log(this.registerFormData);
      debugger;
      addCustomer(this.registerFormData).then(response => {
        this.$notify({
          title: "成功",
          type: "success",
          message: response.msg
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 31px;
    color: #454545;
  }
}
</style>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container .el-input input {
  color: #222;
}
.login-container .el-input input {
  background: transparent;
  // background-color: rgba(34, 34, 34, 0.3);
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  /* color: #fff; */
  height: 47px;
  caret-color: #222;
}
.register {
  float: right;
  font-size: 0.75rem;
  margin-top: -1rem;
  color: #94abb8;
}

.register:active {
  color: #fff;
}
.login-container {
  min-height: 100%;
  // width: 100%;
  // background-color: $bg;
  background: url(https://www.booktrust.org.uk/globalassets/images/illustrations/jim-smith-5-8/jpegs/jim-smith-best-new-books-16x9.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 600px;
    max-width: 100%;
    padding: 173px 100px 12px;
    margin: 24px auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: $light_gray;
      margin: 188px auto 44px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.reg .el-dialog__header {
  margin: auto;
}
.reg {
  padding: 33px 22px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  width: 50%;
  margin: auto;
}
.reg .el-dialog__body {
  // width: 80%;
  margin: auto;
  background: url(https://thumbs.dreamstime.com/b/black-white-open-book-9670507.jpg)
    no-repeat;
  background-size: 100%;
  // z-index: 3;
}
.reg .el-input {
  background: transparent;
  width: 60%;
  // background-color: rgba(34, 34, 34, 0.3);
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  // padding: 12px 5px 12px 15px;
  /* color: #fff; */
  height: 47px;
  caret-color: #222;
}
.reg .el-dialog__header {
  text-align: center;
}
.reg .el-dialog__title {
  color: orange;
  font-size: 3rem;
  font-weight: bold;
}
.reg .el-button--primary {
  background: orange;
  border: none;
}
.reg .el-form-item label {
  color: orange;
  text-align: right;
}
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 31px;
  color: #454545;
}
</style>
