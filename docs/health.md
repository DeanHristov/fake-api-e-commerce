# Health API

## Endpoints

- [Health](#health)

## Health

This piece of API gives you the ability to check its health. The response is:

```
{
    "status": "Ok"
}
```

### Sign In

**`GET /api/v1/health`**

**Parameters**

| Name  | Type    | In     | Required | Description |
|-------|---------|--------|----------|-------------|
| `---` | string  | body   | -        | ---         |
| `---` | number  | params | -        | ---         |
| `---` | boolean | query  | -        | ---         |

**Example response**:

```
{
    "status": "Ok"
}
```

**Status codes**

| Status code   | Description              |
|---------------|--------------------------|
| 200 OK        | Indicates a good health. |
| 404 NOT FOUND | The API doesn't work.    |
