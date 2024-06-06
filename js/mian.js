const allCart = [];

function incrBtn(id) {
    const escapedId = CSS.escape(`${id}_incr`);
    let button = document.querySelector(`#${escapedId}`);
    button.style = 'width:38px';
    button.classList.add('active');
    button.textContent = '';
    let parent = button.closest('.cafe-item');
    let counter = parent.querySelector('.js-item-counter');
    let decriment = parent.querySelector('.cafe-item-decr-button');
    counter.style = "display: inline-block; transform: scale(1.05) !important;";
    setTimeout(() => {
        counter.style = "display: inline-block; transform:scale(1) !important;";
    }, 100);
    let num = parseInt(counter.textContent);
    num++;
    counter.textContent = num;
    document.querySelector('.cafe-status').style = "visibility:visible;transform:none";
    if (num > 0) {
        decriment.style = "pointer-events: auto; visibility:visible";
    }
    document.querySelectorAll('.js-item-counter').forEach(count => {
        let allcount = Number(count.textContent);
        
        
        if (allcount > 0) {
            document.querySelector('.cafe-status').style = "visibility:visible;transform:none";
        }
    });

    let cartCounter = Number(parent.querySelector('.js-item-counter').textContent);
    let cartName = parent.querySelector('.cafe-item-title').textContent;
    let cartPrice = parent.querySelector('.cafe-item-price').textContent;
    let cartImg = parent.querySelector('.cafe-item-photo img').src;

    let cart = {
        name: cartName,
        price: cartPrice,
        count: cartCounter,
        img: cartImg
    };

    // Check if the item already exists in the cart
    let existingCartItem = allCart.find(item => item.name === cart.name);

    if (existingCartItem) {
        // Update the count of the existing item
        existingCartItem.count = cartCounter;
    } else {
        // Add new item to the cart
        allCart.push(cart);
    }
}

// Обработка кнопки уменьшения
function decrBtn(id) {
    const escapedId = CSS.escape(`${id}_decr`);
    let descbtn = document.querySelector(`#${escapedId}`);
    let parent = descbtn.closest('.cafe-item');
    let counter = parent.querySelector('.js-item-counter');
    let increment = parent.querySelector('.cafe-item-incr-button');
    counter.style = "display: inline-block;transform:scale(0.9) !important;";
    setTimeout(() => {
        if(Number(counter.textContent) == 0){
            counter.style = "display: none";

        } else {
            counter.style = "display: inline-block; transform:scale(1) !important;";
        }
    }, 100);
    let num = parseInt(counter.textContent);
    if (num > 0) {
        num--;
    }
    counter.textContent = num;

    // Обновление общего состояния кафе
    let totalCount = Array.from(document.querySelectorAll('.js-item-counter'))
        .map(counter => Number(counter.textContent))
        .reduce((total, num) => total + num, 0);

    if (totalCount == 0) {
        document.querySelector('.cafe-status').style = "visibility:hidden;transform: translateY(var(--status-height));";
    } else {
        document.querySelector('.cafe-status').style = "visibility:visible;transform:none";
    }

    // Обновление стилей кнопок и счетчика
    if (num == 0) {
        descbtn.style.visibility = 'hidden';
        increment.style = "width: 80px";
        increment.classList.remove('active');
        increment.textContent = 'Add';
        counter.style = "display: none !important";
    }
    
    let cartName = parent.querySelector('.cafe-item-title').textContent;
    let cartCounter = Number(parent.querySelector('.js-item-counter').textContent);

    const existingCartItem = allCart.find(item => item.name === cartName);

    if (existingCartItem) {
        if (cartCounter > 0) {
            // Update the count of the existing item
            existingCartItem.count = cartCounter;
        } else {
            // Remove item if count is zero
            allCart.splice(allCart.indexOf(existingCartItem), 1);
        }
    }

}

let count = document.querySelectorAll('.js-item-counter').forEach(count => {
    let allcount = count.textContent
    console.log(allcount);
})

document.querySelector('.cafe-status-wrap').addEventListener('click', () => {
    document.querySelector('.cafe-order-overview').style = 'opacity:1;transform: translateY(0vh);z-index:9999'
    document.querySelector('.cafe-page').style = 'display: none'
    let cartHtml = allCart.map(item => `
    <div class="cafe-order-item js-order-item" data-item-id="${item.id}">
    <div class="cafe-order-item-photo">
        <picture class="cafe-item-lottie js-item-lottie">
            <source type="application/x-tgsticker" srcset="./img/cafe/Burger.tgs">
            <img src="${item.img}"
                style="background-image: url('${item.img}');">
        </picture>
    </div>
    <div class="cafe-order-item-label">
        <div class="cafe-order-item-title">
            ${item.name}
            <span class="cafe-order-item-counter">
                <span class="js-order-item-counter">${item.count}</span>
                x
            </span>
        </div>
        <div class="cafe-order-item-description">${item.desc}</div>
    </div>
    <div class="cafe-order-item-price js-order-item-price">${item.price}</div>
</div>
    `)

    document.querySelector('.cafe-order-items').innerHTML = cartHtml.join('')
    console.log(allCart);
})

document.querySelector('.js-order-edit').addEventListener('click', () => {
    document.querySelector('.cafe-page').style = 'display: flex'
    document.querySelector('.cafe-order-overview').style = 'opacity:0;transform: translateY(100vh);z-index:-1'
})