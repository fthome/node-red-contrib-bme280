# node-red-contrib-mcp3201

A node-red custom node wrapper for the nodejs [mcp3201.js](https://github.com/fthome/mcp3201.js). by FredThx . This library uses the package [pi-spi](https://github.com/natevw/pi-spi) that enable the comunication with SPI devices in most commmon Linux SBCs. Raspberry Pi, C.H.I.P., BeagleBone, Orange Pi,  or Intel Edison are supported by this package.

## Installation

Under your node-red working directory.

``
npm install node-red-contrib-mcp3201
``

Node palette can be used as well to install the node.

After restarting node-red the "mcp3201" node should be available in "Input" category.

## Prerequisites

	Wiring :

MCP3201 :
              _ _
			       | U |						
	   Vref ---|   |--- Vdd : 2.7V - 5V			
		  IN+ ---|   |--- CLK		
		  IN- ---|   |--- Dout	
		   0V ---|   |--- CS						
  		       |___|
													 
sur Rpi (SPI0):

  Vref : 3.3V (ou 5V, ou ...)
	Vdd : 3.3V (ou 5V)
  CLK : SPI0_SCLK = GPIO11
  Dout : SPI MISO = GPIO09
	CS : - SPI0_CE0_N (GPIO08) => device : '/dev/spidev0.0'
       - SPI0_CE1_N_N (GPIO07) => device = '/dev/spidev0.1'

>__Caveat__:
> Check your permissions to the /dev/spidev devices. The user running node-red need access to writting and reading.
(on raspberry pi : sudo raspi-config)

## Usage

### Configuration & deployment
After installation place your mcp3201node in any of your flow and configure the following parameters:

1. __Name:__ Select the name of your sensor for easy indentifiation.
2. __Device:__ Select your spi device : '/dev/spidev0.0' (default) ou '/dev/spidev0.1' or ...
3. __Ref_voltage:__ Select then referencial voltage (default is 3.3)
4. __Topic:__ Select a topic

### Reading Data
As in other node-red nodes the actual measurement of sensor data require that an input msg arrive to the node. The input called __Trigger__ will start the reading of sensor data will send the data in the node's output.

The __output__ will have the follwing format:

```
msg = {
  _id: <node-red msg_id>,
  topic: "__topic__",
  payload: value_in_volt
}
```

## Notes
This node has been tested on Raspberry Pi 3

## Change log.
* 0.0.1 Firts version
