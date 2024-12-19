const products = [
  {
    id: 1,
    name: "Classy Modern Smart watch",
    sizes: [
      { id: 1, size: "S", price: 69 },
      { id: 2, size: "M", price: 79 },
      { id: 3, size: "L", price: 89 },
      { id: 4, size: "XL", price: 99 },
    ],
    color: "purple",
    colorId: "pPurple",
  },
  {
    id: 2,
    name: "Classy Modern Smart watch",
    sizes: [
      { id: 1, size: "S", price: 69 },
      { id: 2, size: "M", price: 79 },
      { id: 3, size: "L", price: 89 },
      { id: 4, size: "XL", price: 99 },
    ],
    color: "cyan",
    colorId: "pCyan",
  },
  {
    id: 3,
    name: "Classy Modern Smart watch",
    sizes: [
      { id: 1, size: "S", price: 69 },
      { id: 2, size: "M", price: 79 },
      { id: 3, size: "L", price: 89 },
      { id: 4, size: "XL", price: 99 },
    ],
    color: "blue",
    colorId: "pBlue",
  },
  {
    id: 4,
    name: "Classy Modern Smart watch",
    sizes: [
      { id: 1, size: "S", price: 69 },
      { id: 2, size: "M", price: 79 },
      { id: 3, size: "L", price: 89 },
      { id: 4, size: "XL", price: 99 },
    ],
    color: "black",
    colorId: "pBlack",
  },
];

const cart = [];
let selectedColor = "purple";
let selectedSize = "M";
let selectedPrice = 79;
let quantity = 1;

