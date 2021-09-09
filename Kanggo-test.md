# GarageKita API Official Documentation

### List of Endpoints:
| HTTP METHOD | URL                 | DESKRIPSI          |
| ----------- | ------------------- | ------------------ |
| **POST** | /api/users/login | Login User |
| **POST** | /api/users/register | Register New User |
| **GET** | /api/products | Mendapatkan list seluruh product |
| **GET** | /api/products/`:id` | Mendapatkan product berdasarkan param `id` |
| **POST** | /api/products | Membuat product baru |
| **PUT** | /api/products/`:id` | Mengupdate product berdasarkan param `id` |
| **DELETE** | /api/products/`:id` | Menghapus product berdasarkan param `id` |
| **GET** | /api/orders | Mendapatkan list seluruh order |
| **GET** | /api/orders/`:id` | Mendapatkan order berdasarkan param `id` |
| **POST** | /api/orders | Membuat order baru |
| **PATCH** | /api/orders/`:id` | Mengupdate order berdasarkan param `id` |
| **DELETE** | /api/orders/`:id` | Menghapus order berdasarkan param `id` |
| **POST** | /api/pay/:orderId | Membayar order berdasarkan `orderId` |
| **GET** | /api/payments | Mendapatkan list seluruh payment |
| **GET** | /api/payments/`:id` | Mendapatkan payment berdasarkan param `id` |

---
# User
## Login User
- HTTP Method : `POST`
- URL : `/api/users/login`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "admin@mail.com",
    "password": "1234"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnRvbkBtYWlsLmNvbSIsImlhdCI6MTYyMzc1NzAwNn0.dJ4HBb54ZTg_RzuQF3r5SLKqtsU7dzjzuWEeW4_HmVM"
    }
}
```
#### Response Error Status : `401`
```json
{
    "error": "Wrong password"
}
```
#### Response Error Status : `404`
```json
{
    "error": "email is not registered"
}
```
#### Response Error Status : `400`
```json
{
    "error": "no email or password"
}
```
---
## Register New User
- HTTP Method : `POST`
- URL : `/api/users/register`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "user@mail.com",
    "password": "1234"
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "email": "user@mail.com",
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }
}
```
#### Response Error Status : `400`
```json
{
    "error": "email is already taken"
}
```
#### Response Error Status : `400`
```json
{
    "error": "no email or password"
}
```
---
# Product
## Mendapatkan list seluruh product
- HTTP Method : `GET`
- URL : `/api/products`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 3,
            "name": "testPr",
            "price": 20,
            "qty": 10,
            "createdAt": "2021-09-08T08:01:44.774Z",
            "updatedAt": "2021-09-08T08:01:44.774Z"
        },
        {
            "id": 2,
            "name": "testPr",
            "price": 20,
            "qty": 2,
            "createdAt": "2021-09-08T07:56:42.911Z",
            "updatedAt": "2021-09-08T14:54:00.613Z"
        },
        {
            "id": 4,
            "name": "testPr",
            "price": 20,
            "qty": 10,
            "createdAt": "2021-09-09T01:54:14.117Z",
            "updatedAt": "2021-09-09T01:54:14.117Z"
        }
    ]
}
```

---
## Mendapatkan product berdasarkan param `id`
- HTTP Method : `GET`
- URL : `/api/products/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 2,
        "name": "testPr",
        "price": 20,
        "qty": 2,
        "createdAt": "2021-09-08T07:56:42.911Z",
        "updatedAt": "2021-09-08T14:54:00.613Z"
    }
}
```

#### Response Error Status : `404`
```json
{
    "error": "Product not found"
}
```
---
## Membuat product baru
- HTTP Method : `POST`
- URL : `/api/products`
- Request Body : `json`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "name":"testPr",
    "price": 20,
    "qty": 10
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 4,
        "name": "testPr",
        "price": 20,
        "qty": 10,
        "updatedAt": "2021-09-09T01:54:14.117Z",
        "createdAt": "2021-09-09T01:54:14.117Z"
    }
}
```
#### Response Error Status : `400`
```json
{
    "error": [
        "product name may not be empty"
    ]
}
```

---
## Mengupdate product berdasarkan param `id`
- HTTP Method : `PUT`
- URL : `/api/products/:id`
- Request Body : `json`
- Request Params : `id`
- Response : `json`

#### Request Body Example
```json
{
    "qty": 5,
    "price": 25
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        1,
        [
            {
                "id": 3,
                "name": "testPr",
                "price": 25,
                "qty": 5,
                "createdAt": "2021-09-08T08:01:44.774Z",
                "updatedAt": "2021-09-09T02:12:38.079Z"
            }
        ]
    ]
}
```

#### Response Error Status : `404`
```json
{
    "error": "Product not found"
}
```

---
## Menghapus product berdasarkan param `id`
- HTTP Method : `DELETE`
- URL : `/api/products/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success"
}
```

