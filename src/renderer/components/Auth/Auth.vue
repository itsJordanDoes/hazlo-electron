<template>
  <div class="auth-container">
    <h1>HAZLO</h1>
    <div v-if="error" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-if="view === 'login'" class="login">
      <div class="input-group">
        <input class="input-field" placeholder="Email" v-model.trim="userEmail" type="email">
      </div>
      <div class="input-group">
        <input class="input-field" placeholder="Password" v-model.trim="userPassword" type="password">
        <a @click="changeView('reset')">Reset Your Password</a>
      </div>
      <div class="submit btn" @click="login()">SIGN IN</div>
      <div class="register btn" @click="changeView('register')">REGISTER</div>
    </div>
    <div v-if="view === 'register'" class="register">
      <div class="input-group">
        <input :class="['input-field',validateEmail ? '' : 'required', error ? 'input-error' : '']" placeholder="Email" v-model.trim="registerEmail" type="email">
        <div class="error" v-if="!validateEmail">No funny business here.. only real emails.</div>
      </div>
      <div class="input-group">
        <input :class="['input-field',validatePasswordLength ? '' : 'required']" placeholder="Create Password" v-model.trim="registerPassword" type="password">
        <div class="error" v-if="!validatePasswordLength">Your password has to be more than 6 characters (its just a generally good idea).</div>
      </div>
      <div class="input-group">
        <input :class="['input-field',validatePasswordMatch ? '' : 'required']" placeholder="Confirm Password" v-model.trim="confirmPassword" type="password">
        <div class="error" v-if="!validatePasswordMatch">Passwords don't match.. bummer</div>
      </div>
      <div class="submit btn" @click="register()">REGISTER</div>
      <div class="register btn" @click="changeView('login')">GO BACK</div>
    </div>
    <div v-if="view === 'reset'" class="reset">
      Reset
    </div>
    <div class="verify" v-if="!user.verified && view === 'verify'">
      <div class="input-group">
        <input class="input-field" placeholder="Name" v-model.trim="userName" type="text">
      </div>
      <div class="input-group">
        <multiselect placeholder="Interests" v-model="interests" :options="interestOptions" :multiple="true"></multiselect>
      </div>
      <div class="submit btn" @click="$store.dispatch('sendEmailVerification')">RESEND VERIFICATION EMAIL</div>
      <div class="register btn" @click="logout()">LOGOUT</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    components: { },
    methods: {
      changeView (view) {
        this.view = view
      },
      logout () {
        var that = this
        this.$store.dispatch('logoutUser').then(function (response) {
          console.log(response)
          that.view = 'login'
          that.error = true
          that.errorMessage = 'Successfully Logged Out!'
          that.reset()
        }).catch(function (error) {
          console.log(error)
        })
      },
      login () {
        var that = this
        this.$store.dispatch('authUserWithLogin', {
          email: this.userEmail,
          password: this.userPassword
        }).then(function (response) {
          if (!response.emailVerified) {
            that.view = 'verify'
            that.error = true
            that.errorMessage = 'We just sent you an email verification! Please follow those instructions to continue. Before you check, tell us a little bit about yoursel!.'
          }
        }).catch(function (err) {
          that.error = true
          that.errorMessage = err.message
        })
      },
      register () {
        var e = this.validateEmail
        var p = this.validatePasswordLength
        var m = this.validatePasswordMatch
        var that = this
        if (e && p && m) {
          this.$store.dispatch('registerUser', {
            email: this.registerEmail,
            password: this.registerPassword
          }).then(function (response) {
            console.log(response)
            that.view = 'verify'
            that.$store.dispatch('sendEmailVerification')
          }).catch(function (error) {
            // console.log(error)
            that.error = true
            that.errorMessage = error.message
          })
        } else {
          this.error = true
          if (!e) { this.errorMessage += 'Not a valid email!' }
          if (!p) { this.errorMessage += ' Password Length needs to be longer!' }
          if (!m) { this.errorMessage += ' Passwords don\'t match! Try again!' }
        }
      },
      reset () {
        this.view = 'login'
        this.userEmail = ''
        this.userPassword = ''
        this.registerEmail = ''
        this.registerPassword = ''
        this.confirmPassword = ''
        this.interests = []
        this.userName = ''
      }
    },
    computed: {
      validateEmail () {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(this.registerEmail).toLowerCase())
      },
      validatePasswordLength () {
        return this.registerPassword.length > 5
      },
      validatePasswordMatch () {
        return this.registerPassword === this.confirmPassword && this.registerPassword.length > 5
      },
      user () {
        return this.$store.getters.user
      }
    },
    mounted () {
    },
    data () {
      return {
        error: false,
        view: 'login',
        userEmail: '',
        userPassword: '',
        registerEmail: '',
        registerPassword: '',
        confirmPassword: '',
        interests: [],
        interestOptions: ['Startup', 'Marketing', 'Blogging', 'Art', 'Consulting', 'Social Media'],
        userName: ''
      }
    },
    watch: {
      'registerEmail': function () {
        this.error = false
        this.errorMessage = ''
      },
      'userEmail': function () {
        this.error = false
        this.errorMessage = ''
      }
    }
  }
