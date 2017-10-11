const inputs = {
    'w': ([x,y,a]) => [(x + Math.cos(a)), (y + Math.sin(a)),a],
    's': ([x,y,a]) => [(x - Math.cos(a)), (y - Math.sin(a)),a],
    'a': ([x,y,a]) => [(x + Math.sin(a)), (y - Math.cos(a)),a],
    'd': ([x,y,a]) => [(x - Math.sin(a)), (y +Math.cos(a)),a],
    'ArrowRight': ([x,y,a])  => [x,y,(a +=  0.1)],
    'ArrowLeft': ([x,y,a]) => [x,y,(a += -0.1)]
}