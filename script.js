/* ============================================================
    1. DATA SECTION: Yahan sara khana aur deals save hain
   ============================================================ */

// 'myFood' aik Array hai jis mein Objects ki shakal mein menu items hain
const myFood = [
    { name: "Supreme Cheese Pizza", price: "1250", pic: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&w=400" },
    { name: "Crispy Zinger Burger", price: "580", pic: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&w=400" },
    { name: "Masala French Fries", price: "350", pic: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400" }
];

// Combo deals ka data
const cheeziousDeals = [
    { name: "Small Combo", desc: "1 Small Pizza, 1 Drink", price: "750", pic: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&w=400" },
    { name: "Family Feast", desc: "2 Large Pizzas, 1.5L Drink", price: "3400", pic: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=400" }
];

// Sasti Student deals ka data
const studentDeals = [
    { name: "Student Buddy Pack", price: "450", pic: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&w=400", desc: "Burger + Cold Drink" },
    { name: "Choco Blast Ice Cream", price: "150", pic: "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&w=400", desc: "Double Scoop Cone" },
    { 
        name: "Summer Chiller Drink", 
        price: "120", 
        pic: "https://placehold.jp/24/ffcc00/ffffff/400x400.png?text=CHILLED+DRINK+🍹", 
        desc: "Chilled Soft Drink 500ml" 
    },
    { name: "Exam Relief Combo", price: "300", pic: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400", desc: "Large Fries + Ice Cream" }
];

/* ============================================================
    2. CART LOGIC: Kharedari ka hisab kitab
   ============================================================ */

let cart = []; // Khali array jis mein select kiye gaye items jama honge
let total = 0; // Kul bill (Total price) store karne ke liye

// Function: Jab koi "Add to Cart" dabaye to kya ho
function addToCart(name, price) {
    // Price ko saaf karke number mein badalte hain (remove commas)
    let cleanPrice = parseInt(price.toString().replace(/,/g, ''));
    
    // Naya item cart array mein shamil karna
    cart.push({ name: name, price: cleanPrice });
    
    // Bill mein naye item ki qeemat jama karna
    total += cleanPrice;
    
    // Screen par cart icon ke upar ginti update karna
    document.getElementById('cart-count').innerText = cart.length;
    alert(name + " added to cart!");
}

// Function: Cart ka popup box kholne ya band karne ke liye
function toggleModal() {
    const modal = document.getElementById('cart-modal');
    // Agar band hai to khol do, agar khula hai to band kar do
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
        showCartItems(); // Khulne par items ki list dikhao
    } else {
        modal.style.display = "none";
    }
}

// Function: Cart ke andar ki list ko update karna
function showCartItems() {
    const list = document.getElementById('cart-items-list');
    const billDisplay = document.getElementById('total-bill');
    list.innerHTML = ""; // Pehle list ko khali karo
    
    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding: 10px;'>Cart Khali Hai!</p>";
    } else {
        // Loop chala kar har item ko cart modal mein display karna
        cart.forEach(item => {
            list.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
                    <span>${item.name}</span>
                    <span>Rs. ${item.price}</span>
                </div>`;
        });
    }
    // Final bill update karna
    billDisplay.innerText = total;
}

// Function: Order finalize karne ke liye
function confirmOrder() {
    if(cart.length === 0) {
        alert("Ahmad bhai, pehle cart mein kuch daal to lein!");
        return;
    }
    alert("🎉 Order Confirmed! Total Bill: Rs. " + total);
    
    // Order ke baad sab zero/khali kar dena
    cart = [];
    total = 0;
    document.getElementById('cart-count').innerText = "0";
    toggleModal(); 
}

/* ============================================================
    3. DISPLAY LOGIC: Website par data load karna
   ============================================================ */

// Ye function tab chalta hai jab website load hoti hai
function loadEverything() {
    // Containers ko target karna jahan cards nazar ayenge
    const menuContainer = document.getElementById('food-container');
    const dealsContainer = document.getElementById('deals-container');
    const studentContainer = document.getElementById('student-container');

    // 1. Regular Menu load karna (using forEach Loop)
    if(menuContainer) {
        menuContainer.innerHTML = ""; 
        myFood.forEach(item => {
            menuContainer.innerHTML += `
                <div class="dish-card">
                    <img src="${item.pic}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <span class="price">Rs. ${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart('${item.name}', '${item.price}')">Add to Cart</button>
                </div>`;
        });
    }

    // 2. Deals Section load karna
    if(dealsContainer) {
        dealsContainer.innerHTML = "";
        cheeziousDeals.forEach(deal => {
            dealsContainer.innerHTML += `
                <div class="deal-card">
                    <img src="${deal.pic}" class="deal-image" alt="${deal.name}">
                    <div class="deal-info">
                        <h3>${deal.name}</h3>
                        <p>${deal.desc}</p>
                        <div class="deal-price-tag">Rs. ${deal.price}</div>
                        <button class="deal-btn" onclick="addToCart('${deal.name}', '${deal.price}')">Add Deal</button>
                    </div>
                </div>`;
        });
    }

    // 3. Student Section load karna
    if(studentContainer) {
        studentContainer.innerHTML = "";
        studentDeals.forEach(deal => {
            studentContainer.innerHTML += `
                <div class="dish-card">
                    <img src="${deal.pic}" alt="${deal.name}">
                    <h3>${deal.name}</h3>
                    <p style="font-size:0.8rem; color:#666; margin-bottom:5px;">${deal.desc}</p>
                    <span class="price">Rs. ${deal.price}</span>
                    <button class="add-to-cart" onclick="addToCart('${deal.name}', '${deal.price}')">Student Order</button>
                </div>`;
        });
    }
}

// Browser jab poori tarah khul jaye tab loadEverything() ko bulao
window.onload = loadEverything;