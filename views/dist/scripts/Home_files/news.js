$(document).ready(()=>{
    $.get("http://125.212.227.42:18080/api/news", obj=>{
        obj.data.forEach(element => {
           $('#data-news').append('<tr><td class="hi">'+element.id+'</td><td class="title">'+element.title+'</td><td class="hi"><a href="#">DETAIL</a></td></tr>')
        });
      });
});
