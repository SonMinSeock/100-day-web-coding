const addToCartButtonElement = document.querySelector("#product-details button");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;
  let response;

  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("전송 중에 에러발생 했습니다!");
  }

  if (!response.ok) {
    alert("잘못된 요청입니다!");
    return;
  }
  const responseData = await response.json();
  const newTotalQunatity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQunatity;
}

addToCartButtonElement.addEventListener("click", addToCart);
