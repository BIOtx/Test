$(document).ready(function(){



  $('#register-form form').on('submit', function(e){
    /*Предотвращаем стандартную отправку формы*/
    e.preventDefault();

    /*Получаем данные из формы и формируем объект data*/
    let data = {};
    for(let [name, value] of new FormData(this)){
        data[name] = value;
    }
    $('#error').text('');
    
    if(!('email' in data) || !data['email'].includes('@')){
      $('#error').text('Введите корректный email!');
      return false;
    }

    if(!('password' in data) || !('confirmPassword' in data) || data['password'] !== data['confirmPassword']){
      $('#error').text('Пароли должны совпадать!');
      return false;
    }

    /*ajax запрос на файл обработчик auth.php*/
    $.ajax({
      url: "auth.php",
      method: "post",
      data: data,
      success: function(data){
        try{
          let json = JSON.parse(data);
          if('success' in json){
            $('#message').html(json['success']);
            $('#register-form').fadeOut(500);

          } else if('error' in json){
            $('#error').text(json['error']);

          }
        }catch(err){
          $('#error').text('Неизвестная ошибка!');
          console.log('Error: ', err);
        }
      },
    });

  })
})
