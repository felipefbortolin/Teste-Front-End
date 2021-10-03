
$( document ).ready(function() {

});
$(".button").click( function (){
    this.style.animation = "";
    setTimeout(() => this.style.animation = "pulse 0.2s linear", 1);
    analise();
});

function analise(){
    let html = "";
    let alfabeto = [];
    if ($("#kwy").is(":checked")) {
        alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    }else{
        alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "z"];
    }

    let pattern = /[a-zA-Z]/g;
    let frase = $("#frase").val().match(pattern);
    frase = frase != null ? frase : []
    if(frase.length > 0){
        for (let i = 0; i < frase.length; i++) {
            for (let j = 0; j < alfabeto.length; j++) {
                if (frase[i].toLowerCase() == alfabeto[j]) {
                    alfabeto.splice(j,1); 
                }
            }
        }
        if(alfabeto.length > 1){
            $(".body p").attr("style","color:red;");
            html = "Letras que faltam para a frase se tornar um Pangrama:\n";
            for (let i = 0; i < alfabeto.length; i++) {
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
