- 管道
    - 管道是一个用 @Injectable() 装饰器注释的类，它实现了 PipeTransform 接口。
    - 管道的两个作用
        - 转换：将输入数据转换为所需的形式（例如，从字符串转换为整数）
        - 验证：评估输入数据，如果有效，则简单地将其传递，否则抛出异常

- 基本流程
    - Nest 在方法调用之前插入一个管道，管道接收将要传递给方法的参数并对其进行操作。
    - 任何转换或验证操作都会在此时进行，然后调用路由处理程序，并传递（可能已经转换过的）参数。

- Nest 提供了许多内置的管道，您可以直接使用。您还可以构建自己的自定义管道
    - 内置管道
        - ParseIntPipe
        - ParseFloatPipe
        - ParseBoolPipe
        - 

- 要使用管道，我们需要将管道类的实例绑定到适当的上下文中。
```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```
