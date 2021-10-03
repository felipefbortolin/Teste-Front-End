$( document ).ready(function() {
    getHour();
    img = Math.floor(Math.random() * 3);
    $('#meal').attr('src','images/'+ img +'.jpg');
});

function getHour() {
    var d = new Date();
    var hours = d.getHours() + 3;
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + '<span class="blink_me">:</span>' + minutes + ampm;
    $('#hours').html(strTime);
    //loop 
    i = 0;
    setTimeout(function() {   
        i++;                  
        if (i < 20) {          
            getHour();             
        }                       
      }, 30000)
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
