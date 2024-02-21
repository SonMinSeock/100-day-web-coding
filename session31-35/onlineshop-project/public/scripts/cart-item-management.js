const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    responase = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId,
        quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("전송하는데 에러 발생했습니다!");
    return;
  }

  if (!response.ok) {
    alert("전송하는데 에러 발생했습니다!");
    return;
  }

  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
