const deleteProductButtonElements = document.querySelectorAll(".product-item-actions button");

async function deleteProduct(event) {
  const deleteButtonElement = event.target;
  const productId = deleteButtonElement.dataset.productid;
  const csrfToken = deleteButtonElement.dataset.csrf;

  const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
    method: "DELETE",
  });

  //const resJson = await response.json();
  //console.log(resJson);

  if (!response.ok) {
    // 상태코드가 400, 500번대이면 false 값이다.
    alert("잘못된 요청입니다.");
    return;
  }

  deleteButtonElement.parentElement.parentElement.parentElement.parentElement.remove(); // 해당 상품 리스트 삭제.
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}
