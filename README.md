# API V1 для автоматизации кафе

## Accounts

### Register

```/api/v1/accounts/register/ - Метод для регистрации```

```Method: POST```

Request Body

```
{
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "cafe_id": 0
}
```

Responses

201 Created:
```
{
  "msg": "string",
  "auth_token": "string"
}
```

### Login

```/api/v1/accounts/login/ - Метод для авторизации```

```Method: POST```

Request Body

```
{
  "username": "string",
  "password": "string",
}
```

Responses

200:
```
{
  "msg": "string",
  "auth_token": "string"
}
```

## Main

### Create Order

```/api/v1/main/create_order/ - Метод для создания заказа```

Требуется API-токен в заголовке Authorization

```Method: POST```

Request Body

```
{
  "phone": "string",
  "menu_items": "string", - Элементы через запятую
  "clients_number": 1,
  "address": "string", - Улица, дом, город
  "total_cost": 0,
  "payment_method": "Наличка", - Варианты: Наличка, Перевод, На кассе
  "order_on_time": "18:14:20.577Z",
  "cafe_id": 0
}
```

Responses

201 Created:
```
{
  "order_id": 0,
  "cafe_id": 0,
  "msg": "string"
}
```

### Edit Order

```/api/v1/main/edit_order/{pk}/ - Метод для редактирования заказа```

Требуется API-токен в заголовке Authorization

```Method: POST```

Query Path

```pk: integer - id заказа```

Request Body

```
{
  "phone": "string",
  "menu_items": "string", - Элементы через запятую
  "clients_number": 1,
  "address": "string", - Улица, дом, город
  "total_cost": 0,
  "payment_method": "Наличка", - Варианты: Наличка, Перевод, На кассе
  "order_on_time": "18:14:20.577Z",
  "cafe_id": 0
}
```

Responses

200:
```
{
  "order_id": 0,
  "cafe_id": 0,
  "msg": "string"
}
```

### Change Payment Status

```/api/v1/main/change_payment_status/ - Метод для изменения статуса оплаты```

Требуется API-токен в заголовке Authorization

```Method: POST```

Query

```
pk: integer - id заказа
cafe_id: integer - id кафе
```

Responses

200:
```
{
  "order_id": 0,
  "cafe_id": 0,
  "msg": "string"
}
```

### Change Order Status On Done

```/api/v1/main/change_order_status_on_done/ - Метод для изменения статуса заказа на готово```

Требуется API-токен в заголовке Authorization

```Method: POST```

Query

```
order_id: integer - id заказа
cafe_id: integer - id кафе
time: string - время готовки
```

Responses

200:
```
{
  "order_id": 0,
  "cafe_id": 0,
  "msg": "string"
}
```

### Get Dishes

```/api/v1/main/get_dishes/ - Метод для получения блюд```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
cafe_id: integer - id кафе
```

Responses

200:
```
{
  "dishes": [
    {
      "id": 0,
      "name": "string",
      "category": 0,
      "price": 0
    }
  ]
}
```

### Get Total Cost

```/api/v1/main/get_total_cost/ - Метод для получения итоговой суммы```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
menu: string - "блюдо - количество, блюдо - количество, ..."
address: string - Адрес заказа
```

Responses

200:
```
{
  "total_cost": 0,
  "address_cost": 0
}
```

### Get Similar Addresses

```/api/v1/main/get_similar_addresses/ - Метод для получения схожих адресов```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
value: string - Адрес
```

Responses

200:
```
{
  "value": "string",
  "full_addresses": [
    "string"
  ]
}
```

### Get Today Orders

```/api/v1/main/get_today_orders/ - Метод для получения заказов за сегодня```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "orders": [
    {
      "id": 0,
      "phone": "string",
      "menu_items": "string",
      "clients_number": 1,
      "address": "string",
      "total_cost": 0,
      "payment_method": "Наличка",
      "payment_status": "Не оплачено",
      "created_date": "2024-04-07T19:00:11.930Z",
      "status": "Новый",
      "cooking_time": "19:00:11.930Z",
      "order_on_time": "19:00:11.930Z",
      "cafe": 0
    }
  ],
  "payments": {
    "total_money": 0,
    "cash": 0,
    "non_cash": 0,
    "on_place": 0
  }
}
```

### Get Orders History

```/api/v1/main/get_orders_history/ - Метод для получения заказов за все время```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "orders": [
    {
      "id": 0,
      "phone": "string",
      "menu_items": "string",
      "clients_number": 1,
      "address": "string",
      "total_cost": 0,
      "payment_method": "Наличка",
      "payment_status": "Не оплачено",
      "created_date": "2024-04-07T19:02:25.937Z",
      "status": "Новый",
      "cooking_time": "19:02:25.937Z",
      "order_on_time": "19:02:25.937Z",
      "cafe": 0
    }
  ]
}
```

### Get Last Address

```/api/v1/main/get_orders_history/ - Метод для получения заказов за все время```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
phone_number: string - Номер телефона
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "address": "string"
}
```

## Delivery

### Create Order

```/api/v1/delivery/create_order/ - Метод для создания заказа курьеру```

Требуется API-токен в заголовке Authorization

```Method: POST```

Query

```
order_id: int - id Заказа
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "token": "string",
  "responseOrder": "string",
  "message": "string",
  "comment": "string"
}
```

### Update Status Order

```/api/v1/delivery/update_status_order/ - Метод для обновления статуса заказа```

Требуется API-токен в заголовке Authorization

```Method: POST```

Query

```
order_id: int - id Заказа
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "status": 200,
  "order_status": "string",
  "order_color": "string"
}
```

## Cook

### Get Orders For Cooking

```/api/v1/cook/get_orders_for_cooking/ - Метод для получения всех заказов для готовки```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "today": datetime.datetime,
  "orders": [...]
}
```

### Change Order Status On Not Done

```/api/v1/cook/change_order_status_on_not_done/ - Метод для изменения статуса заказа на не готов```

Требуется API-токен в заголовке Authorization

```Method: GET```

Query

```
order_id: int - id Заказа
cafe_id: int - id Кафе
```

Responses

200:
```
{
  "status": "string"
}
```
