$(document).ready(function(){
    var rotation=0;
    
    $('span#pos').value=$("#ball").offset().left;
    
    var wsUri="ws://"+document.location.host+document.location.pathname+"rope"; 
    var websocket = new WebSocket(wsUri);
    
    //se inicializan los metodos principales del web socket
    websocket.onopen=function(evt){onOpen(evt);};
    websocket.onmessage=function(evt){onMessage(evt);};
    websocket.onerror=function(evt){onError(evt);};
    
    //Se envia el movimiento
    function send_move(movimiento){
        websocket.send(movimiento);   
    }
    
    //funciones para el ingreso de usuarios
    function onOpen(evt){
        writeToScreen("Conectado a "+wsUri);
    }
    
    //funcion para mover la bola al recibir la informacion
    function onMessage(evt){
        aux=evt.data;
        mover(aux);
    }
    
    $("body").keyup(function(e) {
        if(e.keyCode === 39) {  //right
            send_move(39);
        }
    });
    $("body").keyup(function(e) {
        if(e.keyCode === 37) { //left
            send_move(37);
        }
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
    }
});

