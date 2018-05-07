# 老铁精选

## API

### 数据接口返回结构

- 接口通用返回结构

``` json
    {
        "type":"object",
        "properties":{
            "data":{
                "oneOf":[{
                    "type":"object"
                },{
                    "type":"array"
                }]
            },
            "code":{
                "type":"number",
                "title":"状态码",
                "description":"200表示成功，其他根据格子逻辑返回错误"
            },
            "errMsg":{
                "type":"string",
                "title":"状态码对应的错误信息",
            }
        }
    }
```

## 登录接口

地址：/auth/weapp?code=CODE

