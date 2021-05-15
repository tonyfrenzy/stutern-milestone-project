const http = require('http')
const fs = require('fs')
const fetch = require("node-fetch")

let dataDirectory = 'result'
let filePath = fs.mkdir(__dirname + '/' + dataDirectory, { recursive: true }, (err) => {
  if (err) throw err;
});

const server = http.createServer(function (req, res) {
	fetch('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10')
	  .then(response => response.json())
	  .then(json => {
	  	// console.log(json)
		let stringedData = JSON.stringify(json, null, 2)
		fs.writeFileSync(dataDirectory + '/posts.json', stringedData)	  
	  })

	res.writeHead(200)
	res.end('Data fetched & saved successfully!')
})

server.listen(8080, function() {
	console.log('Server is up...')
})


let memberForm = document.getElementById('memberForm');
let firstname = document.getElementById('firstname');
let surname = document.getElementById('surname');
let age = document.getElementById('age');
let level = document.getElementById('level');
let club = document.getElementById('club');
let addBtn = document.getElementById('addBtn');
let membersList = document.getElementById('membersList');

let members = [];

addBtn.addEventListener("click", function(e) {
	e.preventDefault();

	let ID = function () {
	  return (Math.random().toString(36).substr(2, 5) + Date.now().toString(36)).toLowerCase()
	};

	let newMember = {
		uniqueId: ID(),
		firstname: firstname.value,
		surname: surname.value,
		age: age.value,
		level: level.value,
		club: club.value,
	}
	// console.log(newMember.id, (newMember.id).length);

	members.push(newMember);
	// save to/update json file membersList.json

	memberForm.reset();

	membersList.innerHTML = members.map((member, serial) => {
		serial +=1;
		return `<tr>
		<td title="${member.uniqueId}">${serial}</td>
		<td>${member.firstname}</td>
		<td>${member.surname}</td>
		<td>${member.age}</td>
		<td>${member.level}</td>
		<td>${member.club}</td>
		<td><button class="btn btn-danger p-1">x</button></td>
		</tr>`
	})
	// console.log(memberForm);
})