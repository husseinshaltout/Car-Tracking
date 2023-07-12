# API Reference

# Car endpoints

### Create car

```http
  POST /api/car
```

#### Body

```
{
    plateNumber: string,
    longitude: float,
    latitude: float
}
```

#### Response

```
{
    message: "Car added successfully",
    car:
    {
        id: string,
        plateNumber: string,
        lastLong: float,
        lastLat: float
    }
}
```

### Read all cars

```http
  GET /api/car
```

#### Response

```
{
    message: "Cars retrieved successfully",
    cars:
            [
                {
                    id: string,
                    plateNumber: string,
                    lastLong: float,
                    lastLat: float
                },
                {
                    ...
                }
            ]
}
```

### Read car

```http
  GET /api/car/:plateNumber
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `plateNumber` | `string` | **Required**. plateNumber of car to fetch |

#### Response

```
{
    message: "Car retrieved successfully",
    car:
    {
        id: string,
        plateNumber: string,
        lastLong: float,
        lastLat: float
    }
}
```

### Read all average speed

```http
  GET /api/car/speed/
```

#### Response

```
{
    message: "All cars average speed retrieved successfully",
    speed:
    [
        {
            car_id: string,
            average_speed:float
        },
        {
            ...
        }

    ]
}
```

# Location endpoints

### Read all Locations

```http
  GET /api/location/
```

#### Response

```
{
    message: "All Locations retrieved successfully",
    locations:
    [
        {
            id: string,
            car_id: string,
            longitude: float,
            latitude: float,
            speed:float
        },
        {
            ...
        }

    ]
}

```

### Edit coordinates

```http
  PATCH /api/location/:plateNumber
```

| Parameter     | Type     | Description                              |
| :------------ | :------- | :--------------------------------------- |
| `plateNumber` | `string` | **Required**. plateNumber of car to edit |

#### Body

```
{
    longitude: float,
    latitude: float
}
```

#### Response

```
{
    message: "Car coordinates updated successfully",
    car:
    {
        id: string,
        plateNumber: string,
        lastLong: float,
        lastLat: float
    }
}
```
