function Timer(funUser, delayMillisecond) {
this.interval_millisecond = delayMillisecond; //интервал времени в миллисекундах
this.idFunction = 0; //идентификатор созданной функция вызываемой через опрд.промежуток времени
this.userFunction = funUser; // Пользовательская функция
// Активация таймера
this.start = function() {
this.idFunction = setInterval(this.userFunction, this.interval_millisecond);
}
// Деактивация таймера
this.stop = function() {
// Функция clearInterval для снятия с обработки вызова
clearInterval(this.idFunction);
}
this.setDelayFunction = function(funUser) {
this.userFunction = funUser;
}
this.setIntervalMillisecond = function(millisecond) {
this.interval_millisecond = millisecond;
}
}

var s = 0;

var count = 50; // Количество объектов видимых на сцене

var arrayImages = []; // Массив объектов IMG

var timerAnim1 = new Timer(animation_scene, 40);

var arrayPoints = []; // Массив координат для каждого графического объекта на сцене
var ffa = [];
var ffb = [];

// Класс Точка
function Point(x, y) {
this.x = x;
this.y = y;
}

// Функция создает множество графических элементов для сцены
// сохраняет их в массив для дальнейшей работы
function initScene() {

// Добавить в тег BODY все элементы
for(var j = 0; j < count; j ++) {
// Создать новый оъект-сердце
var newObject = document.createElement("IMG");
// Установка собственных параметров
newObject.width = "38"; // Ширина битовой карты
newObject.height= "50"; // Высота битовой карты

var indimg = parseInt((Math.random() * 3).toFixed(0)) + 1;

newObject.src = "http://master-akadem.ru/public_test_comp/scripts/airballs/images/ball_"+indimg+".png"; // Ссылка на графический файл http://101widgets.com/jswidgets/img/ball_3.png
newObject.style.zIndex = "100" + j;
// Установка стилевых свойств
newObject.style.position = "absolute"; // Абсолютное позиционирование
// Генерация псевдослучайных чисел координат
var randX = parseFloat(((Math.random() * (document.documentElement.clientWidth )).toFixed(0))) - 50;
var randY = randomNumber(document.documentElement.clientHeight + document.documentElement.scrollTop, document.documentElement.scrollHeight);

arrayPoints[j] = new Point(3, 3); // Сохранить координаты в объект

arrayPoints[j].x = parseFloat(((Math.random() * (2)).toFixed(5)));

arrayPoints[j].y = randomNumber(50, 60) / 5;

var sa = randomNumber(18, 33) / 255;

ffa[j] = sa == 0 ? randomNumber(18, 33) / 255 : sa;

ffb[j] = 0;

newObject.style.left = randX + "px"; // Координата по оси X
newObject.style.top = randY + "px"; // Координата по оси Y

arrayImages[j] = newObject; // Сохранить в массив
}
}
function addToBody() {
// Добавить в тег BODY все элементы
for(var j = 0; j < arrayImages.length; j ++) {
document.body.appendChild(arrayImages[j]);
}
}
var ff=0;

function randomNumber (m,n)
{
m = parseInt(m);
n = parseInt(n);
return Math.floor( Math.random() * (n - m + 1) ) + m;
}

function animation_scene() {
if(s <= 320){
for(var j = 0; j < arrayImages.length; j ++) {
// Пересчитать координаты
arrayImages[j].style.top = (parseFloat(arrayImages[j].style.top) - arrayPoints[j].y) + "px";
// Отобразить объекты
arrayImages[j].style.left = (parseFloat(arrayImages[j].style.left)) - (0.32 + 5.5 * Math.sin(2.5 * 155 + ffb[j])) + "px";
// Проверка на столкновение с границами видимости
// Если произошло столкновение То скрывается объект и ему переназначаются координаты отображения
// и после он начинается падать сверху как новый объект
var yClientFieldTop = document.documentElement.scrollTop; // параметр прокрутки до видимой области
var yClientFieldBottom = document.documentElement.clientHeight + (window.pageYOffset || document.documentElement.scrollTop) - 50; // параметр высота клиентской области

if(arrayImages[j].offsetTop <= 0 ||
(arrayImages[j].offsetLeft + arrayImages[j].offsetWidth) >= ((window.pageXOffset || document.documentElement.scrollLeft) + document.documentElement.clientWidth)) {
// Скрыть объект
arrayImages[j].style.visibility = "hidden";
// Генерация псевдослучайных чисел координат
var randX = Math.sin(parseFloat(((Math.random() * (document.documentElement.clientWidth - 1)).toFixed(0))) - 50) * 1000;
var randY = document.documentElement.scrollHeight - 100;
arrayImages[j].style.left = randX + "px"; // Координата по оси X
arrayImages[j].style.top = randY + "px"; // Координата по оси Y
var indimg = parseInt((Math.random() * 3).toFixed(0)) + 1;
arrayImages[j].src = "http://master-akadem.ru/public_test_comp/scripts/airballs/images/ball_"+indimg+".png";
arrayImages[j].style.visibility = "visible";
}
}
ff += 0.1131;
for(var j = 0; j < ffb.length; j++) {
ffb[j] += ffa[j];
}
}else{
for(var i = 0; i < arrayImages.length; i++){
arrayImages[i].style.visibility = "hidden";
}
}
s++;
}

initScene();
// Добавить на сцену
addToBody();
// Старт таймера
timerAnim1.start();
