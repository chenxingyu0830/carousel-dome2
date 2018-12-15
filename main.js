let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-400px)'})
bindEvents()
$(next).on('click',function(){
  goToSlide(current + 1)
})
$(previous).on('click',function(){
  goToSlide(current - 1)
})
let timer = setInterval(function(){
  goToSlide(current + 1)
},2000)
$('.container').on('mouseenter',function(){
  window.clearInterval(timer)
})
$('.container').on('mouseleave',function(){
  timer = setInterval(function(){
    goToSlide(current + 1)
  },2000)
})


//函数封装
function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}
function bindEvents(){
  $('#buttonWrapper').on('click','button',function(e){
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}
function goToSlide(index){  //重要
  if(index >= $buttons.length){
    index = 0
  }else if(index < 0){
    index = $buttons.length -1
  }
  if(current === $buttons.length - 1 && index === 0){
    //说明你是最后一张到第一张
    console.log(1)
    $slides.css({transform: `translateX(${-($buttons.length + 1) * 400}px)`})
      .one('transitionend',function(){
        $slides.hide().offset()
        $slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
      })
  }else if(current === 0 && index === $buttons.length - 1){
    //说明你是第一张直接到最后一张
    console.log(2)
    $slides.css({transform: 'translateX(0px)'})
      .one('transitionend',function(){
        $slides.hide().offset()
        // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
        $slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
      })
  }else{
    //正常顺序
    console.log(3)
    $slides.css({transform:`translateX(${-(index+1)*400}px)`})
  }
  current = index
}