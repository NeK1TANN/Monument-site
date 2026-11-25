document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('standaloneOrderForm');
  const orderSuccess = document.getElementById('orderSuccess');
  const subjectSelect = document.getElementById('order-subject');
  const successSubject = document.getElementById('successSubject');

  // Подставляем выбранное изделие из URL (?subject=...) на странице order.html
  if (subjectSelect) {
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject');

    if (subjectParam) {
      const matchingOption = Array.from(subjectSelect.options).find(
        (option) => option.value.toLowerCase() === subjectParam.toLowerCase()
      );

      if (matchingOption) {
        subjectSelect.value = matchingOption.value;
      } else {
        const customOption = new Option(subjectParam, subjectParam, true, true);
        subjectSelect.add(customOption);
      }
    }
  }

  // Обработка отправки формы на странице order.html
  if (orderForm && orderSuccess) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const chosenSubject = subjectSelect ? subjectSelect.value : 'Консультация';

      if (successSubject) {
        successSubject.textContent = chosenSubject;
      }

      orderForm.hidden = true;
      orderSuccess.hidden = false;
      orderSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
