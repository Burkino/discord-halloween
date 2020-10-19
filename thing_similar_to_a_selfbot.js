const fetch = require('node-fetch')

const guild = GUILD_ID;
const auth = 'discord authorization'

const url = `https://discord.com/api/v8/guilds/${guild}/messages/search?author_id=755580145078632508&has=image&offset=`

let count = 0
let total
let seen = []
async function aaa(page) {
	fetch(`${url}${page}`, { 
		method: 'get', 
		headers: {
			'Authorization': auth, 
		}
	})
	.then(res => res.json())
	.then(body => {
		console.log(count*25)
		for(let mes of body.messages) {
			//console.log(mes[0].id)
			if(!seen.includes(mes[2].embeds[0].image.url)){
				seen.push(mes[2].embeds[0].image.url)
			}
		}
		count++
		console.log(seen)
		if(count*25 >= total) { return }
		aaa(count*25)
	})
}

fetch(`https://discord.com/api/v8/guilds/${guild}/messages/search?author_id=755580145078632508&has=image`, { 
		method: 'get', 
		headers: {
			'Authorization': auth, 
		}
	})
	.then(res => res.json())
	.then(body => {
		total = body.total_results
		aaa(count)
	})
