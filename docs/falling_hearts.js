var style = document.createElement('style');
style.innerHTML = 'body {
position: relative !important;
height: 100vh;
}

body:before {
content: '';
position: absolute;
z-index: 2;
top: 0;
left: 0;
right: 0;
bottom: 0;
pointer-events: none;
background-image: url(https://divi.space/wp-content/uploads/2019/02/hearts.png);
animation: falling-hearts 8s linear infinite;
}
@keyframes falling-hearts {
0% {background-position: 0% 30%;}
}

@-moz-keyframes falling-hearts {
0% {background-position: 0% 30%;}
}

@-webkit-keyframes falling-hearts {
0% {background-position: 0% 30%;}
}';

document.head.appendChild(style);

