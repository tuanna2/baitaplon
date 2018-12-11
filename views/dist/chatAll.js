const socket = io('/all');

$(document).ready(()=>{
    var name = '';
    $('#chatbox').submit(()=>{
        if(name== null || name ==''){
            while(name=='' || name ==null ){
                name = prompt('Nhập tên của bạn: ');
            }
        socket.emit('user-connect-all',name+='(Khách)');
        }
        if($('#m').val()=='')
            return false;
        socket.emit('send-message',$('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('send-message',obj=>{
        $('#messages').append('<li><span class="user-color" style="color:'+obj.color+'">'+obj.name+' </span><span class="msg">'+obj.message+'</span></li>');
        $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 5);
    });
    socket.on('refresh',online=>{
        $('#wc-right').html('Online: '+online);
    });

})