$( document ).ready(function() {
    getHour();
    setTimeout(function() {                     
        setTimeout(() => $('.initial').animate({
            height: 0,
            "padding-top": 0,
          }, 1000, function(){
            $('.initial').hide();
          }));
    }, 3000)
});

function getHour() {
    let d = new Date();
    let hours = d.getHours();
    let ampm;
    if((hours >= 0 && hours < 6)||(hours >= 19 && hours <= 24)){
        hours = '6';
        ampm = 'AM';
        $('#meal').attr('src','images/3.jpg');
    }else if(hours >= 6 && hours < 9){
        hours = '9';
        ampm = 'AM';
        $('#meal').attr('src','images/4.jpg');
    }else if(hours >= 9 && hours < 12){
        hours = '12';
        ampm = 'PM';
        $('#meal').attr('src','images/1.jpg');
    }else if(hours >= 12 && hours < 15){
        hours = '03';
        ampm = 'PM';
        $('#meal').attr('src','images/5.jpg');
    }else if(hours >= 15 && hours < 19){
        hours = '19';
        ampm = 'PM';
        $('#meal').attr('src','images/2.jpg');
    }
    let strTime = hours + '<span class="blink_me">:</span>' + "00" + ampm;
    $('#hours').html(strTime);
    
}

$('.animate-pulse').click( function (){
    this.style.animation = "";
    setTimeout(() => this.style.animation = "pulse 0.2s linear", 1);
});

$('#logo').click( function (){
    this.style.animation = "";
    setTimeout(() => this.style.animation = "spin 0.2s linear", 1);
});

function color(num){
    switch (num) {
        case "1":
            $('.button').attr('style','background-color: #08618a;');
            $('.horizontal-bar').attr('style','background-color: #08618a;');
            $('.header').attr('style','background-color: #08618a;');
        break;
        case "2":
            $('.button').attr('style','background-color: #8a0808;');
            $('.horizontal-bar').attr('style','background-color: #8a0808;');
            $('.header').attr('style','background-color: #8a0808;');
        break;
        case "3":
            $('.button').attr('style','background-color: #777777;');
            $('.horizontal-bar').attr('style','background-color: #777777;');
            $('.header').attr('style','background-color: #777777;');
        break;
        case "4":
            $('.button').attr('style','background-color: #088A08;');
            $('.horizontal-bar').attr('style','background-color: #088A08;');
            $('.header').attr('style','background-color: #088A08;');
        break;
      }
      

}
