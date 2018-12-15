const socket = io();

$(document).ready(()=>{
    var name = $('#name').val();
    if(name !=''){
        socket.emit('user-connect-all',name);
        $('.hright').html('<span id="user">'+name+'</span> <a href="/logout"><span>(Đăng xuất)</span></a>');
    }
    $('#chatbox').submit(()=>{
        if(name== null || name ==''){
            while(name=='' || name ==null ){
                name = prompt('Nhập tên của bạn: ');
            }
        socket.emit('user-connect-all',name+=' (khách)');
        }
        if($('#m').val()=='')
            return false;
        socket.emit('send-message',$('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('send-message',obj=>{
        $('#messages').append('<li><span class="user-color" style="color:'+obj.color+'">'+obj.name+' </span><span class="msg"> : '+obj.message+'</span></li>');
        $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 5);
    });

});