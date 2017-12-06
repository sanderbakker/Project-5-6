using System;
using System.Collections.Generic;

using System.Net;
using System.Net.Sockets;

namespace ChatServer
{
    class Client
    {
        public string ID{ get; set; }
        public IPEndPoint EndPoint { get; set; }
        Socket webSocket;

        public Client(Socket accepted)
        {
            webSocket = accepted;
            ID = Guid.NewGuid().ToString();
            EndPoint = (IPEndPoint)webSocket.RemoteEndPoint;
            webSocket.BeginReceive(new byte[] {0}, 0, 0, 0, callback, null);
        }

        void callback(IAsyncResult result)
        {
            try
            {
                webSocket.EndReceive(result);

                byte[] buffer = new byte[8192];
                int message = webSocket.Receive(buffer, buffer.Length, 0);
                
                if(message < buffer.Length)
                {
                    Array.Resize<byte>(ref buffer, message);
                }

                if(Received != null)
                {
                    Received(this, message);
                }
                webSocket.BeginReceive(new byte[] {0}, 0, 0, 0, callback, null);
            }
            catch (Exception except)
            {
                System.Console.WriteLine(except.Message);
                Close();
                if(Disconnected != null)
                {
                    Disconnected(this);
                }
            }
        }

        public Close()
        {
            webSocket.Close();
            webSocket.Dispose();
        }
    }
}