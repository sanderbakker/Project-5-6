using System;
using System.Collections.Generic;

using System.Net;
using System.Net.Sockets;


namespace ChatServer
{
    class Listener
    {
        Socket webSocket;

        public bool Listening { get; set; }
        public int Port { get; set; }

        public Listener(int port)
        {
            //Initialize a new instance of the Socket class
            this.Port = port;
            webSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
        }

        public void Start()
        {
            if (Listening) { return; }
            //Associates WebSocket to new EndPoint and puts it in Listening state
            webSocket.Bind(new IPEndPoint(0,Port));
            webSocket.Listen(0);
            
            webSocket.BeginAccept(callback, null);
            Listening = true;
        }

        public void Stop()
        {
            if (!Listening) { return; }
            //Close webSocket and get rid of it
            webSocket.Close();
            webSocket.Dispose();

            webSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
        }

        void callback(IAsyncResult result)
        {
            try
            {
                var webSocket = this.webSocket.EndAccept(result);
                //Loop that checks if connection is still available
                if (SocketAccepted != null)
                {
                    SocketAccepted(this, new SocketAcceptedHandler(webSocket));
                }
                this.webSocket.BeginAccept(callback, null);
            }

            catch(Exception except)
            {
                System.Console.WriteLine(except.Message);
            }
        }

        public event EventHandler<SocketAcceptedHandler> SocketAccepted;
    }

    class SocketAcceptedHandler : EventArgs
    {
        public Socket Accepted { get; set; }
        public SocketAcceptedHandler(Socket webSocket)
        {
            Accepted = webSocket;
        }
    }
}