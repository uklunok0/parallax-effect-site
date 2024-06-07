// Получаем ссылку на элемент canvas и его контекст
var canvas = document.getElementById("rainCanvas");
var ctx = canvas.getContext("2d");

// Устанавливаем размеры canvas в соответствии с размерами окна браузера
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Создаем массив для хранения позиций и скоростей капель дождя
var drops = [];
for (var i = 0; i < 70; i++) {
  var angle = Math.PI / 2.3; // Угол падения капли

  drops[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: Math.cos(angle) * (Math.random() * 5 + 5), // Случайная скорость по горизонтали
    speedY: Math.sin(angle) * (Math.random() * 5 + 2), // Случайная скорость по вертикали
  };
}

// Функция анимации дождя
function drawRain() {
  // Заполняем canvas прозрачным цветом
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // // Заполняем canvas черным цветом
  // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем каждую каплю и обновляем их позицию
  ctx.fillStyle = "white"; // Цвет дождя
  for (var i = 0; i < drops.length; i++) {
    ctx.fillRect(drops[i].x, drops[i].y, 0.5, 5); // Размер и форма капли

    drops[i].x += drops[i].speedX; // Обновляем позицию капли
    drops[i].y += drops[i].speedY; // Обновляем позицию капли

    // Если капля выходит за пределы canvas, перемещаем ее вверх
    if (drops[i].y > canvas.height || drops[i].x > canvas.width) {
      drops[i].y = 0;
      drops[i].x = Math.random() * canvas.width; // Перемещаем каплю в случайную горизонтальную позицию
    }
  }
}

// Функция анимации с интервалом, чтобы создать эффект дождя
setInterval(drawRain, 25);
