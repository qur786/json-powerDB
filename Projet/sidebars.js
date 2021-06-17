/* global bootstrap: false */
/*
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

*/
(function(){
    var active = document.getElementsByClassName('nav-link');
    for(var i of active){
        i.addEventListener('mouseover',function(){
        this.className += ' active';
    }); 
         i.addEventListener('mouseleave',function(){
        this.className = 'text-white nav-link';
    });
        }
        }

)()