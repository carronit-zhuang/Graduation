<template>
<div>
  <div class="layout">
    <header>
      <span class="score">总分：{{score}}</span>
      <button class="star" @click="init">开始/重设 游戏</button>
      <!-- <span class="sd"></span> -->
    </header>
    <div class="all-container">
      <div class="background">
        <span v-for="item in 16" :key="item.index"></span>
      </div>
      <div class="container" id="container">
        <span
          class="list"
          v-for="(e,index) in rocks"
          v-show="e"
          :key="index"
          :style="`
            zIndex: ${e?e.num:0};
            transform: translate(${cssTransition(e)});
          `">
          <span
            class="inner"
            :id="`r${e&&e.id}`"
            :style="`backgroundColor: ${e ? e.color : ''}`">
            {{e? e.num:''}}
          </span>
        </span>
      </div>
    </div>
      <div class="space"></div>
      <recommand-box style="width:100%;"></recommand-box>
      <div class="space"></div>
  </div>
</div>
</template>


<script>
  import recommand from '../subcomponents/recommand_game.vue'
    const pointSort = property => (firstRocks, secondRocks) => {
    const firstPoint = firstRocks[property];
    const secondPoint = secondRocks[property];
    return firstPoint < secondPoint ? -1 : 1;
  };
  const delay = ms => new Promise(res => setTimeout(res, ms));
  export default {
    data() {
      return {
        msg:'',
        score:0,
        rocks: [],
        color: {
          2: "#eee4da",
          4: "#ede0c8",
          8: "#f2b179",
          16: "#f59563",
          32: "#f67c5f",
          64: "#f65e3b",
          128: "#edcf72",
          256: "#edcc61",
          512: "#0444BF",
          1024: "#A79674",
          2048: "#282726",
          4096: "#280b21",
          8192: "#281d04"
        },
        directX: 30,
      };
    },
    mounted() {
      window.app = this;
      this.init();
      const container = document.getElementById('container')
      container.addEventListener("keydown", e => {
        switch (e.key.toLocaleUpperCase ()){
          case "ARROWRIGHT":
            this.turn('right');
            break;
          case "ARROWLEFT":
            this.turn('left');
            break;
          case "ARROWDOWN":
            this.turn('down');
            break;
          case "ARROWUP":
            this.turn('up');
            break;
        }
      });
      container.addEventListener('touchstart',(start)=>{  //touchstart 和 touchmove
        const moveFunc = (move) => {
          move && move.preventDefault();//阻止滚动。
          const dx = move.touches[0].clientX -  start.touches[0].clientX;
          const dy = move.touches[0].clientY -  start.touches[0].clientY;
          if(dx> this.directX){
            this.turn('right');
            container.removeEventListener('touchmove',moveFunc)
          }else if(dx<-this.directX){
            this.turn('left');
            container.removeEventListener('touchmove',moveFunc)
          }else if(dy>this.directX){
            this.turn('down');
            container.removeEventListener('touchmove',moveFunc)
          }else if(dy<-this.directX){
            this.turn('up');
            container.removeEventListener('touchmove',moveFunc)
          }
        }
        container.addEventListener('touchmove',moveFunc)
        container.addEventListener('touchend',()=>{
          container.removeEventListener('touchmove',moveFunc)
        })
      })

    },
     components: {
       // 2.用来注册子组件的节点
       'recommand-box': recommand
    },
    methods: {
      isMobile() {
        return window.navigator.userAgent.match(/Mobile/)
      },
      cssTransition(e) {
        if(this.isMobile()){
          return `${(e?e.x:0) * 23.5}vw, ${(e?e.y:0) * 23.5}vw`
        }else {
          return `${(e?e.x:0) * 120}px, ${(e?e.y:0) * 120}px`
        }
      },
      //初始化所有记录块
      init(){
        this.score = 0;
        this.initRocks();
      },
      //初始化数字块
      initRocks(){
        this.rocks = [];
        this.add();
        this.add();
      },
      //生成2/4数字(4出现的概率为10%)
      random24() {
        return Math.random()>0.9 ? 4 : 2;
      },
      //生成0/1/2/3数字做为坐标
      random0123() {
        return Math.floor(Math.random() * 4);
      },

      /**
       * 创建一个不存在数字块
       * return rock
       */
      createRock() {
        const num = this.random24();
        const result = {
          x: this.random0123(),
          y: this.random0123(),
          num: num,
          id: this.rocks.length + 1,
          color: this.color[num]
        };
        const _isExist = this.getRockByPoint({
          x: result.x,
          y: result.y
        });
        if (_isExist){
          return this.createRock();
        } else {
          return result;
        }
      },

      /**
       * 是否游戏失败
       * return true失败，反之没有结束
       */
      //除去最下最右层的部分，剩下的拿出来和相邻的比较，看相邻是否存在方块且数值是否相等。
      isGameOver() {
        const result = this.isFull() && this.rocks
            .filter(e=>e && (e.x!==3 || e.y !==3))
            .find(e=>{
              const nextX = this.getRockByPoint({x:e.x+1, y:e.y});
              const nextY = this.getRockByPoint({x:e.x, y:e.y+1});
              return (e.num === (nextX&&nextX.num) ||
                e.num === (nextY&&nextY.num));
            });
        return result === undefined;
      },

      /**
       * 游戏是否过关
       * return true过关，反之未过关
       */
      isSuccess(){
        const result = this.rocks
          .find(e=>{
            return e && e.num === 8192;
          });
        return result !== undefined;
      },

      /**
       * 罗盘是否已经填充满了
       */
      isFull() {
        return this.rocks.filter(e => e).length > 15;
      },

      /**
       * 随机添加1个数字块
       */
      add(){
        if(this.isFull()) {
          return false;
        }else {
          const rock = this.createRock();
          this.rocks.push(rock);
        }
      },
      /**
       * 通过坐标获取数字块
       * @param x
       * @param y
       * @returns {undefined|T|T}
       */
      getRockByPoint({ x, y }) {
        return this.rocks
          .filter(rock => rock)
          .find(rock => rock.x === x && rock.y === y);
      },
      getIndex(id) {
        return this.rocks.findIndex(rock => rock && rock.id === id);
      },

      handleDirect(direct) {
        if(direct === 'right'){
          return {
            handleArr: arr => arr
              .filter(e => e && e.x !== 3)
              .sort(pointSort("x"))
              .reverse(),
            handleCondition: e => e.x < 3,
            next: e =>({ x: e.x + 1, y: e.y }),
            handleMove: e => e.x++
          }
        } else if(direct === 'left'){
          return {
            handleArr: arr => arr
              .filter(e => e && e.x !== 0)
              .sort(pointSort("x")),
            handleCondition: (e) => e.x > 0,
            next: (e)=>({ x: e.x - 1, y: e.y }),
            handleMove(e){e.x--}
          }
        } else if(direct === 'up'){
          return {
            handleArr: arr => arr
              .filter(e => e && e.y !== 0)
              .sort(pointSort("y")),
            handleCondition: (e) => e.y > 0,
            next: (e)=>({ x: e.x, y: e.y - 1 }),
            handleMove(e){e.y--}
          }
        } else if(direct === 'down'){
          return {
            handleArr: arr => arr
              .filter(e => e && e.y !== 3)
              .sort(pointSort("y"))
              .reverse(),
            handleCondition: (e) => e.y < 3,
            next: (e)=>({ x: e.x, y: e.y + 1 }),
            handleMove(e) {e.y++}
          }
        }
      },
      // 移动
      turn(direct) {
        this.rocks.forEach(e => e&&(e.canCalc = true));
        Promise.all(
          this.handleDirect(direct).handleArr(this.rocks)
            .filter(rock => rock)
            .map(async e => {
              var flag = this.calcAxis({ e ,direct});
              return flag;
            })
        ).then(res => {
          if (res.indexOf(true) > -1) {
            if(this.isSuccess()){
              mui.toast('您通关了，真棒！');
              return;
            }else {
              this.add();
            }
          } else {
            if(this.isGameOver()){
              mui.toast('游戏结束！请重新开始吧');
              return;
            }else if(this.isSuccess()){
              mui.toast('您通关了，真棒！');
              return;
            }
          }
          setTimeout(() => {
          }, 10);
        });
      },
      /**
       * 合并数字块时添加移动样式
       * @param next
       */
      async mergeNumericBlockAddStyle(next){
        const nextDom = await document.getElementById(`r${next.id}`);
        nextDom.animate([
          { transform: 'scale(0.95)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1.03)' },
          { transform: 'scale(1)' }
        ], {
          duration: 200,
        });
      },
      // 处理移动距离的函数
      calcAxis({e,direct }) {
        return new Promise(async (resolve, reject) => {
          let next = this.getRockByPoint(this.handleDirect(direct).next(e));
          if (next && next.num !== e.num) {
            resolve(false);
          } else if (next && next.canCalc && next.num === e.num) {
            //进行数字块的移动
            this.handleDirect(direct).handleMove(e);
            next.num*=2;
            this.score+=e.num;
            next.canCalc = false;
            next.color=this.color[next.num];
            this.mergeNumericBlockAddStyle(next);
            await delay(200);
            this.rocks.splice(this.getIndex(e.id), 1, null);
            resolve(true);
          } else if (next === undefined) {
            if (this.handleDirect(direct).handleCondition(e)) {
              this.handleDirect(direct).handleMove(e);
              this.calcAxis({ e,direct });
            }
            resolve(true);
          }
        });
      }
    }
  };
</script>


<style lang="scss" scoped>
  .show {
    position: fixed;
    bottom: 50vh;
    left: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: -27%;
  }
  body {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .layout {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;
    header {
      display: flex;
      max-width: 600px;
      width: 100%;
      padding: 20px;
      flex-direction: row;
      justify-content: space-around;
      button {
        border: none;
        background: #8f7a66;
        color: #fff;
        font-size: 20px;
        padding: 10px 30px;
        cursor: pointer;
        border-radius: 10px;
      }
      span {
        width: 100px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
    .all-container {
      height: 500px;
      width: 500px;
      text-align: left !important;
      .background {
        box-sizing: content-box;
        background-color: #bbada0;
        display: inline-flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        border-radius: 10px;
        width: 480px;
        position: absolute;
        z-index: 0;
        & > span {
          background-color: rgba(238,228,218,0.35);
          margin: 10px;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          z-index: 1;
        }
      }
      .container {
        z-index: 0;
        padding: 10px;
        width: 480px;
        height: 480px;
        display: inline-flex;
        position: absolute;
        justify-content: flex-start;
        align-items: flex-start;
        -webkit-touch-callout: none;
        -ms-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -ms-touch-action: none;
        touch-action: none;
        .list {
          margin: 10px;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          position: absolute;
          font-size: 50px;
          font-weight: bold;
          transition-property: transform;
          border-radius: 10px;
          transition: 100ms ease-in-out;
          .inner {
            width: 100%;
            height: 100%;
            color: #fff;
            display: inline-flex;
            align-items: center;
            border-radius: 10px;
            justify-content: center;
            animation-fill-mode: backwards;
            animation: appear 200ms ease-in-out;
          }
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .space{
      margin-bottom: 20px;
    }
    html,body{
      overflow: hidden;
    }
    .layout{
      overflow: hidden;
      header {
        span{
          width: 70px;
        }
        button {
          padding: 10px 15px;
        }
      }
      .all-container {
        margin: 2vw;
        width: 96vw;
        height: 96vw;

        .background,.container {
          width: 96vw;
          height: 96vw;
          box-sizing: border-box;
          padding: 1vw;
          & > span,.list {
            width: 21vw;
            height: 21vw;
            margin: 1vw;
            font-size: 8vw;
          }
        }
      }
    }
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    80% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
