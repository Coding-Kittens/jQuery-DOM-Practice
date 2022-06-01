

 $.when( $.ready ).then(()=> {
console.log('Let’s get ready to party with jQuery!');
});

$('img').addClass('image-center');

$('p:last-of-type').remove();


$('#title').css('font-size',`${Math.floor(Math.random() * 100)}px`);

$('<li>').text('Cats are better though.').appendTo('ol');


$("aside").html('<p>Sorry I had to get rid of the list, it mentioned a dog! The rest of it was silly anyway, except the last point. Cats are still the best! <p>');


$("input").focusout(()=>{

let r = $("#R").val();
let g = $("#G").val();
let b = $("#B").val();

$("body").css("background-color",`rgb(${r},${g},${b})`);

});



$('img').on("click",()=>{

  $('img').fadeOut(1000,()=>{
    $('img').remove();
  });

});
