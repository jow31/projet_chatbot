const Discord = require('discord.js');
const bot = new Discord.Client(); //client est le bot

var axios = require('axios');
var parser = require('json-parser');

var getJSON = require('./blague.js');
var meteo = require('./meteo.js');
var image = require('./image.js');
var iss = require('./iss.js');
var math = require('./math.js');
//var parseString = require();

//const commando = require('discord.js-commando');
//const bot = new commando.Client(); //come discord client avec plusiers des features


// Every command needs to be in a group
//bot.registry.registerGroup('requetes', 'Requetes');
//bot.registry.registerDefaults(); //register defaults commands as help
//bot.registry.registerCommandsIn(__dirname + "/commands");


bot.login(process.env.DISCORD_TOKEN); //log into server

//ar imgur_client = new ImgurClient("32761395a6538ea");

var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello world');
});


bot.on('ready', () => {
	console.log('I am ready!');
});


bot.on('message', message => {   //A chaque fois qu'un message est envoye; on va excecuter => {}
	if (message.content === 'ping') { //parecido a == pero compara el tipo tambien
		//message.reply('pong');
		message.channel.sendMessage('pong'); // Pour envoyer le msg sans @
	}
	console.log(message);
});

bot.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
});


bot.on('message', message => {   //A chaque fois qu'un message est envoye; on va excecuter => {}
	
	//var input = message.content.toUpperCase();
	//let args = input.split('');
	let prefix = '!';

	// BLAGUE
	if (message.content.toUpperCase().startsWith("!BLAGUE")) { 

		message.channel.sendMessage('blague');
		
		/*
		var gjson;
		gjson = getJSON('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1') ;

		message.channel.sendMessage(gjson.fact);
		*/
		axios.get('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1')
			.then(function(response) {
				//self.fact = response.data.fact;
				//var resp = parser.parse(response.data);
				//message.channel.sendMessage(JSON.stringify(response.data, null, 4)); //FUNCIONA
				message.reply(Object.values(response.data));
				//console.log(JSON.stringify(response.data, null, 4));
				//resp = JSON.parse(response.data);
				//message.channel.sendMessage(resp.fact); 
				
				//message.channel.sendMessage(response.data[1]);
				//console.log(response.data);
				//console.log(response.status);
			});
		/*
		$.getJSON( oembed_url, function(data) {
   			jsonFinal = data.fact;
        	//console.log();
    	}).done(function() {
     		message.channel.sendMessage( jsonFinal );
   		});
   		*/
		/*
		var joke;
		$.getJSON('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1', function(data) {	
		
			joke = data;
		});
		var obj = JSON.prase(joke);
		message.reply(obj.fact);
		*/

		//var json_obj = JSON.parse(blague.Get('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1'));
		//message.reply(json_obj.fact);
		//console.log("this is the author name: "+json_obj.author_name);    
		
	}

});



app.listen(process.env.PORT || 5000);
