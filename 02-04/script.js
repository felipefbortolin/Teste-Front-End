var messages = [];
$( document ).ready(function() {
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
        "id" : getLastIdFromLocalStorage(),
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
    for (let i = 0; i<localStorage.length; i++) {  
        console.log(localStorage.key(i) +" - "+localStorage.getItem(localStorage.key(i)));
        
    }
}

function saveLocalStoregeItens(form){
    validateItem(form);
    if(localStorage.length > 0){
        let output = [];  
        for (let i = 0; i<localStorage.length; i++) {  
            if(localStorage.getItem(localStorage.key(i)) != null){
                let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                output.push(obj);
            }
        }
        output.push(form);
        output.sort();
        localStorage.clear();
        for (let i = 0; i < output.length; i++) {
            localStorage.setItem(i,  JSON.stringify(output[i]));  
        }  
    }else{
        localStorage.setItem(0,  JSON.stringify(form));
    }
}

function getLastIdFromLocalStorage(){
    let lastId = 0;
    if(localStorage.length > 0){
        for (let i = 0; i<localStorage.length; i++) {  
            if(localStorage.getItem(localStorage.key(i)) != null){
                let id = JSON.parse(localStorage.getItem(localStorage.key(i))).id ;
                if(id >= lastId){
                    lastId = id + 1;
                }
            }
        }
    }else{
        lastId = 1;
    }
    return lastId;
}

function validateItem(form){
    if (form.nome == null || form.nome ==""){
        throw new UserException("Nome não foi informado.");
    }
    if (form.email == null || form.email ==""){
        throw new UserException("Email não foi informado.");
    }
    if (form.nascimento == null || form.nascimento ==""){
        throw new UserException("Nascimento não foi informado.");
    }
    if (form.sexo == null || form.sexo ==""){
        throw new UserException("Sexo não foi informado.");
    }
    for (let i = 0; i < localStorage.length; i++) {  
        if(localStorage.getItem(localStorage.key(i)) != null){
            let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(form.nome == obj.nome){
                throw new UserException("Nome já cadastrado.");
            }
            if(form.email == obj.email){
                throw new UserException("Email já cadastrado.");
            }
        }
    }
}

function printMessages(){
    $(".messages").html(
        "<p>"+messages[0]+"</p>"
        +"<p>"+messages[1]+"</p>"
        +"<p>"+messages[2]+"</p>");
    $(".messages").show("slow");
    setTimeout(() => $(".messages").hide("slow"), 8000);
    messages = [];
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

function ajax2(form){
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

function ajax3(form){
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
    let html = "";
    let output = getOrderLocalStorageList();
    for (let i = 0; i < output.length; i++) {    
        obj = output[i];
        html += "<tr>"
        +'<th scope="row">'+ obj.id +'</th>'
        +'<td>'+ obj.nome +'</td>'
        +'<td>'+ obj.email +'</td>'
        +'<td>'+ obj.nascimento +'</td>'
        +'<td>'+ obj.sexo +'</td>'
        +'<td><i onclick="deleteClient('+ obj.id +')" class="bi bi-trash-fill"></i></td>'
        +"</tr>";
    }
    return html;
}

function deleteClient(id){
    try{
        let key = getKeyLocalStoregeItenById(id)
        validateDeleteClient(key);
        localStorage.removeItem(key);
        window.location.reload();
    }catch(e){
        alert(e.message);
    }
}

function getKeyLocalStoregeItenById(id){
    for (let i = 0; i<localStorage.length; i++) {  
        if(localStorage.getItem(localStorage.key(i)) != null){
            let idStorage = JSON.parse(localStorage.getItem(localStorage.key(i))).id;
            if(id == idStorage){
                return parseInt(localStorage.key(i));
            }
        }
    }
}

function deleteAll(){
    try{
        localStorage.clear();
        window.location.reload();
    }catch{
        alert("Erro, não foi possivel deletar todos os clientes.");
    }
}

function getOrderLocalStorageList(){
    let output = [];  
    for (let i in localStorage){
        let obj = JSON.parse(localStorage.getItem(i));
        if (obj != null) {
            output.push(obj);
        }
    }
    return output.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });
}

function validateDeleteClient(key){
    if (localStorage.getItem(key) == null){
        throw new UserException("Não foi possivel deletar este cliente.");
    }
}