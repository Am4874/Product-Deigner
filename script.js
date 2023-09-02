// smooth scrolling

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// functions
circleMouseFollower();
firstPageAnim();
mouseCircleSkew();







//mouse circle
function circleMouseFollower(x_scale,y_scale) {
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets.clientX,dets.clientY);
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${x_scale},${y_scale})`;
  });
}

//Animation 
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".baoundingelement", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 1.5,
      stagger: 0.1,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

// mouse skew

var timeout ; 

function mouseCircleSkew() {
  // define default scale value
  var x_scale = 1;
  var y_scale = 1;

  // previous value of  mouse
  var x_prev = 0;
  var y_prev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    // var x_diff = dets.clientX - x_prev;
    // var y_diff = dets.clientY - y_prev;

    // x_scale = gsap.utils.clamp(0.8,1.2,x_diff);
    // y_scale  =gsap.utils.clamp(0.8,1.2,y_diff);

    x_scale = gsap.utils.clamp(0.8, 1.2, dets.clientX - x_prev);
    y_scale = gsap.utils.clamp(0.8, 1.2, dets.clientY - y_prev);

    x_prev = dets.clientX;
    y_prev = dets.clientY;

    circleMouseFollower(x_scale,y_scale);

    setTimeout(function(){
        timeout = document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    },100)
  });
}


// second hover 

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0 ;
    elem.addEventListener('mousemove',function(dets){
        // console.log(elem.getBoundingClientRect()); // check mouse position
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot =  dets.clientx - rotate;
        rotate = dets.clientx;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3.ease,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot * 0.2)
        })
    });
    
    elem.addEventListener('mouseleave',function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3.ease,
            duration:0.5,
        });
        });

});


// set time
const formatDate = date => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const targetDate = new Date(2023, 7, 24);
const timeElement = document.getElementById('time');
timeElement.innerHTML = formatDate(targetDate);


// function formatDate(date) {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return date.toLocaleDateString(undefined, options);
// }

// // Creating a new Date object for August 24, 2023
// const targetDate = new Date(2023, 7, 24); // Note: Months are zero-based (0 = January, 1 = February, ...)

// // Set the content of the 'time' element to the formatted date
// const timeElement = document.getElementById('time');
// timeElement.innerHTML = formatDate(targetDate);