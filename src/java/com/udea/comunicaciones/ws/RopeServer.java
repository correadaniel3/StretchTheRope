/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.comunicaciones.ws;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author daniel
 */
@ServerEndpoint("/rope")
public class RopeServer {
 //Creamos la lista de peers para usar el endpoint
    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    private Session player1=null, player2=null;
    private List ids = new ArrayList();
    @OnOpen
    public void onOpen(Session peer) throws IOException, EncodeException{
        //Adicionamos un nuevo peer a la colección
        peers.add(peer);
        if(peers.toArray().length==1){
            player1=peer;
            onMessage("1",peer);
        }else if(peers.toArray().length==2){
            player2=peer;
            onMessage("2",peer);
        }else{
            onMessage("0",peer);
        }
    }
    @OnMessage
    public void onMessage(String message, Session client) throws IOException, EncodeException {
        if(player1!=null && player2!=null){
            for(Session peer:peers){
               peer.getBasicRemote().sendObject(message);
            }
        }else{
            client.getBasicRemote().sendObject("0");
        }
    }
    @OnClose
    public void onClose(Session peer){
        peers.remove(peer);
        ids.remove(peer.getId());
    }
    
}
