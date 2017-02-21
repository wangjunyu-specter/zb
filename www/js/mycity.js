var citys = city.all();
citys.forEach(function(i){
  var li = $('<li>'+i+'</li>');
  $('.city-c').append(li);
})
$('.ghdq').on('click',function(){
  $('.cityss').slideToggle(400);
})
$('.city-c li').on('click',function(){
  var text = $(this).text();
  console.log(text);
  var cs = city.get(text);
  $('.city-b').html(' ')
  cs.forEach(function(i){
    //此处追加城市
    var li = $('<li>'+i+'</li>');
    li.on('click',function(){
      var text = $(this).text();
      $('.yxdd').text(text);
      $('.cityss').slideToggle(400);
    })
    $('.city-b').append(li);
  })
})
$('.cityss').on('mouseleave',function(){
  $(this).slideToggle(400)
})