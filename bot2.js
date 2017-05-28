const Discord = require('discord.js');
const bot = new Discord.Client(); 

var axios = require('axios');
var parser = require('json-parser');
var getJSON = require('./blague.js');
var math = require('./math.js');
//var meteo = require('./meteo.js');
//var image = require('./image.js');
//var iss = require('./iss.js');

bot.login(process.env.DISCORD_TOKEN); //log into server


var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello world');
});


bot.on('ready', () => {
	console.log('I am ready!');
});

/*
bot.on('message', message => {   //A chaque fois qu'un message est envoye; on va excecuter => {}
	if (message.content === 'ping') { 
		message.channel.sendMessage('pong'); // Pour envoyer le msg sans @
	}
	console.log(message);
});
*/

bot.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
});

bot.on('message', message => {   //A chaque fois qu'un message est envoye; on va excecuter => {}
	
	var input = message.content.toUpperCase();
	var args = input.split(" ");


	// BLAGUE
	if (message.content.toUpperCase().startsWith("!BLAGUE")) { 
		//message.channel.sendMessage('blague');

		axios.get('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1')
			.then(function(response) {
				
				var resp = response.data;
				var resp2 = resp[0].fact;
				//message.reply(resp2.replace("é","e").replace("è","e").replace("ù","u").replace("à","a").replace("û","u").replace("â","a").replace("ô","o").replace("ç","c"));
				message.channel.sendMessage(resp2.replace(/'/g,"&#039;").replace(/"/,"&quot;"));

			});   
	}
	
	//METEO
	if (args[0]==='!METEO' || args[0]==='!MÉTÉO')  { //
		
		//message.reply('meteo');
		
		axios.get("http://api.openweathermap.org/data/2.5/weather?q="+args[1]+"&appid=3dff382ff1c221c773f53c526d7f0bf8")
			.then(function(response) {
				
				var resp = response.data;
				message.channel.sendMessage("  ** Météo à " + args[1] + " **");
				message.channel.sendMessage("Prévision: " + resp.weather[0].description);
				message.channel.sendMessage("Temperature: " + resp.main.temp + " K");
				message.channel.sendMessage("Vent : " + resp.wind.speed + " m/s");
				message.channel.sendMessage("Humidité: " + resp.main.humidity + " %");
				message.channel.sendMessage("Pression: " + resp.main.pressure + " kPa");
				//message.reply(resp2.replace(/'/g,"&#039;").replace(/"/,"&quot;"));
				
			});
		
	}

	
	
	if (message.content.toUpperCase().startsWith("!IMAGE")) { //
		
		///message.reply('image');
		/*
		var endpoint = new GalleryEndpoint(client);
		var image = await endpoint.GetGalleryTagImageAsync("GALLERY_ITEM_ID", "cat");
		var https = require('https');

		var options = {
		  hostname: 'api.imgur.com',
		  path: '/3/gallery/search/time/1/?q='+args[1],
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
		
	}
	
	if (message.content.toUpperCase().startsWith('!ISS')) { //
		
		//message.reply('iss');
		
	}
});



app.listen(process.env.PORT || 5000);