#### Response Error Status : `404`
```json
{
    "error": "Product not found"
}
```
---
# Order
## Mendapatkan list seluruh order
- HTTP Method : `GET`
- URL : `/api/orders`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 10,
            "user_id": 1,
            "product_id": 2,
            "amount": 1,
            "status": "pending",
            "createdAt": "2021-09-08T11:30:47.934Z",
            "updatedAt": "2021-09-08T11:30:47.934Z"
        },
        {
            "id": 1,
            "user_id": 1,
            "product_id": 2,
            "amount": 9,
            "status": "paid",
            "createdAt": "2021-09-08T10:24:52.603Z",
            "updatedAt": "2021-09-08T14:54:00.576Z"
        }
    ]
}
```

---
## Mendapatkan order berdasarkan param `id`
- HTTP Method : `GET`
- URL : `/api/orders/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 10,
        "user_id": 1,
        "product_id": 2,
        "amount": 1,
        "status": "pending",
        "createdAt": "2021-09-08T11:30:47.934Z",
        "updatedAt": "2021-09-08T11:30:47.934Z"
    }
}
```

#### Response Error Status : `404`
```json
{
    "error": "order not found"
}
```
---
## Membuat order baru
- HTTP Method : `POST`
- URL : `/api/orders`
- Request Body : `json`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "product_id": 2,
    "amount": 1
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 26,
        "product_id": 2,
        "amount": 1,
        "user_id": 1,
        "status": "pending",
        "updatedAt": "2021-09-09T02:18:45.613Z",
        "createdAt": "2021-09-09T02:18:45.613Z"
    }
}
```
#### Response Error Status : `404`
```json
{
    "error": "insert or update on table \"Orders\" violates foreign key constraint \"Orders_product_id_fkey\""
}
```
#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```
#### Response Error Status : `400`
```json
{
    "error": "Please input product id"
}
```

---
## Mengupdate order berdasarkan param `id`
- HTTP Method : `PATCH`
- URL : `/api/orders/:id`
- Request Body : `json`
- Request Params : `id`
- Response : `json`

#### Request Body Example
```json
{
    "qty": 5,
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        1,
        [
            {
                "id": 1,
                "user_id": 1,
                "product_id": 2,
                "amount": 5,
                "status": "pending",
                "createdAt": "2021-09-08T10:24:52.603Z",
                "updatedAt": "2021-09-09T02:22:07.981Z"
            }
        ]
    ]
}
```

#### Response Error Status : `404`
```json
{
    "error": "order not found"
}
```

#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```

#### Response Error Status : `401`
```json
{
    "error": "You may only modify your own order"
}
```

---
## Menghapus order berdasarkan param `id`
- HTTP Method : `DELETE`
- URL : `/api/orders/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success"
}
```

#### Response Error Status : `404`
```json
{
    "error": "order not found"
}
```
#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```

#### Response Error Status : `401`
```json
{
    "error": "You may only modify your own order"
}
```

---
# Pembayaran
## membayar order berdasarkan orderId
- HTTP Method : `POST`
- URL : `/api/pay/:orderId`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 7,
        "amount": 3,
        "order_id": 1,
        "status": "paid",
        "updatedAt": "2021-09-09T02:33:45.721Z",
        "createdAt": "2021-09-09T02:33:45.721Z"
    }
}
```

#### Response Error Status : `404`
```json
{
    "error": "order not found"
}
```

#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```
---
## Mendapatkan list seluruh pembayaran
- HTTP Method : `GET`
- URL : `/api/payment/`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 5,
            "order_id": 1,
            "status": "paid",
            "amount": 1,
            "createdAt": "2021-09-08T14:53:32.697Z",
            "updatedAt": "2021-09-08T14:53:32.697Z"
        },
        {
            "id": 6,
            "order_id": 1,
            "status": "paid",
            "amount": 3,
            "createdAt": "2021-09-08T14:54:00.617Z",
            "updatedAt": "2021-09-08T14:54:00.617Z"
        },
        {
            "id": 7,
            "order_id": 1,
            "status": "paid",
            "amount": 3,
            "createdAt": "2021-09-09T02:33:45.721Z",
            "updatedAt": "2021-09-09T02:33:45.721Z"
        }
    ]
}
```

#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```
---
## Mendapatkan pembayaran berdasarkan Id
- HTTP Method : `GET`
- URL : `/api/payment/:id`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 5,
        "order_id": 1,
        "status": "paid",
        "amount": 1,
        "createdAt": "2021-09-08T14:53:32.697Z",
        "updatedAt": "2021-09-08T14:53:32.697Z"
    }
}
```

#### Response Error Status : `401`
```json
{
    "error": "Please log in"
}
```

#### Response Error Status : `404`
```json
{
    "error": "Pembayaran not found"
}
```