document.addEventListener("DOMContentLoaded", () => {
  // Handle rendering stars
  function renderStars(rating, totalStars = 5) {
    const starsContainer = document.getElementById("stars");
    starsContainer.innerHTML = "";

    const fullStarImage = "/star-fill.svg";
    const halfStarImage = "/star-half-fill.svg";
    const emptyStarImage = "/star.svg";

    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - filledStars - halfStar;

    for (let i = 0; i < filledStars; i++) {
      const img = document.createElement("img");
      img.src = fullStarImage;
      img.alt = "Filled star";
      img.classList.add("star");
      starsContainer.appendChild(img);
    }

    if (halfStar > 0) {
      const img = document.createElement("img");
      img.src = halfStarImage;
      img.alt = "Half star";
      img.classList.add("star");
      starsContainer.appendChild(img);
    }

    for (let i = 0; i < emptyStars; i++) {
      const img = document.createElement("img");
      img.src = emptyStarImage;
      img.alt = "Empty star";
      img.classList.add("star");
      starsContainer.appendChild(img);
    }
  }

  // Handle color rendering
  function RenderColor() {
    const bandColorsContainer = document.getElementById("bandColorsContainer");
    const sliderImages = document.querySelectorAll(".slider-img");

    const colors = products.map((product) => ({
      id: `${product.color}-radio`,
      label: product.color,
      bgColor: product.color,
      sizes: product.sizes,
      colorId: product.colorId,
    }));

    bandColorsContainer.innerHTML = "";

    colors.forEach((colorOption) => {
      const label = document.createElement("label");
      label.setAttribute("for", colorOption.id);
      label.classList.add("color-tag");
      label.style.backgroundColor = `var(--${colorOption.colorId})`;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "ColorOption";
      input.value = colorOption.label;
      input.id = colorOption.id;
      input.classList.add("sr-only");

      if (colorOption.label === "purple") input.checked = true;

      input.addEventListener("change", () => {
        selectedColor = input.value;
        const product = products.find((p) => p.color === selectedColor);
        if (product) {
          selectedSize = product.sizes[0].size;
          selectedPrice = product.sizes[0].price;
          sliderImages.forEach((sliderImg) => {
            const sliderColor = sliderImg.getAttribute("data-image");
            if (sliderColor === selectedColor) {
              sliderImg.style.opacity = 100;
            } else {
              sliderImg.style.opacity = 0;
            }
          });
        }
      });

      label.appendChild(input);
      bandColorsContainer.appendChild(label);
    });
  }

  // Handle sizes rendering
  function RenderSizes() {
    const container = document.getElementById("sizes-container");
    container.innerHTML = "";

    const currentProduct = products.find(
      (product) => product.color === selectedColor
    );

    if (!currentProduct) return;

    currentProduct.sizes.forEach((size) => {
      const sizeOption = document.createElement("div");

      sizeOption.innerHTML = `
      <fieldset class="flex gap-4 items-center">
        <div>
          <label
            for="size${size.id}"
            class="flex has-[:checked]:ring-2 has-[:checked]:ring-offset-2 cursor-pointer ring-primary items-center justify-between gap-4 rounded-lg border border-gray-100 bg-gray-50 py-2 px-4 text-sm font-medium shadow-sm hover:border-gray-200"
          >
            <p class="font-semibold">${size.size}</p>
            <p class="text-mutedforeground">$${size.price}</p>
            <input
              type="radio"
              name="sizeOption"
              value="${size.price}"
              id="size${size.id}"
              class="sr-only"
            />
          </label>
        </div>
      </fieldset>
    `;

      const input = sizeOption.querySelector("input");
      const discoundPrice = document.querySelector("#discountedPrice");
      const price = document.querySelector("#price");
      if (size.size === selectedSize) input.checked = true;
      input.addEventListener("change", () => {
        selectedPrice = parseFloat(input.value);
        selectedSize = size.size;
        discoundPrice.innerHTML = `$` + selectedPrice;
        price.innerHTML = `$` + (selectedPrice + 10);
      });

      container.appendChild(sizeOption);
    });
  }

  // Add to Cart
  function HandleAddToCart() {
    const product = products.find((p) => p.color === selectedColor);
    if (!product) return;

    const cartItem = {
      id: product.id,
      selectedSize,
      selectedColor,
      price: selectedPrice,
      quantity: quantity,
    };

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.selectedSize === cartItem.selectedSize &&
        item.selectedColor === cartItem.selectedColor
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    if (cart.length > 0) {
      const checkoutButton = document.querySelector("#checkout-button");
      checkoutButton.querySelector(".quantity").innerHTML = cart.length;
      checkoutButton.style.opacity = 100;
      RenderCheckoutItems();
    }
  }

  const addToCartButton = document.getElementById("add-to-cart-button");
  addToCartButton.addEventListener("click", HandleAddToCart);

  const decrementButton = document.querySelector(
    'button[aria-label="decrease-quantity"]'
  );
  const incrementButton = document.querySelector(
    'button[aria-label="increase-quantity"]'
  );
  const quantityInput = document.getElementById("Quantity");

  // Decrease Quantity
  decrementButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
    }
  });

  // Increase Quantity
  incrementButton.addEventListener("click", () => {
    quantity++;
    quantityInput.value = quantity;
  });

  const checkoutButton = document.getElementById("checkout-button");
  checkoutButton.addEventListener("click", () => {
    const overlay = document.getElementById("cart-overlay");
    const cartContainer = document.getElementById("cart-container");
    overlay.classList.remove("pointer-events-none");
    overlay.style.opacity = 100;
    cartContainer.classList.add("translate-y-0");
    overlay.addEventListener("click", (e) => {
      if (!cartContainer.contains(e.target)) {
        overlay.style.opacity = 0;
        overlay.classList.add("pointer-events-none");
      }
    });
  });

  function RenderCheckoutItems() {
    if (cart.length > 0) {
      const tableBody = document.getElementById("cart-table-body");
      tableBody.innerHTML = "";

      let totalQuantity = 0;
      let totalPrice = 0;

      cart.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price;
        const tableRow = document.createElement("tr");
        tableRow.classList.add("border-b");

        tableRow.innerHTML = `
          <td class="py-2 pr-2 flex items-center gap-2">
            <div class="size-10 rounded-md overflow-hidden">
              <img
                src="./${item.selectedColor}.jpg"
                alt="${item.selectedColor}-watch"
                class="object-cover"
              />
            </div>
            <span class="max-w-[200px] sm:max-w-none text-left inline-block break-words">Classy Modern Smart watch</span>
          </td>
          <td class="py-2 px-2 capitalize">${item.selectedColor}</td>
          <td class="py-2 px-2 font-semibold">${item.selectedSize}</td>
          <td class="py-2 px-2 font-semibold">${item.quantity}</td>
          <td class="py-2 pl-2 font-semibold text-right">$${item.price.toFixed(
            2
          )}</td>
        `;
        tableBody.appendChild(tableRow);
      });

      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
        <td class="py-4 pr-2 font-semibold text-left">Total</td>
        <td class="py-4 px-2 font-normal"></td>
        <td class="py-4 px-2 font-normal"></td>
        <td class="py-4 px-2 font-semibold">${totalQuantity}</td>
        <td class="py-4 pl-2 font-semibold text-right">$${totalPrice.toFixed(
          2
        )}</td>
      `;

      tableBody.appendChild(totalRow);
    }
  }

  const heartSvg = document.querySelector("#heart-svg svg");

  heartSvg.addEventListener("click", () => {
    const current = heartSvg.getAttribute("fill");
    if (current === "none") {
      heartSvg.setAttribute("fill", "var(--primary)");
    } else {
      heartSvg.setAttribute("fill", "none");
    }
  });

  // Render initial UI
  renderStars(4.5);
  RenderColor();
  RenderSizes();
});
