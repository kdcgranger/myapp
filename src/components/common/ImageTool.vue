<style scoped>
.image_tool {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;
  /* opacity: 0.5; */
  /* display: none; */
    z-index: 1993;
    top: 0;
    left: 0;
}
.image_tool img {
    width: 80%;
    height: 80%;
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: move;
}
.image_tool .buttons_cls {
    position: absolute;
    top: 92%;
    left: 50%;
    margin-left: -176px;
}
</style>
<template>
    <div class="image_tool">
        <!-- <img :src="url" id="aimImg" @touchdown="moveStart($event)" @touchmove="moving($event)" @touchend="moveEnd($event)"/> -->
        <img :src="url" id="aimImg" @mousedown="moveStart($event)" @mousemove="moving($event)" @mouseup="moveEnd($event)"/>
        <div class="buttons_cls">
            <Button @click="bigger">放大</Button>
            <Button @click="smaller">缩小</Button>
            <Button @click="transSame">顺时针旋转</Button>
            <Button @click="transNoSame">逆时针旋转</Button>
            <Button @click="hide">关闭</Button>
        </div>
    </div>
</template>
<script>
export default {
  name: "imageTool",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
      return {
        nowTrans: 0,
        moveBegin: false,
        beginMouseX: 0,
        beginMouseY: 0,
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0
      }
  },
  methods: {
    hide() {
        this.$emit("close")
    },
    transSame() {
        this.nowTrans++;
        this.trans()
    },
    transNoSame() {
        this.nowTrans--;
        this.trans()
    },
    trans() {
        $(".image_tool img").css("transform", "rotate(" + 90 * this.nowTrans + "deg)")
        $(".image_tool img").css("-ms-transform", "rotate(" + 90 * this.nowTrans + "deg)")
        $(".image_tool img").css("-moz-transform", "rotate(" + 90 * this.nowTrans + "deg)")
        $(".image_tool img").css("-o-transform", "rotate(" + 90 * this.nowTrans + "deg)")
        $(".image_tool img").css("-webkit-transform", "rotate(" + 90 * this.nowTrans + "deg)")
        this.fix()
    },
    fix () {
        let boxHeight = document.body.clientHeight * 0.8
        let boxWidth = document.body.clientWidth * 0.8
        let imgNaturalHeight = document.getElementById("aimImg").naturalHeight
        let imgNaturalWidth = document.getElementById("aimImg").naturalWidth
        let times
        if (this.nowTrans % 2 === 0) {
            times = boxHeight / imgNaturalHeight > boxWidth / imgNaturalWidth ? boxWidth / imgNaturalWidth : boxHeight / imgNaturalHeight
        } else {
            times = boxHeight / imgNaturalWidth > boxWidth / imgNaturalHeight ? boxWidth / imgNaturalHeight : boxHeight / imgNaturalWidth
        }
        $("#aimImg").css("width", imgNaturalWidth * times)
        $("#aimImg").css("height", "auto")
        $("#aimImg").css("margin-left", (-imgNaturalWidth * times) / 2)
        $("#aimImg").css("margin-top", (-imgNaturalHeight * times) / 2)
        $("#aimImg").css("left", "50%")
        $("#aimImg").css("top", "50%")
    },
    bigger () {
        let nowWidth = Number($("#aimImg").css("width").substring(0, $("#aimImg").css("width").length - 2))
        let nowHeight = Number($("#aimImg").css("height").substring(0, $("#aimImg").css("height").length - 2))
        $("#aimImg").css("width", nowWidth * 2)
        $("#aimImg").css("height", nowHeight * 2)
        $("#aimImg").css("margin-left", -nowWidth)
        $("#aimImg").css("margin-top", -nowHeight)
        $("#aimImg").css("left", "50%")
        $("#aimImg").css("top", "50%")
    },
    smaller () {
        let nowWidth = Number($("#aimImg").css("width").substring(0, $("#aimImg").css("width").length - 2))
        let nowHeight = Number($("#aimImg").css("height").substring(0, $("#aimImg").css("height").length - 2))
        $("#aimImg").css("width", nowWidth / 2)
        $("#aimImg").css("height", nowHeight / 2)
        $("#aimImg").css("margin-left", -nowWidth / 4)
        $("#aimImg").css("margin-top", -nowHeight / 4)
        $("#aimImg").css("left", "50%")
        $("#aimImg").css("top", "50%")
    },
    moveStart (e) {
        if (e.button === 0) {
            this.beginX = $("#aimImg")[0].offsetLeft
            this.beginY = $("#aimImg")[0].offsetTop
            this.beginMouseX = e.clientX
            this.beginMouseY = e.clientY
            this.moveBegin = true
        }
        e.preventDefault()
    },
    moving (e) {
        if (this.moveBegin) {
            $("#aimImg").css("left", this.beginX + e.clientX - this.beginMouseX)
            $("#aimImg").css("top", this.beginY + e.clientY - this.beginMouseY)
            $("#aimImg").css("margin-left", "0px")
            $("#aimImg").css("margin-top", "0px")
        }
    },
    moveEnd (e) {
        this.moveBegin = false
    }
   },
   mounted () {
    this.fix()
   }
};
</script>


