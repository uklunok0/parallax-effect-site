window.addEventListener("DOMContentLoaded", () => {
  // ИСПОЛЬЗОВАНИЕ КЛАССА:
  class Parallax {
    constructor() {
      this.prevX = null;
      this.prevY = null;
    }

    // обработка координат курсора на ПК
    handleEventForPC(event) {
      Object.assign(document.documentElement, {
        style: `
                  --move-x: ${(event.clientX - window.innerWidth / 2) * -0.005}deg;
                  --move-y: ${(event.clientY - window.innerHeight / 2) * -0.008}deg;
                  `,
      });
    }

    // обработка координат касания по дисплею на смартфоне
    handleEventForSmartphone(event) {
      // Получаем координаты касания
      const touch = event.touches[0];
      const currentX = touch.clientX;
      const currentY = touch.clientY;

      // Проверяем, есть ли предыдущие координаты
      if (this.prevX !== null && this.prevY !== null) {
        // Вычисляем изменение координаты для создания эффекта параллакса
        const deltaX = currentX - this.prevX;
        const deltaY = currentY - this.prevY;
        // Обновляем позицию картинки с учетом параллакса
        Object.assign(document.documentElement, {
          style: `
         --move-x: ${deltaX * -0.07}deg;
         --move-y: ${deltaY * -0.05}deg;
         `,
        });
      }
      // Обновляем предыдущие координаты
      this.prevX = currentX;
      this.prevY = currentY;
    }

    clearPreviousCoordinates() {
      this.prevX = null;
      this.prevY = null;
    }
  }

  const eventAdd = new Parallax();

  document.addEventListener("mousemove", (event) => eventAdd.handleEventForPC(event));
  document.addEventListener("touchmove", (event) => eventAdd.handleEventForSmartphone(event));

  // Добавляем слушатель события touchend для очистки предыдущих координат
  document.addEventListener("touchend", eventAdd.clearPreviousCoordinates());
});
