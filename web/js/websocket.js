$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('.arrow').css('display','initial');
    }

    var rotation=0;  
    var wsUri="wss://"+document.location.host+document.location.pathname+"rope"; 
    var websocket = new WebSocket(wsUri);
    
    //se inicializan los metodos principales del web socket
    websocket.onopen=function(evt){onOpen(evt);};
    websocket.onmessage=function(evt){onMessage(evt);};
    websocket.onerror=function(evt){onError(evt);};
    
    //Se envia el movimiento
    function send_move(dato){
        websocket.send(dato);   
    }
    
    //funciones para el ingreso de usuarios
    function onOpen(evt){
    }
    function onError(evt){
    }
    
    //funcion para mover la bola al recibir la informacion
    function onMessage(evt){
        aux=evt.data;
        //console.log(aux);
        if(aux!=116){
            mover(aux);
        }else if(aux==0){
            alert("Ya hay 2 jugadores en partida, intenta más tarde!!");
        }else if(aux==1){
            alert("Jugador 1, mueve hacia la izquierda con la tecla A");
        }else if(aux==2){
            alert("Jugador 2, mueve hacia la derecha con la tecla D");
        }else{
            location.reload();
        }
    }
    
    $("body").keyup(function(e) {
        if(e.keyCode === 68) {  //right
            send_move(39);
        }
    });
    $("body").keyup(function(e) {
        if(e.keyCode === 65) { //left
            send_move(37);
        }

    });
    $("body").keydown(function(e) {
        if(e.keyCode === 116) { //reload
            send_move(116);
        }
    });
    
    $('#rightButton').on("click touch",function () {
        send_move(39);
    });
    $('#leftButton').on("click touch",function () {
        send_move(37);
    });
    

    function mover(direccion){       
        if(direccion==39){
            $("#ball").offset({top: $("#ball").offset().top,left:$("#ball").offset().left+20});
            $("#ball").rotate({angle:rotation,animateTo:rotation+30});
            rotation+=30;
        }
        else if(direccion==37){
            $("#ball").offset({top: $("#ball").offset().top,left:$("#ball").offset().left-20});
            $("#ball").rotate({angle:rotation,animateTo:rotation-30});
            rotation-=30;
        }
        var position=$("#ball").css("left").substring(0,$("#ball").css("left").length-2);
        if( position>350){
            $("#rightBackground").css("background-color","rgba(189, 27, 46, 0.6)");
            $("#leftBackground").css("background-color","rgba(38, 128, 38, 0.3)");
        }
        else if( position<350){
            $("#leftBackground").css("background-color","rgba(38, 128, 38, 0.6)");
            $("#rightBackground").css("background-color","rgba(189, 27, 46, 0.3)");
        }
        else{
            $("#rightBackground").css("background-color","rgba(189, 27, 46, 0.3)");
            $("#leftBackground").css("background-color","rgba(38, 128, 38, 0.3)");
        }
    }
});



