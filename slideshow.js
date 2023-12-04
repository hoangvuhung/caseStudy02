document.addEventListener("DOMContentLoaded", function(){
  let arrowLeft = document.querySelector('.slick-prev');
  let arrowRight = document.querySelector('.slick-next');

  let slickTrack = document.querySelector('.slick-track');
  let slickSlice = document.querySelectorAll('.slick-slide');
  let slickDots = document.querySelectorAll('.slick-dots li');

  let btn = document.querySelectorAll('.slick-dots button');
  let eleIsClicked = 0;

  let size = slickSlice[0].clientWidth;
  let count = 1, time = 3000;
  let stateTab = true;
  let stateTranslateOfSlickTrack = true;
  let v_interval = "";

  let hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  function handleVisibilityChange() {
    stateTab = (document[hidden])?false:true;
    if(stateTab){
      run_setInterval();
    }else{
      run_clearInterval();
    }
  }

  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  // Khi click vào arrow left
  arrowLeft.addEventListener("click", function(e){
    if(stateTranslateOfSlickTrack){
      run_clearInterval();
      commonFuncBothArrows(true,false,e);
      run_setInterval();
    }
  });

  // Khi click vào arrow right
  arrowRight.addEventListener("click", function(e){
    if(stateTranslateOfSlickTrack){
      run_clearInterval();
      commonFuncBothArrows(false,true,e);
      run_setInterval();
    }
  });

  function commonFuncBothArrows(arrowL,arrowR,e){
    e.preventDefault();
    stateTranslateOfSlickTrack = false;
    if(arrowL){
      if(count <= 0 ){ return; }
    }else{
      if(arrowR){
        if(count >= slickSlice.length - 1){ return;}
      }
    }
    slickDots[count-1].classList.remove('slick-active');
    slickTrack.style.transition = `transform 0.5s ease-in-out`;
    count = arrowL?--count:++count;
    console.log('count - ' + count);
    slickTrack.style.transform = `translate3d(${-size*count}px,0px,0px)`;
    eleIsClicked=count-1;
    switch (count) {
      case 0:
      slickDots[slickDots.length-1].classList.add('slick-active');
      break;
      case slickSlice.length-1:
      slickDots[0].classList.add('slick-active');
      break;
      default:
      slickDots[count-1].classList.add('slick-active');
      break;
    }
  }

  btn.forEach((elem) => {
    elem.addEventListener('click', ()=>{
      if(stateTranslateOfSlickTrack){
        run_clearInterval();
        slickTrack.style.transition = `transform 0.5s ease-in-out`;
        count = Number(elem.textContent);
        console.log("eleIsClicked - btn - " + eleIsClicked)
        slickDots[eleIsClicked].classList.remove('slick-active');
        slickDots[count-1].classList.add('slick-active');
        slickTrack.style.transform = `translate3d(${-size*count}px,0px,0px)`;
        eleIsClicked = count-1;
        run_setInterval();
      }
    });
  });

  run_setInterval();
  function run_setInterval(){
    v_interval = setInterval(()=>{
      slickDots[count-1].classList.remove('slick-active');
      slickTrack.style.transition ="transform 0.5s ease-in-out";
      slickTrack.style.transform = `translate3d(${-size*(++count)}px,0px,0px)`;
      console.log('count - ' + (count))
      eleIsClicked=count-1;
      if(count === slickSlice.length - 1){
        slickDots[0].classList.add('slick-active');
      }else{
        slickDots[count-1].classList.add('slick-active');
      }
    }, time);
  }

  function run_clearInterval(){
    clearInterval(v_interval);
  }

  slickTrack.addEventListener('transitionend', ()=>{
    stateTranslateOfSlickTrack = true;
    let nameClassSlickSlide = slickSlice[count].id;
    if(nameClassSlickSlide === 'lastClone' || nameClassSlickSlide === 'firstClone'){
      slickTrack.style.transition = `none`;
      count = (nameClassSlickSlide === 'lastClone')?slickSlice.length - 2:(nameClassSlickSlide === 'firstClone')?1:count;
      eleIsClicked = count -1;
      slickTrack.style.transform = `translateX(-${size*count}px)`;
    }
  })
},false)