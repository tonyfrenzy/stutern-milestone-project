let memberForm = document.getElementById('memberForm');
let addBtn = document.getElementById('addBtn');
let membersList = document.getElementById('membersList');
let membersTable = document.getElementById('membersTable');
let membersJson = document.getElementById('membersJson');
let delMemberBtn = document.getElementById('delMemberBtn');

let firstname = document.getElementById('firstname');
let surname   = document.getElementById('surname');
let age 	  = document.getElementById('age');
let level 	  = document.getElementById('level');
let club 	  = document.getElementById('club');

let members = JSON.parse(localStorage.getItem("membersList"));

window.onload = function(e) {
// window.addEventListener("load", function(e) {
	// console.log(members);

	loadMemberList();	
// });   
};   

addBtn.addEventListener("click", function(e) {
	e.preventDefault();
	// validateForm();

	for (let i=0; i < memberForm.elements.length; i++) {
		if (memberForm.elements[i].value === '' && memberForm.elements[i].hasAttribute('required')) {
			// alert('There are some required fields!');
			if (memberForm.elements[i].name == 'firstname') { 
				firstnameErrorDiv.innerText = 'First name field is required!';
				firstname.style.borderColor = 'red';
				firstnameErrorDiv.style.display = 'block';
			} else {
				firstnameErrorDiv.style.display = 'none';
				firstname.style.borderColor = '';}
			if (memberForm.elements[i].name == 'surname') { 
				surnameErrorDiv.innerText = 'Surname field is required!';
				surname.style.borderColor = 'red';
				surnameErrorDiv.style.display = 'block';
			} else {
				surnameErrorDiv.style.display = 'none';
				surname.style.borderColor = '';}
			if (memberForm.elements[i].name == 'age') { 
				ageErrorDiv.innerText = 'Age field is required!';
				age.style.borderColor = 'red';
				ageErrorDiv.style.display = 'block';
			} else {
				ageErrorDiv.style.display = 'none';
				age.style.borderColor = '';}
			if (memberForm.elements[i].name == 'level') { 
				levelErrorDiv.innerText = 'Member level is required!';
				level.style.borderColor = 'red';
				levelErrorDiv.style.display = 'block';
			} else {
				levelErrorDiv.style.display = 'none';
				level.style.borderColor = '';}
			return false;
		}
	}
	// let lastGrabbed = document.querySelector('form small .alert-danger');
	// console.log(lastGrabbed);
	// lastGrabbed.style.display = "none";
	// // memberForm.submit();

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

	memberForm.reset();

	// Add new member and save to local storage.
	members.push(newMember);
	let storedList = JSON.stringify(members);
	localStorage.setItem("membersList", storedList);

	loadMemberList();
})

let delMember = (index) => {
	// Retrieve
	members = JSON.parse(localStorage.getItem("membersList"));
	members.splice(index, 1);

	let storedList = JSON.stringify(members);
	localStorage.setItem("membersList", storedList);

	loadMemberList();
}

// Load members list for localStorage.
let loadMemberList = () => {
	let members = JSON.parse(localStorage.getItem("membersList"));

	membersJson.innerHTML = JSON.stringify(members, null, 2);
	membersList.innerHTML = members.map((member, i) => {
		let serial = i + 1;

		let memberRow = `<tr><td title="${member.uniqueId}">${serial}</td>
		<td>${member.firstname} ${member.surname}</td>
		<td>${member.age}</td>
		<td>${member.level}</td>
		<td>${member.club}</td>
		<td><button class="btn btn-danger p-1" onclick="delMember(${i})">x</button></td></tr>`;

		return memberRow;
	})
	.join(''); // Remove trailing ',' commas.
}
