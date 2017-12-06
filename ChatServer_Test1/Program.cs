using System;
using System.Collections.Generic;

using System.Net;
using System.Net.Sockets;


namespace ChatServer_Test1
{
    class Program
    {
        static void Main(string[] args)
        {
            Socket s = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            s.Connect("127.0.0.1", 4999);
        }
    }
}
