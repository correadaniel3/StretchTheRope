$(document).ready(function(){
    var rotation=0;
    var movimiento=0;
    $("body").keyup(function(e) {
        if(e.keyCode === 39) {  //right
            movimiento=39;
            mover(movimiento);
        }
    });
    $("body").keyup(function(e) {
        if(e.keyCode === 37) { //left
            movimiento=37;
            mover(movimiento);
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

