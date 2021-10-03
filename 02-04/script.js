var messages = [];
$( document ).ready(function() {
    //localStorage.clear();
    getLocalStoregeItens();
   $("#nascimento").attr("max", $.datepicker.formatDate('yy-mm-dd', new Date()));
   if(localStorage.length != 0){
        $("#table tbody").html(createTable());
    }else{
        $(".div-table").html("<p>Não possui clientes cadastrados.<p>");
    }   
});

$(".pulse").click( function (){
    this.style.animation = "";
    setTimeout(() => this.style.animation = "pulse 0.2s linear", 1);
});

$("#form").submit(function (event){
	
    var form = {
        "id" : localStorage.length,
        "nome" : $("#nome").val(),
        "email" : $("#email").val(),
        "nascimento" : $("#nascimento").val(),
        "sexo" : $("#sexo").val()
    };
    try{
        saveLocalStoregeItens(form);

        event.preventDefault();

        $.when(ajax1(form), ajax2(form), ajax3(form))
        .done(function(){

            printMessages();

            getLocalStoregeItens();

            //localStorage.clear();

            formClear();
        });
    }catch(e){
        alert(e.message);
        
    }
});

function formClear(){
    $(".input").val("");
}

function getLocalStoregeItens(){
    for (var i = 0; i<localStorage.length; i++) {  
        console.log(localStorage.key(i) +" - "+localStorage.getItem(localStorage.key(i)));
    }
}

function saveLocalStoregeItens(form){
    validateItem(form);
    var output = [];  
    for (i in localStorage){
        obj = JSON.parse(localStorage.getItem(i));
        if (obj != null) {
            output.push(obj);
        }
    }
    output.push(form);
    output.sort();
    for (i = 0; i < output.length; i++) {
        localStorage.setItem(i,  JSON.stringify(output[i]));  
    }
}

function validateItem(form){
    for (var i = 0; i<localStorage.length; i++) {  
        obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(form.nome == obj.nome){
            throw new UserException("Nome já cadastrado");
        }
        if(form.email == obj.email){
            throw new UserException("Email já cadastrado");
        }
    }
}

function printMessages(){
    $(".messages").html(
        "<p>"+messages[0]+"</p>"
        +"<p>"+messages[1]+"</p>"
        +"<p>"+messages[2]+"</p>");
    $(".messages").show("slow");
    setTimeout(() => $(".messages").hide("slow"), 9000);
}

function ajax1(form){
       return $.ajax({
            type: "POST",
    
            url: "https://geoinova.com.br/teste/repositorio.php",
    
            data: [{
                "Nome" : form.nome,
                "Email" : form.email,
                "Nascimento" : form.nascimento,
                "Sexo" : form.sexo
            }],
    
            dataType: "json",
    
            success: function(data){
                messages.push(data.message);
            },
            error: function (data) {
                console.log(data);
                alert('An error occurred.');
            }
        });
}

function ajax2(nome, email, nascimento, sexo){
    return $.ajax({
            type: "POST",
    
            url: "https://geoinova.com.br/teste/cache.php",
    
            data: [{
                "Nome" : form.nome,
                "Email" : form.email,
                "Nascimento" : form.nascimento,
                "Sexo" : form.sexo
            }],
    
            dataType: "json",
    
            success: function(data){
                messages.push(data.message);
            },
            error: function (data) {
                console.log(data);
                alert('An error occurred.');
            }
        });  
}

function ajax3(nome, email, nascimento, sexo){
    return $.ajax({
            type: "POST",
    
            url: "https://geoinova.com.br/teste/fila.php",
    
            data: [{
                "Nome" : form.nome,
                "Email" : form.email,
                "Nascimento" : form.nascimento,
                "Sexo" : form.sexo
            }],
    
            dataType: "json",
    
            success: function(data){
                messages.push(data.message);
            },
            error: function (data) {
                console.log(data);
                alert('An error occurred.');
            }
        });
}

function UserException(message){
    this.message = message;
    this.name = "UserException";
}

//SCRIPT DA PAGINA LIST

function createTable(){
    var html = "";
    var output = [];  
    for (i in localStorage){
        obj = JSON.parse(localStorage.getItem(i));
        if (obj != null) {
            output.push(obj);
        }
    }
    output.sort();
    console.log(output.length);
    console.log(output);
    for (i = 0; i < output.length; i++) {    
        obj = output[i];
        html += "<tr>"
        +'<th scope="row">'+ (i + 1) +'</th>'
        +'<td>'+ obj.nome +'</td>'
        +'<td>'+ obj.email +'</td>'
        +'<td>'+ obj.nascimento +'</td>'
        +'<td>'+ obj.sexo +'</td>'
        +'<td><i onclick="deleteClient('+ obj.id +')" class="bi bi-trash-fill"></i></td>'
        +"</tr>";
    }
    return html;
}

function deleteClient(value){
    localStorage.removeItem(value);
    window.location.reload();
}

function deleteAll(){
    localStorage.clear();
    window.location.reload();
}
