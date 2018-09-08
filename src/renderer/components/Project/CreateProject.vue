<template>
  <div class="create-project">
    <h2 class="route-header">
      <label class="small-header">You are creating a</label>
      New Project
    </h2>
    <div class="create-container">
      <div class="create-content">
        <h4>STEP {{ step }} of {{ stepNum }}</h4>
        <transition :name="slideType">
          <div v-if="step === 1" class="step">
            <div class="header">
              <h1>What type of project are you starting?</h1>
              <p>A project can be single or continual.</p>
            </div>
            <div class="input-group btn-group">
              <button class="btn-category admin" @click="selectProjectType('continual')">
                <font-awesome-icon :icon="['far', 'glasses']" />
                <label class="btn-label">Continual</label>
                <p class="btn-example">Ex. Support Tickets, Process</p>
              </button>
              <button class="btn-category creative" @click="selectProjectType('single')">
                <font-awesome-icon :icon="['far', 'palette']" />
                <label class="btn-label">Single</label>
                <p class="btn-example">Ex. Website & Logo Design</p>
              </button>
              <button class="btn-category other" @click="selectProjectType('other')">
                <font-awesome-icon :icon="['far', 'tasks']" />
                <label class="btn-label">Other</label>
                <p class="btn-example">Ex. Anything!</p>
              </button>
            </div>
          </div>
        </transition>
        <transition :name="slideType">
          <div v-if="step === 2" class="step">
            <div class="header">
              <h1>What is the goal of your project?</h1>
              <p>What would it take to see this project as completed.</p>
            </div>
            <div class="input-group row-column">
              <input v-model="goal" class="input" placeholder="Project Goal" type="text">
            </div>
          </div>
        </transition>
        <transition :name="slideType">
          <div v-if="step === 3" class="step">
            <div class="header">
              <h1>Describe your project!</h1>
              <p>In a few words explain your project as if you are talking to a stranger.</p>
            </div>
            <div class="input-group row-column">
              <textarea v-model="description" class="input-area" placeholder="Describe Your Project" type="text"></textarea>
            </div>
          </div>
        </transition>
        <transition :name="slideType">
          <div v-if="step === 4" class="step">
            <div class="header">
              <h1>Name your project and make it unique!</h1>
              <p>Click the icon to adjust the icon and background color.</p>
            </div>
            <div class="input-group row-center">
              <div class="icon-container" @click="thumbnailEdit = true">
                <inline-popup-container v-if="thumbnailEdit" v-click-outside="closeThumbnailEdit">
                  <div class="slot-obj">
                    <icon-picker :icon="icon" v-on:update:icon="icon = $event"></icon-picker>
                  </div>
                  <div class="slot-obj">
                    <color-picker :main-color="iconColor" v-on:update:color="iconColor = $event"></color-picker>
                  </div>
                  <div class="slot-obj">
                    <color-picker :main-color="backgroundColor" v-on:update:color="backgroundColor = $event"></color-picker>
                  </div>
                </inline-popup-container>
                <div class="background" :style="'background-color:' + backgroundColor + ';'">
                  <font-awesome-icon :color="iconColor" class="icon" :icon="['far', icon]" />
                </div>
              </div>
              <input v-model="name" class="input" placeholder="Project Name" type="text">
            </div>
          </div>
        </transition>
        <div v-if="step === 1" style="height:57px;width:100%;"></div>
        <div v-if="step > 1 && step < stepNum" class="btn-group">
          <button :disabled="false" class="btn back" @click="back()">Back</button>
          <button :disabled="false" class="btn" @click="next()">Next</button>
        </div>
        <div v-if="step === stepNum" class="btn-group">
          <button :disabled="false" class="btn back" @click="back()">Back</button>
          <button :disabled="false" class="btn" @click="createProject()">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InlinePopupContainer from '../Misc/InlinePopupContainer'
  import ColorPicker from '../Misc/ColorPicker'
  import IconPicker from '../Misc/IconPicker'
  export default {
    name: 'create-project',
    components: { InlinePopupContainer, ColorPicker, IconPicker },
    data () {
      return {
        forward: true,
        prevFor: true,
        direction: 'left',
        stepNum: 4,
        step: 1,
        thumbnailEdit: false,
        projectType: '',
        iconColor: '#cacaca',
        backgroundColor: '#333',
        icon: 'tasks',
        goal: '',
        description: '',
        name: '',
        timeout: null
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      slideType () {
        if (this.direction === 'left') {
          return 'slideleft'
        } else {
          return 'slideright'
        }
      }
    },
    methods: {
      createProject () {
        this.$store.dispatch('createProject', {
          name: this.name,
          description: this.description,
          goal: this.goal,
          type: this.projectType,
          icon: this.icon,
          iconColor: this.iconColor,
          iconBkg: this.backgroundColor
        }).then((response) => {
          console.log(response)
          this.$router.push({
            path: '/project/' + response.key + '/home'
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      selectProjectType (val) {
        this.projectType = val
        this.next()
      },
      next () {
        this.prevFor = this.forward
        this.forward = true
        this.setDirection('next')
        this.step += 1
      },
      back () {
        this.prevFor = this.forward
        this.forward = false
        this.setDirection('back')
        this.step -= 1
      },
      closeThumbnailEdit () {
        this.thumbnailEdit = false
      },
      setDirection (dir) {
        let that = this
        clearTimeout(this.timeout)
        if (this.forward !== this.prevFor) {
          if (this.forward) {
            // SHOULD MAKE EVERYTHING GO LEFT
            // this.timeout = setTimeout(function () {
            that.direction = 'left'
            // }, 10)
          } else {
            // SHOULD MAKE EVERYTHING GO RIGHT
            // this.timeout = setTimeout(function () {
            that.direction = 'right'
            // }, 10)
          }
        } else {
          if (dir === 'next') {
            this.direction = 'left'
          } else {
            this.direction = 'right'
          }
        }
      }
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
.create-project {
  // display:flex;
  // flex-direction:column;
  .create-container {
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    display:flex;
    justify-content: center;
    align-items: center;
    .create-content {
      width:100%;
      height:100%;
      display:flex;
      justify-content: center;
      align-items:center;
      flex-direction:column;
      position:relative;
      .step {
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction:column;
        position:absolute;
        width:100%;
        height:300px;
        padding-top:89px;
        .header {
          position:absolute;
          top:0;
          text-align:center;
        }
      }
      h1 {
        margin:0px;
        color:$black;
      }
      h4 {
        font-weight:300;
        color:$light-grey;
        position:absolute;
        top:15%;
      }
      p {
        color:$grey;
      }
      .btn-group {
        width:75%;
        display:flex;
        justify-content: center;
        position:absolute;
        bottom:15%;
        .btn {
          margin-left:5px;
          margin-right:5px;
        }
      }
      .input-group {
        width:75%;
        .input {
          height:75px;
          width:75%;
          // background-color:red;
          background:transparent;
          outline:none;
          border:none;
          border-bottom:4px solid $dark-blue;
          font-size:32px;
          color:$black;
        }
        .input:focus {
          outline:none;
          border-color:$orange;
        }
        .input:focus::-webkit-input-placeholder {
          color:$white;
        }
        .input::-webkit-input-placeholder {
          color:$dark-blue;
        }
        .input-area {
          border:4px solid $dark-blue;
          border-radius:10px;
          font-size:18px;
          padding:20px;
          width:75%;
          height:200px;
          line-height:25px;
        }
        .input-area:focus {
          outline:none;
          border-color:$orange;
        }
        .input-area:focus::-webkit-input-placeholder {
          color:white;
        }
        .input-area::-webkit-input-placeholder {
          color:$dark-blue;
          font-weight:600;
        }
      }
      .row-center {
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction:row;
        input {
          margin:5px;
        }
      }
      .row-column {
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        input {
          margin-bottom:10px;
        }
      }
      .btn {
        background-color:$yellow;
        padding:20px;
        width:15%;
        border-radius:10px;
        color:$white;
        font-weight:600;
        display:flex;
        justify-content: center;
        align-items:center;
        cursor:pointer;
        border:none;
        font-size:16px;
      }
      .back {
        background-color:$light-grey;
      }
      .back:hover {
        background-color:darken($light-grey,2%) !important;
      }
      .btn:hover {
        background-color:darken($yellow, 2%);
      }
      .btn:focus {
        outline:none;
      }
      .btn:disabled {
        background-color:$light-grey;
        cursor:pointer;
      }
      .btn-category {
        height:175px;
        width:200px;
        margin:5px;
        border:none;
        border-radius:10px;
        cursor:pointer;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        svg {
          font-size:32px;
        }
        .btn-label {
          font-weight:600;
          font-size:28px;
          margin-top:10px;
        }
        .btn-example {
          font-size:12px;
        }
      }
      .creative {
        background-color:$yellow;
        color:$white;
        svg {
          color:$orange;
        }
        .btn-example {
          color:$yellow-lighter;
        }
      }
      .creative:hover {
        background-color:darken($yellow, 2%);
      }
      .admin {
        background-color:$dark-blue;
        color:$white;
        svg {
          color:$light-blue;
        }
        .btn-example {
          color:$dark-blue-lighter;
        }
      }
      .admin:hover {
        background-color:darken($dark-blue, 6%);
      }
      .other {
        background-color:$light-grey;
        color:$grey;
        svg {
          color:$white;
        }
        .btn-example {
          color:lighten($light-grey, 15%);
        }
      }
      .other:hover {
        background-color:darken($light-grey, 4%);
      }
      .icon-container {
        margin-right:20px;
        position:relative;
        border:4px dashed $light-grey;
        cursor:pointer;
        padding:5px;
        border-radius:15px;
        .background {
          height:100px;
          width:100px;
          border-radius:15px;
          display:flex;
          justify-content: center;
          align-items:center;
          .icon {
            width:40px;
            height:40px;
          }
        }
      }
      .icon-container:hover {
        border-color:$orange;
      }
    }
  }
}

.slideright-enter-active, .slideright-leave-active, .slideleft-enter-active, .slideleft-leave-active {
  // transition: transform $msDelay * 2 ease-in-out 0ms;
  transition: transform 1000ms ease-in-out 0ms;
}
.slideright-enter-to {
  transform:translate(0px, 0px);
}
.slideright-leave {
  transform:translate(0px, 0px);
}
.slideright-enter {
  transform:translate(-1000px, 0px);
}
.slideright-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform:translate(1000px, 0px);
}

.slideleft-enter-to {
  transform:translate(0px, 0px);
}
.slideleft-leave {
  transform:translate(0px, 0px);
}
.slideleft-enter {
  transform:translate(1000px, 0px);
}
.slideleft-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform:translate(-1000px, 0px);
}
</style>