const Discord = require('discord.js');
const bot = new Discord.Client(); //client est le bot

var blague = require('./blague.js');
var meteo = require('./meteo.js');
var image = require('./image.js');
var iss = require('./iss.js');
var math = require('./math.js');

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


// BLAGUE
bot.on('message', message => {   //A chaque fois qu'un message est envoye; on va excecuter => {}
	
	//var input = message.content.toUpperCase();

	//let args = input.split('');
	let prefix = '!';


	if (message.content.toUpperCase().startsWith(prefix+'BLAGUE')) { 

		message.reply('blague');

		var joke;
		$.getJSON('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1', function(data) {	
		
			joke = data;
		});
		var obj = JSON.prase(joke);
		message.reply(obj.fact);
		
	}
	
	if ( (args[0] === (prefix+'MÉTÉO')) || (args[0] === (prefix+'METEO')) ) { //
		

		message.reply('meteo');
	}
	
	if (message.content.toUpperCase().startsWith(prefix+'IMAGE')) { //

		
		message.reply('image');
		/*
		var client = new ImgurClient("CLIENT_ID");
		var endpoint = new GalleryEndpoint(client);
		var image = await endpoint.GetGalleryTagImageAsync("GALLERY_ITEM_ID", "cat");
		*/
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


	console.log(message);
});




app.listen(process.env.PORT || 5000);
