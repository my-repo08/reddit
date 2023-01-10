# Reddit - клон Реддита

## 📓 Описание проекта:

Приложение сконфигурировано при помощи шаблона `npx create-next-app --ts`

Адаптировано под mobile, tablet, desktop

## Cтэк:

* `TypeScript`
* `React`
* `Next.js`
* `Firebase`
* `Recoil`
* `Chakra UI`

## ⚙️ Описание функциональности

### Авторизация и новостная лента

При запуске приложения откроется главная страница. На ней можно авторизоваться через Google или через ранее созданный аккаунт. Если аккаунта еще нет, можно зарегистрироваться используя любой валидный e-mail. Если забыли пароль от ранее созданного аккаунта, его можно с легкостью восстановить, получив ссылку на почту. В ленте будут доступны для превью 10 постов с самым высоким рейтингом, отсортированные по убыванию. После авторизации лента будет сконфигурирована исходя из постов подписанных сообществ, посты будут отсортированы от более новых к более старым. В основной ленте можно просматривать посты из разных сообществ, ставить рейтинг, удалять свои посты и видеть общее количество комментарии оставленные под каждым постом.

![e96bffefc19a6c2251ec2bae6ca1d273785dedad](https://user-images.githubusercontent.com/99764749/197866393-604c0260-dedf-48d7-9ab6-c85b4a58d4af.gif)
#

### Посты

Кликнув на интересующий пост, откроется страница с данным постом, на ней можно ставить рейтинг, просматривать комментарии оставленные другими пользователями и удалять свои. Также здесь будет информация о сообществе в котором был опубликован данный пост.

![b606d1d378b0dffa794bb64e9ecad15f7a48fe02](https://user-images.githubusercontent.com/99764749/197867990-8a20df70-079d-4e0c-86a2-61593c23980d.gif)
#

### Страница сообщества

Кликнув на интересующее сообщество, откроется страница с ним. Здесь можно увидеть более подробную информацию о текущем сообществе, просмотреть все ранее опубликованные посты и перейти на страницу публикации нового поста в данное сообщество. Для добавления нового поста в определенное сообщество, необязательно нужно быть подписанным на него, но если хотите получать обновления от этого сообщества, нужно будет подписаться на него. Сделать это можно как на странице самого сообщества, так и на главной странице в разделе рекомендации.

![fd38b683cd27d307af47c75e5f636b70122aec07](https://user-images.githubusercontent.com/99764749/197872630-97af91cc-b011-4efb-89e4-69a9474475a6.gif)
#

### Создание нового сообщества

Для того чтобы создать новое сообщество, нужно перейти в выпадающее меню, по клику "Создать сообщество" откроется модальное окно, нужно указать свободное название сообщества и после подтверждения произойдет автоматическое перенаправление на страницу с новым сообществом. Текущий пользователь автоматически становится администратором данного сообщества и только он может менять аватар сообщества. Если создатель сообщества решит покинуть свое сообщество, то такое сообщество продолжит существовать для остальных пользователей, но у него не будет администратора, если создатель решит вернуться в свое сообщество, он будет автоматически восстановлен в правах администратора.

![29cb20c9405368dd1701a384329ff10aba482770](https://user-images.githubusercontent.com/99764749/197874711-5b501e76-086a-4c7b-8cd4-8322ee2fe5ad.gif)
#

### Добавление нового поста

Для создания нового поста нужно перейти в интересующее сообщество, по клику на ссылку "Создать пост" откроется страница добавления поста. Необходимо указать заголовок поста, тело поста можно добавить опционально, как и прикрепленное изображение. После подтверждения произойдет перенаправление на страницу сообщества.

![c6dd6e5030b69edd0d0e01c531d5cfa47d19fe1e](https://user-images.githubusercontent.com/99764749/197878605-b838edb6-6238-4e0d-9a0e-eb6bd52deb05.gif)
