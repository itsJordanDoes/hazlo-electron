<template>
  <div class="boards-view">
    <div class="board-bar">
      <button>Grid</button>
      <button>Freeform</button>
      <div @click="activeBoard(i)" :id="i" :class="['board-btn', active_board === i ? 'active' : '']" v-for="board, i in boards">{{ board.name }}</div>
      <button @click="log()">Log</button>
    </div>
    <div v-if="active_board" class="board">
      <div v-for="el, i in board.elements" :data-x="el.position.dataX" :data-y="el.position.dataY" :style="elementStyle(i)" class="element">
        <div v-if="el.type === 'container'">
          <div v-if="filters(el, card)" v-for="card, i in cards">{{ card.name }}</div>
        </div>
        <div v-if="el.type === 'pin'">Pin</div>
        <div v-if="el.type === 'card'">Card</div>
      </div>
    </div>
  </div>
</template>

<script>
  import interact from 'interactjs'
  // import { mapGetters } from 'vuex'
  export default {
    name: 'boards-view',
    components: { },
    methods: {
      log () {
        let board = this.boards[this.active_board]
        let elements = board.elements
        let elementIds = Object.keys(board.elements)
        elementIds.forEach((id) => {
          console.log(elements[id].type)
        })
      },
      filters (el, card) {
        let filters = el.filters
        // let fields = card.fields
        let filterKeys = Object.keys(filters)
        filterKeys.forEach((key) => {
          // ( key: filters[key] )
          // let ruleKeys = Object.keys(filters[key])
          console.log(key)
        })
        return true
      },
      elementStyle (i) {
        let board = this.boards[this.active_board]
        let element = board.elements[i]
        let style = ''
        let x = element.position.dataX
        let y = element.position.dataY
        let width = element.position.width
        let height = element.position.height
        if (x && y) {
          style += 'transform: translate(' + x + 'px, ' + y + 'px);'
        }
        if (width) {
          style += 'width:' + width + ';'
        }
        if (height) {
          style += 'height:' + height + ';'
        }
        let styles = Object.keys(element.custom)
        styles.forEach((s) => {
          style += s.toString() + ':' + element.custom[s] + ';'
        })
        return style
      },
      activeBoard (i) {
        this.active_board = i
      },
      dataTranslate (i) {
        var card = this.cards[i]
        var x = card.boards[this.active_board].dataX
        var y = card.boards[this.active_board].dataY
        if (!x || !y) {
          return ''
        } else {
          return 'data-x:' + x + ';data-y:' + y + ';transform: translate(' + x + 'px, ' + y + 'px);'
        }
      }
    },
    computed: {
      board () {
        return this.boards[this.active_board]
      }
    },
    mounted () {
      var that = this
      interact('.card').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: '.canvas',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        // autoScroll: true,
        onend: function (event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
          var settings = that.cards[event.target.id].boards[that.active_board]
          settings.dataX = x
          settings.dataY = y
        },
        onmove: function (event) {
          // console.log(event)
          var target = event.target
          // console.log(event.target.id)
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // update the element's style
          // target.style.width = event.rect.width + 'px'
          // target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          // x += event.deltaRect.left
          // y += event.deltaRect.top

          target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      })
      // interact('.col').dropzone({
      //   // only accept elements matching this CSS selector
      //   accept: '.card',
      //   // Require a 75% element overlap for a drop to be possible
      //   overlap: 'pointer',

      //   // listen for drop related events:

      //   ondropactivate: function (event) {
      //     // add active dropzone feedback
      //     // event.target.classList.add('drop-active')
      //   },
      //   ondragenter: function (event) {
      //     // var draggableElement = event.relatedTarget
      //     // var dropzoneElement = event.target
      //     // console.log(event.target)

      //     // feedback the possibility of a drop
      //     // dropzoneElement.classList.add('drop-target')
      //     // draggableElement.classList.add('can-drop')
      //     // draggableElement.textContent = 'Dragged in'
      //   },
      //   ondragleave: function (event) {
      //     // remove the drop feedback style
      //     // event.target.classList.remove('drop-target')
      //     // event.relatedTarget.classList.remove('can-drop')
      //     // event.relatedTarget.textContent = 'Dragged out'
      //   },
      //   ondrop: function (event) {
      //     // event.relatedTarget.textContent = 'Dropped'
      //     console.log(event.target.id)
      //     // var element = event.relatedTarget
      //     var key = event.relatedTarget.id
      //     var stage = event.target.id
      //     that.cards[key].stage = stage
      //     // element.style = null
      //     // element.removeAttribute('data-x')
      //     // element.removeAttribute('data-y')
      //     // element.removeAttribute('translate')
      //     // element.removeAttribute('transform')
      //   },
      //   ondropdeactivate: function (event) {
      //     // remove active dropzone feedback
      //     // event.target.classList.remove('drop-active')
      //     // event.target.classList.remove('drop-target')
      //   }
      // })
    },
    data () {
      return {
        active_board: '',
        pins: {
          'pin-1': {
            type: 'note',
            value: 'This is a pin!'
          }
        },
        cards: {
          'card-1': {
            name: 'Card 1',
            fields: {
              'Phase': {
                type: 'option',
                value: 'Todo',
                options: [
                  'Todo',
                  'In Progress',
                  'Done'
                ]
              },
              'Webpage': {
                type: 'link',
                value: 'http://google.com'
              },
              'Revisions': {
                type: 'integer',
                value: 12
              }
            }
          },
          'card-2': {
            name: 'Card 2',
            fields: {
              'Phase': {
                type: 'option',
                value: 'In Progress',
                options: [
                  'Todo',
                  'In Progress',
                  'Done'
                ]
              },
              'Main Link': {
                type: 'link',
                value: 'http://yahoo.com'
              },
              'Revisions': {
                type: 'integer',
                value: 6
              }
            }
          },
          'card-3': {
            name: 'Card 3',
            fields: {
              'Phase': {
                type: 'option',
                value: 'Todo',
                options: [
                  'Todo',
                  'In Progress',
                  'Done'
                ]
              },
              'Webpage': {
                type: 'link',
                value: 'http://google.com'
              },
              'Revisions': {
                type: 'integer',
                value: 8
              }
            }
          },
          'card-4': {
            name: 'Card 4',
            fields: {
              'Phase': {
                type: 'option',
                value: 'Done',
                options: [
                  'Todo',
                  'In Progress',
                  'Done'
                ]
              },
              'Webpage': {
                type: 'link',
                value: 'http://google.com'
              },
              'Revisions': {
                type: 'integer',
                value: 0
              }
            }
          }
        },
        boards: {
          'board-1': {
            name: 'Board 1',
            elements: {
              'el-1': {
                type: 'container',
                filters: {
                  'AND': {
                    'Phase': {
                      type: 'exact',
                      value: 'Todo'
                    }
                  },
                  'OR': {
                    'Revisions': {
                      type: 'greater_than',
                      value: 6
                    }
                  }
                },
                position: {
                  dataX: 0,
                  dataY: 0,
                  width: '300px',
                  height: '500px'
                },
                custom: {
                  'background-color': 'blue'
                }
              },
              'el-2': {
                type: 'pin',
                id: 'pin-1',
                position: {},
                custom: {
                  'background-color': 'red'
                }
              },
              'el-3': {
                type: 'card',
                id: 'card-4',
                position: {},
                custom: {
                  'background-color': 'green'
                }
              }
            },
            settings: {
              grid: false
            }
          },
          'board-2': {
            name: 'Board 2',
            settings: {
              grid: false
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.boards-view {
  height:100%;
  width:100%;
  display:flex;
  flex-direction: column;
  .board-bar {
    width:100%;
    height:50px;
    border:1px solid red;
    display:flex;
    flex-direction:row;
    .board-btn {
      display:flex;
      justify-content: center;
      align-items:center;
      width:100px;
      height:100%;
      background-color:#cacaca;
      color:blue;
      cursor:pointer;
    }
    .active {
      background-color:greenyellow !important;
    }
  }
  .board {
    height:100%;
    width:auto;
  }
}
</style>