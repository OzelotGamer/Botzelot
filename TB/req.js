const dotenv = require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
	connection: {
		reconnect: true
		},
       channels: ['iamozelotgamer','TTv_Respect101','mydoorfellintoperson'],
	identity: {
		username: process.env.TBU,
		password: process.env.TAT
	},
});

var queueOutput = "";
var extendedQueueOutput = "";
var currentlyPlayedLevel = {"levelId":0,"requester":"Username"};
var requestedLevels = [];
var selfcmd = 0;
var request = 1;
var maxQueueLength = 15;
var furrys = ['OwO','UwU','^w^','>w<','-w-','YwY','~w~','*w*','^o^','^v^','≧ω≦','↖(^ω^)↗','(｡ŏ_ŏ)','Σ>―(〃°ω°〃)♡→'];
var marotkiwsreasonstobeuwu = ['he is UwU.','he is Femboy.','he is a good Moderator.','he is a dedicated Viewer.','he likes to be UwU.','he is OwO too.','there are so many reasons for him to be UwU.','it just is like that.','because.','there is no reason for him not to be UwU.','UwU.','yes.','UUUUUwwwwwUUUUU.',' yeah just because :).'];

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(`Message: <${tags['display-name']}> ${message} | Channel: ${channel} | Badges: ${tags['badges-raw']} | Botmessage: ${self}`);
					if(Number.isInteger(parseInt(message)) && !self){
						if(request == 1){
		if(!requestedLevels.includes(parseInt(message))){
			if(parseInt(message) < 200000000 && parseInt(message) > 128){
				if(requestedLevels.length < maxQueueLength){
					var requestInfo = {"levelId":0,"requester":"Username"};
					requestInfo.levelId = parseInt(message);
					requestInfo.requester = tags['display-name'];
					console.log(requestInfo);
				requestedLevels.push(requestInfo);
		client.say(channel, `@${tags.username}, requested: ${requestInfo.levelId} it's in position: ${requestedLevels.length}`);
		console.log(requestedLevels);
	}
	else{
		client.say(channel, `@${tags.username}, sorry the queue is full.`);
		}
				}
				else{
					client.say(channel, `@${tags.username}, are you sure that is a real id?`);
					}
			}
			else{
				client.say(channel, `@${tags.username}, level already requested!`);
				}
		}
		else{
		client.say(channel, `@${tags.username}, requests are off!`);
		}
	}	
					if(!message.startsWith('!')) return;
					
	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();
	if(command === 'help') {
		client.say(channel, `@${tags.username}, here is the list: Anyone(!request, !r, !queue, !q, !info) Admins+(!next, !start, !stop, !clear) Streamer(!maxlevels, !ml)`);
	}
	if(command === 'request' || command === 'r') {
		if(request == 1){
		if(args.length == 1 && Number.isInteger(parseInt(args)) && !requestedLevels.includes(parseInt(args))){
			if(parseInt(args) < 200000000 && parseInt(args) > 128){
				if(requestedLevels.length < maxQueueLength){
			requestInfo.levelId = parseInt(message);
					requestInfo.requester = tags['display-name'];
					console.log(requestInfo);
				requestedLevels.push(requestInfo.toString());
		client.say(channel, `@${tags.username}, requested: ${requestInfo.levelId} it's in position: ${requestedLevels.length}`);
		console.log(requestedLevels);
	}
	else{
		client.say(channel, `@${tags.username}, sorry the queue is full.`);
		}
	}
	else{
		client.say(channel, `@${tags.username}, your level id is probably not a level.`);
		}
	}
	else{
		client.say(channel, `@${tags.username}, no id, invalid id or you put brackets. Use !request like this: !request [Level ID]`);
		}
	}
	else{
		client.say(channel, `@${tags.username}, requests are currently off.`);
	}
	}
	if(command === 'next') {
		if(tags['badges-raw']){
			if(tags['badges-raw'].includes("moderator/1") || tags['badges-raw'].includes("broadcaster/1") || tags.username == 'iamozelotgamer'){
		if(requestedLevels.length == 0){
			client.say(channel, `@${tags.username}, no queued levels.`);
			}
			else{
				currentlyPlayedLevel = requestedLevels.shift();
				console.log(currentlyPlayedLevel);
		client.say(channel, `${currentlyPlayedLevel.levelId}`);
		console.log(requestedLevels);
	}
	}
	else{
		client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
		}
	}
	else{
		client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
		}
	}
	if(command === 'queue' || command === 'q') {
		if(args == 'e' || args == 'extended'){
			extendedQueueOutput = "";
				for(i=0;i<requestedLevels.length;i++){
					extendedQueueOutput += `${requestedLevels[i].levelId} requested by ${requestedLevels[i].requester}, `;
					}
					extendedQueueOutput = extendedQueueOutput.slice(0, -2) + '.';
					console.log(extendedQueueOutput);
		client.say(channel, `@${tags.username}, here is the queue: ${extendedQueueOutput}`);
			}
			else{
				queueOutput = "";
				for(i=0;i<requestedLevels.length;i++){
					queueOutput += `${requestedLevels[i].levelId}, `;
					}
					queueOutput = queueOutput.slice(0, -2) + '.';
					console.log(queueOutput);
		client.say(channel, `@${tags.username}, here is the queue: ${queueOutput}`);
	}
	}
	if(command === 'stop') {
		if(tags['badges-raw']){
		if(tags['badges-raw'].includes("moderator/1") || tags['badges-raw'].includes("broadcaster/1") || tags.username == 'iamozelotgamer'){
		request = 0;
		client.say(channel, `@${tags.username}, Levels can no longer be reqested!`);
	}
	else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
}
else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
	}
	if(command === 'start') {
		if(tags['badges-raw']){
		if(tags['badges-raw'].includes("moderator/1") || tags['badges-raw'].includes("broadcaster/1") || tags.username == 'iamozelotgamer'){
		request = 1;
		client.say(channel, `@${tags.username}, Levels can now be reqested!`);
	}
	else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
}
else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
	}
	if(command === 'clear') {
		if(tags['badges-raw']){
		if(tags['badges-raw'].includes("moderator/1") || tags['badges-raw'].includes("broadcaster/1") || tags.username == 'iamozelotgamer'){
		requestedLevels = [];
		client.say(channel, `@${tags.username}, queue cleared!`);
	}
	else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
}
else{
	client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
	}
	}
	if(command === 'maxlevels' || command === 'ml') {
		if(tags['badges-raw']){
			if(tags['badges-raw'].includes("broadcaster/1") || tags.username == 'iamozelotgamer'){
		maxQueueLength = parseInt(args);
		client.say(channel, `@${tags.username}, queue length set to: ${maxQueueLength}`);
		console.log(maxQueueLength);
	}
	else{
		client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
		}
	}
	else{
		client.say(channel, `@${tags.username}, you have not the permission to use this command.`);
		}
	}
	if(command === 'furry') {
		client.say(channel, `${furrys[Math.floor(Math.random() * furrys.length)]}`);
	}
	if(command === 'uwu') {
		client.say(channel, ` @marotkiw_ is UwU because: ${marotkiwsreasonstobeuwu[Math.floor(Math.random() * marotkiwsreasonstobeuwu.length)]}`);
	}
	if(command === 'info') {
		client.say(channel, `@${tags.username}, the current levels ID is: ${currentlyPlayedLevel.levelId} and got requested by: ${currentlyPlayedLevel.requester}`);
	}
});
