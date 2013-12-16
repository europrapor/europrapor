europrapor : map4emotion
==========
The aim is to design a simple open source map on which is visualized the quantity of people who declare that they are wearing the ukrainian flag as a form of contribution to euromaidan movement.
Why:
- to use digital tools to contribute to the euromaidan movement and interact with it,
- to help each other by having a feedback about the mood around us.

The project consists thus in two parts - the client and the server.
The client is a web app adapted to mobile devices (such as smartphone, tablet, laptop) where people share feedback about the area they are in, and their feelings and emotions in current place and time.
The server is a web-service that visualize the map layers:
- one layer is to confirm the questionable size of a crowd, but also it lets the people contribute to the euromaidan movement even if they have to work or need to stay home;
- another layer represents the feelings and emotions of the people, and also allows people to organize self, and to make targeted support.
The data collected by app can be accessible via a free API, and it must be totally anonymous.

It is planned to use HTML5 jQuery Mobile (http://jquerymobile.com/) framework for the app development. 

We have identified so far 3 major features:

function digital flag euromaidan:
	objectives:
		count numbers of protesters per geographic units to contradict "official" ones and obtain a global view
	method:
		geo-localise myself as protester and put my position in a map
		option: precise position is invisible or visible if secured

function my_mood:
	objectives: 
		draw emotional maps to create support and empowerment
	method:
		rate your mood

--------------------
To do:
client side: process the post form data storage, and confirmation page
server side: implement heat map javascript class to draw density of people
