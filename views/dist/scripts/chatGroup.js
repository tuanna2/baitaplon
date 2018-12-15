const socket = io();

$(document).ready(()=>{
    var group='';
   $('#join-group').click(()=>{
        if($('#group').val()==null || $('#group').val()==''){
            alert('Bạn chưa nhập tên nhóm!');
        }
        else{
            group = $('#group').val();
            $('#group').css('display','none');
            $('#join-group').css('display','none');
            $('#wc-left').html('Đang ở trong nhóm: ' +group);
            $('#change-gr').css('display','inline')
            socket.emit('connect-group',{name:$('#name').val(),group:$('#group').val()});
        }
        return false;
   });
   $('#change-gr').click(()=>{
        window.location.reload();
   });
   $('#chatbox').submit(()=>{
    if(group==''){
        alert('Vui lòng vào nhóm trước khi gửi');
        return false;
    }
    if($('#m').val()=='')
        return false;
    socket.emit('send-message-group',$('#m').val());
    $('#m').val('');
    return false;
    });
    socket.on('send-message-group',obj=>{
        $('#messages').append('<li><span class="user-color" style="color:'+obj.color+'">'+obj.name+' </span><span class="msg"> : '+obj.message+'</span></li>');
        $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 5);
    })

});