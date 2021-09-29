<?php

function logger($message, $status = 'error'){
  file_put_contents(__DIR__.'/logs/register.log', $message."\r\n", FILE_APPEND | LOCK_EX);
  echo json_encode(array($status => $message), true);
  die();
}

/*Проверка на наличие @*/
 if(!preg_match("#@#",$_POST['email'])){
   logger('Введите корректный Email!');
 }

 /*Проверка пароля*/
 if(!isset($_POST['confirmPassword']) || trim($_POST['confirmPassword']) !== trim($_POST['password'])){
    logger('Пароли не совпадают!');
 }

 /*Массив юзеров*/
 $users = array(
   array('id' => 1, 'email' => 'test@mail.ru', 'Тестовый пользователь'),
   array('id' => 2, 'email' => 'admin@mail.ru', 'Кто то'),
   array('id' => 3, 'email' => 'support@mail.ru', 'Поддержка')
 );

 /*Проверка email*/
foreach($users as $item){
    if(trim($item['email']) === trim($_POST['email'])){
        logger('Пользователь с таким email уже зарегистрирован!');
    }
}

logger('Поздравляем с успешной регистрацией!', 'success');
