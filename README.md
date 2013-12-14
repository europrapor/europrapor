europrapor : map4emotion
==========
Th aim is to developp a simple open source map on which is visualized the quantity of people declaring wearing the ukrainian 
flag in contribution to euromaidan.
why:  - to use digital tools to contribute to the euromaidan movement and interct with it
      - to help each others by having a feedback about the mood around us


the projects consists thus in two parts: the client, which is a web app adapted to mobiles phones, where people shares feedback about the area they are in and 
their feelings and emotions at this place at this time.

the second part is a webservice of map visualization: Maps can be used to confirm objectivable size of crowds, but also to let the people contribute to the mouvement euromaidan 
even if they must work or stay home.

a second layer on the map will represente the feelings and emotions of the people: this tool can be the used for self organisation
and targetted support.


The app has first thought to be developped using the html5 jquerymobile standards, but the collected data (totaly anonymous) can be shared via a free api.


We have identified so far 3 functionnalites:


function digital flag euromaidan:
	objectives:
		count numbers of protesters per geographic units to contredict official ones and obtain a global view
	method:
		geolocalise myself as protester and put my position in a map
		- option : invisible or visible if securized




func my_mood:
	objectives: draw emotionnal maps to create support and empowerment
	method:
		- rate your mood

--------------------
To do:
client side : process the post form data storage, and confirmation page
serveur side : implement heat map javascript class to dray density of peoples
