using System;
using System.Collections.Generic;

using System.Net;
using System.Net.Sockets;


namespace ChatServer
{
    class Program
    {
        static Listener listener;
        static List<Socket> websockets;
        static void Main(string[] args)
        {
            listener = new Listener(4999);
            listener.SocketAccepted += new EventHandler<SocketAcceptedHandler>(listener_accepted);
            listener.Start();
            websockets = new List<Socket>();

            Console.Read();
        }

        static void listener_accepted(object sender, SocketAcceptedHandler s)
        {
            System.Console.WriteLine("New Connection: {0}\n{1}\n--------------------------", s.Accepted.RemoteEndPoint, DateTime.Now);
            websockets.Add(s.Accepted);
        }
    }
}
