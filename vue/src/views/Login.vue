<template>
  <div>
    <div class="con-header">
      <span>青趣Mall</span>
      <i>--只为小白的你</i>
    </div>
    <div class="con-login">
      <div style="flex: 1; padding: 50px">
        <img
          src="../assets/image/打折促销.png"
          alt=""
          style="width: 100%; margin-top: 40px"
        />
      </div>
      <div style="flex: 1; padding: 50px">
        <div class="form-title">
          <b
            :class="{ active: activeToggle === 'username' }"
            @click="toggle('username')"
          >
            欢迎登录
          </b>
          <b
            :class="{ active: activeToggle === 'phone' }"
            style="margin-left: 15px"
            @click="toggle('phone')"
          >
            手机号登录
          </b>
        </div>

        <!-- 欢迎登录 -->
        <el-form
          ref="userForm"
          :model="userForm"
          :rules="userFormRules"
          v-if="activeToggle === 'username'"
          key="userForm"
          status-icon
        >
          <el-form-item prop="username">
            <el-input
              v-model="userForm.username"
              prefix-icon="el-icon-user"
              size="medium"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="userForm.password"
              prefix-icon="el-icon-lock"
              size="medium"
              show-password
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <div style="text-align: right; margin: 10px 0">忘记密码</div>
          <div>
            <el-button
              type="primary"
              size="medium"
              style="width: 100%"
              @click="login"
            >
              登录
            </el-button>
          </div>
          <div style="text-align: right; margin: 10px 0">
            <a href="/register" style="color: var(--orangeRed)">立即注册</a>
          </div>
        </el-form>

        <!-- 手机号登录 -->
        <el-form
          ref="phoneForm"
          :model="phoneForm"
          v-else
          :rules="phoneFormRule"
          key="phoneForm"
          status-icon
        >
          <el-form-item prop="phone">
            <el-input
              v-model="phoneForm.phone"
              prefix-icon="el-icon-user"
              size="medium"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="VerfiCcode">
            <div style="display: flex">
              <el-input
                v-model="phoneForm.VerfiCcode"
                prefix-icon="el-icon-circle-check"
                size="medium"
                placeholder="验证码"
                style="flex: 2"
              ></el-input>
              <el-button
                size="medium"
                style="flex: 1; margin-left: 7px"
                @click="sendMsM"
                :disabled="count > 0"
              >
                <span v-if="count > 0">{{ count }} 正在发送</span>
                <span v-else>获取验证码</span>
              </el-button>
            </div>
          </el-form-item>
          <div>
            <el-button
              type="primary"
              size="medium"
              style="width: 100%"
              @click="login"
            >
              登录
            </el-button>
          </div>
          <div style="text-align: right; margin: 10px 0">
            <a href="/register" style="color: var(--orangeRed)">立即注册</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',

  data() {
    let reg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    let validatorPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确手机号'));
      } else {
        callback();
      }
    };
    let validatorCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    let validatorUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    let validatorPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        username: '',
        password: ''
      },
      phoneForm: {
        phone: '',
        VerfiCcode: ''
      },
      rules: {},
      // 校验规则
      userFormRules: {
        username: [{ validator: validatorUsername, trigger: 'blur' }],
        password: [{ validator: validatorPassword, trigger: 'blur' }]
      },
      phoneFormRule: {
        phone: [{ validator: validatorPhone, trigger: 'blur' }],
        VerfiCcode: [{ validator: validatorCode, trigger: 'blur' }]
      },
      activeToggle: 'username', //小坑：变量名不能和方法名一样
      count: 0
    };
  },
  methods: {
    toggle(active) {
      //   this.userForm = {};
      //   this.phoneForm = {};
      this.activeToggle = active;
    },
    sendMsM() {
      this.count = 5;
      let Interval = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          clearInterval(Interval);
        }
      }, 1000);
    },
    login() {
      console.log(1111);
      if (this.activeToggle === 'username') {
        //validate方法进行表单预验证,valid参数表示表单是否通过验证，通过为true,不通过为false
        this.$refs.userForm.validate(async valid => {
          console.log(valid);
          //判断valid是否为true,如果为true执行以下操作,如果为false，则不发起请求
          if (!valid) return;
          if (
            this.userForm.username === 'hello' &&
            this.userForm.password === '123456'
          ) {
            this.$message.success('登录成功');
          } else {
            this.$message.error('用户名密码错误');
          }
          //   console.log(this.userForm.username, this.userForm.password);
        });
      } else {
        //validate方法进行表单预验证,valid参数表示表单是否通过验证，通过为true,不通过为false
        this.$refs.phoneForm.validate(async valid => {
          console.log(valid);
          //判断valid是否为true,如果为true执行以下操作,如果为false，则不发起请求
          if (!valid) return;
          if (
            this.phoneForm.phone === '18989364491' &&
            this.phoneForm.VerfiCcode === '123456'
          ) {
            this.$message.success('登录成功');
          } else {
            if (this.phoneForm.phone !== '18989364491') {
              this.$message.error('手机号输入错误');
            }else if (this.phoneForm.VerfiCcode !== '123456') {
              this.$message.error('验证码输入错误');
            }
          }
          //   console.log(this.phoneForm.phone, this.phoneForm.VerfiCcode);
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.con-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid var(--orangeRed);
  padding-left: 50px;
  color: var(--orangeRed);
  span {
    font-size: 20px;
    font-weight: bold;
  }
  i {
    margin-left: 20px;
  }
}
.con-login {
  width: 50%;
  box-shadow: 0 0 10px -2px cornflowerblue;
  display: flex;
  margin: 150px auto;
  border-radius: 10px;
}
.form-title {
  margin: 20px 0;
  text-align: center;
  b {
    font-size: 20px;
    cursor: pointer;
  }
}
.active {
  color: var(--orangeRed);
}
</style>
