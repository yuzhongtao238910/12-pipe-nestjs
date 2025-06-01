- 异常过滤器，
    - nestjs内置了一个异常层，负责处理应用程序，当应用程序代码没有处理异常的时候，此层就会捕获该异常，
    - 然后自动发送适当的用户友好响应

- 默认情况下，这个操作是由一个内置的全局异常过滤器来执行的，该过滤器的处理类型为HttpException(及其子类)的异常，当异常是
- 未识别的（既不是HttpException也不是继承自HttpException的类），内置的异常过滤器会生成以下默认的JSON响应
```javascript
{
    "statusCode": 500,
    "message": "Internal server error"
}
```


- @Catch
    - @Catch(HttpException) 装饰器将所需的元数据绑定到异常过滤器，告诉 Nest 此特定过滤器正在查找 HttpException 类型的异常，而不是其他类型。
    - @Catch() 装饰器可以接受单个参数或逗号分隔的列表。这使您可以一次为多种类型的异常设置过滤器。

- 内置HTTP异常
    - BadRequestException 标识请求无效的异常，通常用于处理客户端发送的无效或者是错误的请求
    - UnauthorizedException 表示未经授权的异常，用于处理需要身份验证的请求，但客户端未提供有效的身份验证的凭证哈
    - NotAcceptableException
    - GoneException
    - BadGatewayException
    - ......

- 异常过滤器
    - 虽然基本（内置）异常过滤器可以自动处理许多情况，但您可能希望对异常层拥有完全控制。例如，您可能希望添加日志记录或根据某些动态因素使用不同的 JSON 模式。异常过滤器正是为此目的而设计的。它们允许您控制精确的控制流程和发送回客户端的响应内容。
    - 改变默认的异常过滤器的行为
    - 我们创建一个异常过滤器，负责捕获 HttpException 类的实例，并为它们实现自定义响应逻辑。
    - 为此，我们需要访问底层平台的 Request 和 Response 对象。我们将访问 Request 对象，以便提取原始 url 并将其包含在日志信息中。我们将使用 Response 对象，通过 response.json() 方法直接控制发送的响应。

- @Catch过滤器
    - @Catch(HttpException) 装饰器将所需的元数据绑定到异常过滤器，告诉 Nest 此特定过滤器正在查找 HttpException 类型的异常，而不是其他类型。@Catch() 装饰器可以接受单个参数或逗号分隔的列表。这使您可以一次为多种类型的异常设置过滤器。

- 自定义的过滤器写好之后，要怎么生效啊？
    - 放到过滤器或者方法或者全局上

- 绑定过滤器
    - 我们将新的过滤器绑定到controller的某个路由方法上
```typescript
@Get()
@UseFilters(new HttpExceptionFilter())
async create() {
    throw new ForbiddenException()
}

```
- useFilters装饰器
    - 我们在这里使用了 @UseFilters() 装饰器。与 @Catch() 装饰器类似
    - 它可以接受单个过滤器实例或逗号分隔的过滤器实例列表。
    - 在这里，我们在创建时实例化了 HttpExceptionFilter。或者，您可以传递类（而不是实例），将实例化的责任留给框架，并启用依赖注入
- 上面是局部过滤器
    - 还有某一种controller的全部的过滤器
    - 还有全局过滤器
```typescript
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```
- 下面这种全局过滤器是无法依赖注入的，需要另一种方法

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

```
    
- 过滤器：是可以传递实例或者类的
    - 如果是类有参数的话,是类的话，只能写类的
    - 有依赖注入的话，
    - 全局范围的过滤器用于整个应用程序的每个控制器和每个路由处理程序。就依赖注入而言，从任何模块外部注册的全局过滤器（如上例所示的 useGlobalFilters()）无法注入依赖项
    - 因为这是在任何模块的上下文之外完成的。为了解决这个问题，您可以使用以下构造直接从任何模块注册全局范围的过滤器：

- 如何解决全局过滤器无法依赖注入的问题
    - APP_FILTER

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

```

- AppModule导入模块之中包含controller
    - 
- setTimeout(() => {

}, 2000)