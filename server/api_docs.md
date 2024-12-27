# GameAPI Documentation

## Models

### User

- `username`: string
- `email`: string, required, unique
- `password`: string, required
- `phoneNumber`: string
- `address`: string

### Game

- `title`: string, required
- `imgUrl`: string
- `genre`: string
- `metacritic_rating`: integer
- `release_date`: string

## Endpoints

### 1. **POST /users/add-user**

Register a new user.

- **Request:**
  - Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "phoneNumber": "string",
      "address": "string"
    }
    ```
- **Response (201 - Created):**

  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "phoneNumber": "string",
    "address": "string"
  }
  ```

  _Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be at least 8 characters"
}
```

---

### 2. **POST /users/login**

Authenticate user and return access token.

- **Request:**
  - Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response (200 - OK):**
  ```json
  {
    "access_token": "<token>"
  }
  ```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

---

### 3. **GET /games**

Fetch all games from external API.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
- **Response (200 - OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Game Title",
      "imgUrl": "https://example.com/image.jpg",
      "genre": "Action",
      "metacritic_rating": 85,
      "release_date": "2022-09-30"
    },
    ...
  ]
  ```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

---

### 4. **GET /games/:id**

Fetch game details by ID.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
  - Params:
    ```json
    {
      "id": "integer"
    }
    ```
- **Response (200 - OK):**
  ```json
  {
    "id": 1,
    "title": "Game Title",
    "imgUrl": "https://example.com/image.jpg",
    "genre": "Action",
    "metacritic_rating": 85,
    "release_date": "2022-09-30"
  }
  ```
  _Response (404 - Not Found)_
  ```json
  {
    "message": "Data not found"
  }
  ```

---

### 5. **GET /populars**

Fetch all popular games from the database.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
- **Response (200 - OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Popular Game",
      "imgUrl": "https://example.com/image.jpg",
      "genre": "Adventure",
      "metacritic_rating": 90,
      "release_date": "2021-10-10"
    },
    ...
  ]
  ```
  _Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

---

### 6. **POST /populars**

Add a new game to the popular list.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
  - Body:
    ```json
    {
      "title": "string",
      "imgUrl": "string",
      "genre": "string",
      "metacritic_rating": "integer",
      "release_date": "string"
    }
    ```
- **Response (201 - Created):**
  ```json
  {
    "id": "integer",
    "title": "string",
    "imgUrl": "string",
    "genre": "string",
    "metacritic_rating": "integer",
    "release_date": "string"
  }
  ```
  _Response (400 - Bad Request)_

```json
{
  "message": "Validation error"
}
```

---

### 7. **PUT /populars/:id**

Update details of a popular game.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
  - Params:
    ```json
    {
      "id": "integer"
    }
    ```
  - Body:
    ```json
    {
      "title": "string",
      "imgUrl": "string",
      "genre": "string",
      "metacritic_rating": "integer",
      "release_date": "string"
    }
    ```
- **Response (200 - OK):**
  ```json
  {
    "id": "integer",
    "title": "string",
    "imgUrl": "string",
    "genre": "string",
    "metacritic_rating": "integer",
    "release_date": "string"
  }
  ```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

---

### 8. **DELETE /populars/:id**

Delete a game from the popular list by ID.

- **Request:**
  - Headers:
    ```json
    {
      "authorization": "Bearer <token>"
    }
    ```
  - Params:
    ```json
    {
      "id": "integer"
    }
    ```
- **Response (200 - OK):**
  ```json
  {
    "message": "Game deleted successfully"
  }
  ```
  _Response (404 - Not Found)_
  ```json
  {
    "message": "Data not found"
  }
  ```

---

## Global Errors

### 401 - Unauthorized

```json
{
  "message": "Invalid token"
}
```

### 403 - Forbidden

```json
{
  "message": "You don't have access"
}
```

### 404 - Not Found

```json
{
  "message": "Data not found"
}
```

### 500 - Internal Server Error

```json
{
  "message": "Internal server error"
}
```
