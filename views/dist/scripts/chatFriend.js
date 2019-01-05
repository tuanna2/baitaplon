const socket = io();

$(document).ready(()=>{
    var name =$('#name').val();
    var friend='';
    socket.emit('connect-chat-friend',name);
    $('#btn-chat').click(()=>{
        if($('#friend').val()==null || $('#group').val()==''){
            alert('Bạn chưa nhập tên người chat!');
        }
        else{
            friend = $('#friend').val();
            socket.emit('get-msg',friend);
            $('#friend').css('display','none');
            $('#btn-chat').css('display','none');
            $('#change-fr').css('display','inline')
            $('#wc-left').html('Gửi tin nhắn với: ' +friend);
        }
        return false;
   });
   $('#change-fr').click(()=>{
        $('#change-fr').css('display','none');
        friend='';
        $('#wc-left').html('Nhập tên người bạn muốn chat:');
        $('#friend').css('display','inline');
        $('#btn-chat').css('display','inline');
        return false;   
   });

   $('#chatbox').submit(()=>{
    if(friend==''){
        alert('Vui lòng nhập người nhận!');
        return false;
    }
    if($('#m').val()=='')
        return false;
    socket.emit('send-message-friend',{friend:friend,message:$('#m').val()});
    $('#m').val('');
    return false;
    });
    socket.on('send-message-friend',obj=>{
        $('#messages').append('<li><span class="user-color" style="color:'+obj.color+'">'+obj.name+' </span><span class="msg"> : '+obj.message+'</span></li>');
        $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 5);
    });
    socket.on('get-msg',msg=>{
        $('#message').removeClass('user-color');
        msg.forEach(element => {
            $('#messages').append('<li><span class="user-color" style="color:black">'+element.From+' </span><span class="msg"> : '+element.message+'</span></li>');
            $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 5); 
        });
    });
});