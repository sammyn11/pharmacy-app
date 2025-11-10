// -------------------- Local Storage --------------------
let users = JSON.parse(localStorage.getItem('users')) || [];
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [
    {patient:"John Doe", med:"Paracetamol", qty:2, verified:true},
    {patient:"Jane Smith", med:"Amoxicillin", qty:1, verified:false}
];

// -------------------- Signup --------------------
function signup(){
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('signupPhone').value.trim();
    const address = document.getElementById('signupAddress').value.trim();
    const role = document.getElementById('signupRole').value;

    if(!name||!email||!password||!phone||!address||!role){alert("Fill all required fields");return;}
    if(users.find(u=>u.email===email)){alert("User with this email already exists");return;}

    const newUser = {name,email,password,phone,address,role};
    if(role==="pharmacist"){
        const license=document.getElementById('signupLicense').value.trim();
        const specialization=document.getElementById('signupSpecialization').value.trim();
        if(!license||!specialization){alert("Fill license and specialization");return;}
        newUser.license=license;
        newUser.specialization=specialization;
    }

    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    alert("Signup successful! You can now login.");
}

// -------------------- Login --------------------
function login(){
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('userType').value; // Add role from dropdown

    if(!email || !password || !role){
        alert("Fill all login fields");
        return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if(!user){
        alert("Invalid credentials or role");
        return;
    }

    sessionStorage.setItem('currentUser', JSON.stringify(user));

    if(user.role === "pharmacist"){
        window.location.href = "Pharmacydashboard.html";
    } else if(user.role === "patient"){
        window.location.href = "patient.html";
    }
}

// -------------------- Password Recovery --------------------

function recoverPasswordPage() {
    const email = document.getElementById('recoverEmail').value.trim();
    const newPassword = document.getElementById('recoverNewPassword').value;

    if (!email || !newPassword) {
        alert("Fill in both email and new password.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        alert("Email not found!");
        return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert("Password reset successful! You can now login.");
    window.location.href = "SignUp.html"; 
}



// -------------------- Dashboard Functions --------------------
function logout(){
    sessionStorage.removeItem('currentUser');
    window.location.href="index.html";
}

function initDashboard(){
    const currentUser=JSON.parse(sessionStorage.getItem('currentUser'));
    if(!currentUser||currentUser.role!=="pharmacist"){alert("Access denied. Login as pharmacist.");window.location.href="index.html";return;}

    document.getElementById('pharmaName').textContent=currentUser.name;
    document.getElementById('pharmaLicense').textContent=currentUser.license||"N/A";
    document.getElementById('pharmaSpecialization').textContent=currentUser.specialization||"N/A";

    displayMedicines();
    displayOrders();
}

// ------------- Medicine Management -------------
function displayMedicines() {
    const list = document.getElementById('medicineList');
    if (!list) return;
    list.innerHTML = "";

    medicines.forEach((m, index) => {
        const li = document.createElement('li');
        li.classList.add('medicine-item');  // REQUIRED

        const info = document.createElement('span');
        info.classList.add('medicine-info'); // REQUIRED
        info.textContent = `${m.name} - Qty: ${m.qty}, Price: ${m.price} RWF`;
        info.onclick = () => {
            document.getElementById('medName').value = m.name;
            document.getElementById('medQty').value = m.qty;
            document.getElementById('medPrice').value = m.price;
        };

        const actions = document.createElement('span');
        actions.classList.add('medicine-actions'); // REQUIRED

        const updateBtn = document.createElement('button');
        updateBtn.textContent = "Update";
        updateBtn.onclick = () => updateMedicine(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteMedicine(index);

        actions.appendChild(updateBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(actions);

        list.appendChild(li);
    });
}



function addMedicine(){
    const name=document.getElementById('medName').value.trim();
    const qty=parseInt(document.getElementById('medQty').value);
    const price=parseFloat(document.getElementById('medPrice').value);
    if(!name||isNaN(qty)||isNaN(price)){alert("Fill all fields correctly.");return;}
    if(medicines.find(m=>m.name.toLowerCase()===name.toLowerCase())){alert("Medicine already exists. Use list to update.");return;}
    medicines.push({name,qty,price});
    localStorage.setItem('medicines',JSON.stringify(medicines));
    displayMedicines(); clearMedicineInputs();
}

function updateMedicine(index){
    const qty=parseInt(document.getElementById('medQty').value);
    const price=parseFloat(document.getElementById('medPrice').value);
    if(isNaN(qty)||isNaN(price)){alert("Fill all fields correctly.");return;}
    medicines[index].qty=qty; medicines[index].price=price;
    localStorage.setItem('medicines',JSON.stringify(medicines)); displayMedicines(); clearMedicineInputs();
}

function deleteMedicine(index){
    if(!confirm(`Delete ${medicines[index].name}?`)) return;
    medicines.splice(index,1); localStorage.setItem('medicines',JSON.stringify(medicines)); displayMedicines(); clearMedicineInputs();
}

function clearMedicineInputs(){document.getElementById('medName').value='';document.getElementById('medQty').value='';document.getElementById('medPrice').value='';}


// -------------------- Orders Management --------------------
function displayOrders(){
    const list = document.getElementById('ordersList');
    if(!list) return;
    list.innerHTML = "";

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach((order,index)=>{
        const li = document.createElement('li');
        li.className = "medicine-item";

        const info = document.createElement('span');
        info.innerHTML = `<strong>${order.patient}</strong> ordered <em>${order.med}</em> x ${order.qty}`;

        const actions = document.createElement('span');
        actions.className = "medicine-actions";

        const verifyBtn = document.createElement('button');
        verifyBtn.className = "action-btn";
        verifyBtn.textContent = order.verified ? "Verified ✅" : "Verify";
        verifyBtn.disabled = order.verified;
        verifyBtn.onclick = ()=> verifyOrder(index);

        actions.appendChild(verifyBtn);
        li.appendChild(info);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

// Verify order and update stock
function verifyOrder(index){
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];

    const order = orders[index];
    const med = medicines.find(m=>m.name.toLowerCase()===order.med.toLowerCase());

    if(!med){
        alert(`Medicine ${order.med} not in stock.`);
        return;
    }
    if(med.qty < order.qty){
        alert(`Not enough stock for ${order.med}. Available: ${med.qty}`);
        return;
    }

    // Deduct stock and mark verified
    med.qty -= order.qty;
    order.verified = true;

    localStorage.setItem('medicines', JSON.stringify(medicines));
    localStorage.setItem('orders', JSON.stringify(orders));

    displayMedicines();
    displayOrders();
}

