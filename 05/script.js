
$( document ).ready(function() {

});
$(".button").click( function (){
    this.style.animation = "";
    setTimeout(() => this.style.animation = "pulse 0.2s linear", 1);
    analise();
});

function analise(){
    var html
    if ($("#kwy").is(":checked")) {
        var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    }else{
        var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "z"];
    }
    var frase = $("#frase").val().split("");
    if(frase.length > 0){
        for (i = 0; i < frase.length; i++) {
            for (j = 0; j < alfabeto.length; j++) {
                if (frase[i].toLowerCase() == alfabeto[j]) {
                    alfabeto.splice(j,1); 
                }
            }
        }
        if(alfabeto.length > 1){
            $(".body p").attr("style","color:red;");
            html = "Letras que faltam para a frase se tornar um Pangrama:\n";
            for (i = 0; i < alfabeto.length; i++) {
                if(i != (alfabeto.length -1)){
                    html += alfabeto[i].toUpperCase() + ", "; 
                }else{
                    html += alfabeto[i].toUpperCase();
                }
            }
        }else if(alfabeto.length == 1){
            $(".body p").attr("style","color:blue;");
            html = 'Falta somente a letra "'+ alfabeto[0].toUpperCase() +'" para a frase se tornar um Pangrama:'
        }else{
            $(".body p").attr("style","color:green;");
            html = "Esta frase é um Pangrama.";
        }
    }else{
        $(".body p").attr("style","color:red;");
        html ="Nenhuma frase foi informada."
    }
    $("#letrasFaltantes").html(html);
}
