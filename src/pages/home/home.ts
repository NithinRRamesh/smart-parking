import { connect } from 'mqtt';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from "rxjs/Observable";


 
/*client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  date :any;
  mqttClient:any;
  count=0;
  maxCount = 5;  
  color=""
  msg="Available"

  vehicles=[
  ]

  constructor(public navCtrl: NavController) {
    this.date=Date.now();

    this.mqttClient=connect("https://test.mosquitto.org",{port:8080})

    this.mqttClient.on('connect',()=>{
      console.log("Connected to mosquitto")
      //this.mqttClient.publish("status/iotkletech","connected mofo")
      //this.mqttClient.publish("status/iotkletech","Hello World!!")
      /*setInterval(()=>{
        //this.mqttClient.publish("status/iotkletech","This is nithin")
      },2000)*/
    })

    this.mqttClient.subscribe("status/iotkletech1")
    
    var vcount = 0;
    this.mqttClient.on('message', (topic, message) => {
      if(topic === 'status/iotkletech1') {
        console.log(message.toString())
        let str = message.toString()
        var splitted = str.split('\n')
        for(let mc of splitted){
          console.log(mc)
          let  temp = {name:mc,time:Date.now()}
          vcount++;
          if(vcount<=this.maxCount){
            this.vehicles.push(temp)
            this.count=vcount;
            this.color = "success"
            this.msg="Available"
          }else{
            this.color = "danger"
            this.msg="Full"
          }
          
        }
        console.log(splitted) 
      }
    })
    setInterval(()=>{
      this.date=Date.now()
    },2000)
  }
}
