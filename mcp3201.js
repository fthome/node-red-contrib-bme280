'use strict';

module.exports = function(RED) {
  const MCP3201 = require('mcp3201.js');

  function Mcp3201(n) {
    RED.nodes.createNode(this,n);
    var node = this;
    //var context=this.context();

    node.device=n.device;
    node.vref=n.vref;
    node.topic = n.topic;


    // init the device
    node.status({fill:"grey",shape:"ring",text:"Init..."});
    node.log("Initializing mcp3201 on " + node.device);
    node.mcp3201=new MCP3201(node.device);
    node.status({fill:"green",shape:"dot",text:node.type+" Initialized!"});
    node.read(function(value){
      node.status({fill:"green",shape:"dot",text:node.type+" Initialized!"});
      node.log("MCP3201 Ok");
    }).catch(function(err) {
        node.status({fill:"red",shape:"ring",text: "" + err});
    });
    
    // On input
    node.on('input',function(msg) {
       node.mcp3201.read(function(value){
         msg.payload = value;
         if (node.topic) then{
            msg.topic = node.topic;
         }
         node.send(msg);
         node.status({fill:"green",shape:"dot",text:node.type+" V:"+value.toFixed(1)});
       }).catch(function(err) {
         node.status({fill:"red",shape:"ring",text:""+err});
       });
       return null;
    });

  }

  RED.nodes.registerType("Mcp3201",Mcp3201);
};