</script>
<style lang="scss">
@import "../../sass/settings.scss";
// Colors
$background: $light-blue;
$input: lighten($light-blue,10%);
$button-color: $orange;
$highlight-color: $orange;
$font-color:white;
$input-height:50px;
$tag-color: $orange;
.auth-container {
  background: radial-gradient($background, darken($background, 15%));
  height:100%;
  width:auto;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  .login, .register, .reset, .verify {
    max-width:400px;
    width:65%;
    h1 {
      text-align:center;
      color:$font-color;
    }
    h2 {
      text-align:center;
      color:$font-color;
    }
    .input-group {
      width:100%;
      display:flex;
      flex-direction: column;
      justify-content: left;
      margin-bottom:10px;
      label {
          font-size:14px;
          color:$font-color;
          margin-bottom:5px;
      }
      .input-field {
          width:auto;
          font-size:18px;
          color:$font-color;
          height:$input-height;
          border-radius:5px;
          border:none;
          padding-left:10px;
          padding-right:10px;
          box-shadow:2px 5px 0px darken($input, 25%);
          background-color: lighten($input,5%);
          border:2px solid white;
      }
      .input-field:focus {
        outline:none;
      }
      .input-field::placeholder {
          color:lighten($input, 50%);
          opacity: 1;
      }
      .required {
        border:2px solid $highlight-color;
      }
      .error {
          margin-top: 10px;
          font-size:10px;
          font-style: italic;
          color:white;
      }
      .input-error {
        border:2px solid $yellow;
        color: $yellow;
      }
      .multiselect__select {
        height:100%;
      }
      .multiselect__select:before {
        color:$font-color;
        border-color:$font-color transparent transparent;
      }
      .multiselect__tags {
        min-height:$input-height;
        font-size:18px;
        color:$font-color;
        border-radius:5px;
        border:none;
        padding-left:10px;
        padding-right:10px;
        box-shadow:2px 5px 0px darken($input, 25%);
        background-color: lighten($input,5%);
        border:2px solid white;
        .multiselect__tag {
          background:$tag-color;
          .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
            background:darken($tag-color,10%);
          }
        }
        .multiselect__single {
          background:none;
        }
        .multiselect__input {
          background:none;
        }
      }
      .multiselect__content-wrapper {
        font-size:18px;
        color:$font-color;
        background-color: lighten($input,5%);
        .multiselect__option--highlight {
          background:$tag-color;
          color:white;
        }
        .multiselect__option--highlight:after {
          background:$tag-color;
          color:white;
        }
      }
    }
    .btn {
      height:50px;
      width:100%;
      border-radius:5px;
      display:flex;
      justify-content: center;
      align-items:center;
      cursor:pointer;
      font-weight:bold;
      font-size:16px;
      margin-bottom:10px;
    }
    .submit {
      background-color:$button-color;
      box-shadow:2px 5px 0px darken($button-color, 25%);
      color:white;
    }
    .register {
      background-color:$dark-blue;
      box-shadow:2px 5px 0px darken($dark-blue, 25%);
      color:white;
    }
  }
  .error-message {
    background-color: $yellow;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 2px solid $orange;
    color: darken($orange, 25%);
    width:65%;
  }
}
</style>