import {
    HttpException,
    HttpStatus
} from "@nestjs/common"

/**
 * 在许多情况下，您不需要编写自定义异常，可以使用内置的 Nest HTTP 异常，如下一节所述。如果确实需要创建自定义异常，
 * 最好创建自己的异常层次结构，其中自定义异常继承自基础 HttpException 类。通过这种方法，Nest 会识别您的异常，并自动处理错误响应。让我们实现这样一个自定义异常：
 */
export class ForbiddenException extends HttpException {
    constructor() {
        super("forbidden-hello", HttpStatus.FORBIDDEN)
    }
}