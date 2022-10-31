/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.net.InetAddress;
import java.net.NetworkInterface;

/**
 *
 * @author Randa
 */
public class GetMac {

    /**
     * @param args the command line arguments
     */
    
    public String getMac()throws Exception{
       String ma=null; 

      //get the internet address of the local host(local machine)
      InetAddress address=InetAddress.getLocalHost();
      System.out.println(address);
      
 
      
      //get the network interface that has the ip address bound to it(internet address)
      NetworkInterface ni=NetworkInterface.getByInetAddress(address);
      System.out.println(ni);
      
      //get mac address from the network interface in byte
      
      byte[]mac=ni.getHardwareAddress();
      //System.out.println(mac);
      for(int j=0;j<mac.length;j++){
          System.out.println(mac[j]);
      }
      
      //display the mac address
      StringBuilder sb=new StringBuilder();
      //browse the mac address to convert in into string
      
      for(int i=0;i<mac.length;i++){
          
          sb.append(String.format("%02X%s", mac[i],(i<mac.length-1)?"-":""));
      }
      ma=sb.toString();
      return ma;
        
        
    }
    
    
    public static void main(String[] args)throws Exception {
        GetMac gm=new GetMac();
        String mac=gm.getMac();
        System.out.println("the mac address is:"+" "+""+mac);
        
    }
    
}
