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
	
	var input = message.content.toUpperCase();
	let args = input.split('');
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
				
				var resp = response.data;
				var resp2 = resp[0].fact;
				//message.reply(resp2.replace("é","e").replace("è","e").replace("ù","u").replace("à","a").replace("û","u").replace("â","a").replace("ô","o").replace("ç","c"));
				message.reply(resp2.replace(/'/g,"&#039;").replace(/"/,"&quot;"));

			});   
		
	}

	if (args[0]===('!MÉTÉO') || (args[0]===('!METEO')) ) { //
		
		message.reply('meteo');
		/*
		var request = new XMLHttpRequest();
		request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=3dff382ff1c221c773f53c526d7f0bf8" + apiKey, false);
		request.send();

		request = JSON.parse(request.responseText);

		console.log(request);
		console.log(request.weather[0].description);
		*/
 


	}
	
	if (message.content.toUpperCase().startsWith("!IMAGE")) { //

		
		message.reply('image');
		/*
		var client = new ImgurClient("CLIENT_ID");
		var endpoint = new GalleryEndpoint(client);
		var image = await endpoint.GetGalleryTagImageAsync("GALLERY_ITEM_ID", "cat");
		*/
		/*
		var https = require('https');

		var options = {
		  hostname: 'api.imgur.com',
		  path: '/3/gallery/search/time/1/?q=cat',
		  headers: {'Authorization': 'Client-ID 32761395a6538ea'},
		  method: 'GET'
		};

		var req = https.request(options, function(res) {
		  console.log('statusCode:', res.statusCode);
		  console.log('headers:', res.headers);

		  res.on('data', function(d) {
		    process.stdout.write(d);
		  });
		});

		req.on('error', function(e) {
		  console.error(e);
		});

		req.end();
		*/
		/*
		message.channel.sendMessage('pong')
		const embed = new Discord.RichEmbed()
			//.setImage('https://api.imgur.com/endpoints/gallery#gallery-search');
			.setImage('http://i.imgur.com/yVpymuV.png')
		message.channel.send({embed});
		
		message.channel.sendMessage("image", {
			file: "http://i.imgur.com/MBUyt0n.png"
		});
		*/
	}
	
	if (args[0] === (prefix+'ISS')) { //
		
		message.reply('iss');
		
	}

});



app.listen(process.env.PORT || 5000);
