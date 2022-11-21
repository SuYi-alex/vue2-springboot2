
# qingqu-mall
## 介绍
基于springboot2的后台管理

## 安装
导入项目依赖，配置好数据库。即可启动
## 配置数据库
```apl
// 项目目录src>main>resources>application.yml
server:
  port: 9090

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/qingqu-mall
    username: root
    password: nq12345678
```

## 简单测试接口
> 项目目录src>main>com.qingqu.boot创建一个包，controller
>新建java clss ---- healthController
```java
package com.qingqu.boot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public String health(){
        return "ok";
    }
}
```