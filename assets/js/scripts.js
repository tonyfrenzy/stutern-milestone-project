let memberForm = document.getElementById('memberForm');
let addBtn = document.getElementById('addBtn');
let membersList = document.getElementById('membersList');
let delMemberBtn = document.getElementById('delMemberBtn');

let firstname = document.getElementById('firstname');
let surname   = document.getElementById('surname');
let age 	  = document.getElementById('age');
let level 	  = document.getElementById('level');
let club 	  = document.getElementById('club');

let members = [];

addBtn.addEventListener("click", function(e) {
	e.preventDefault();
	// validateForm();

	const ID = function () {
		return (Math.random().toString(36).substr(2, 5) + Date.now().toString(36)).toLowerCase()
	};

	let newMember = {
		uniqueId: ID(),
		firstname: firstname.value,
		surname  : surname.value,
		age 	 : age.value,
		level 	 : level.value,
		club 	 : club.value,
	}

	members.push(newMember);
	// update membersList.json

	memberForm.reset();

	generateMemberTable();
})

let delMember = (index) => {
	// https://www.tutorialspoint.com/find-specific-key-value-in-array-of-objects-using-javascript

	members.splice(index, 1);
	// update membersList.json

	generateMemberTable();
}


let generateMemberTable = () => {
	membersList.innerHTML = members.map((member, serial) => {
		serial +=1;
		return `<tr>
		<td title="${member.uniqueId}">${serial}</td>
		<td>${member.firstname} ${member.surname}</td>
		<td>${member.age}</td>
		<td>${member.level}</td>
		<td>${member.club}</td>
		<td><button class="btn btn-danger p-1" onclick="delMember('${member.uniqueId}')">x</button></td>
		</tr>`
	})
}


let validateForm = () => {
	if (firstname == "" || typeof(firstname) !== String) {
		alert("First name must be filled out with a text");
		return false;
	}
	if (surname == "" || typeof(firstname) !== String) {
		alert("Surname must be filled out with a text");
		return false;
	}
	if (age == "" || typeof(firstname) !== Number) {
		alert("age must be filled out with a number.");
		return false;
	}
	if (level == "Select Level" || typeof(firstname) !== Number) {
		alert("A student level must be selected!");
		return false;
	}
	if (club == "" || typeof(firstname) !== String) {
		alert("Club must be filled out with a text");
		return false;
	}
}