/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.comunicaciones.ws;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
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
    @OnOpen
    public void onOpen(Session peer){
        //Adicionamos un nuevo peer a la colección
        peers.add(peer);
    }
    @OnMessage
    public void onMessage(String message, Session client) throws IOException, EncodeException {
        for(Session peer:peers){
           peer.getBasicRemote().sendObject(message);
        }
    }
    @OnClose
    public void onClose(Session peer){
        peers.remove(peer);
    }
    
}
