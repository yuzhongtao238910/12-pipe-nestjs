import { Controller, Get, HttpException, HttpStatus, BadRequestException, RequestTimeoutException, UseFilters } from "@nestjs/common"

import { ForbiddenException } from "./forbidden.exception"
import { CustomExceptionFilter } from "./exception/self-custom-exception.filter"
import { AppService } from "./app.service"
@Controller('app1')
// 可以设置控制器级别的，只针对控制器级别的方法生效
// @UseFilters( new CustomExceptionFilter() ) // 这个是控制器级别的，针对所有的生效
// 如果有参数，就只能使用类了，或者是说需要依赖注入
// @UseFilters( CustomExceptionFilter ) // 这个是控制器级别的，针对所有的生效
export class AppController {

    constructor(
        private readonly appService: AppService
    ) {
        
    }


    @Get("get") 
    get() {
        return this.appService.getMessage()
    }

    @Get("exception")
    exception() {
        // 当异常是未识别的（既不是 HttpException 也不是继承自 HttpException 的类），
        // 内置的异常过滤器会生成以下默认的 JSON 响应：
        /**
        {
            "statusCode": 500,
            "message": "Internal server error"
        }
         */
        // throw new Error("exception")


        // 标准的内置 HttpException
        // 1) 字符串或者是对象
        // 2）状态码
        // 3）
        // throw new HttpException('Forbidden-apple', HttpStatus.FORBIDDEN)
        // throw new HttpException({
        //     // status: HttpStatus.FORBIDDEN,
        //     code: "10001", // 这还可以自定义code码哈
        //     error: "这是一个自定义的消息" // 自定义的错误消息
        // }, HttpStatus.FORBIDDEN, {
        //     // 第三个构造函数参数（可选）——options——可用于提供错误原因。这个 cause 对象不会被序列化到响应对象中，
        //     // 但它对于日志记录非常有用，提供了有关导致 HttpException 被抛出的内部错误的宝贵信息。
        //     cause: "这块是造成的原因"
        // })


        throw new ForbiddenException()
    }

    @Get("custom")
    custom() {
        throw new ForbiddenException()
    }


    @Get("bad-request")
    // 这块用实例
    // @UseFilters( ) // 只针对这个方法生效哈
    badRequest() {
        throw new BadRequestException("error-message", "hello")
    }

    @Get("timeout-request")
    // 这块用类哈
    // @UseFilters( new CustomExceptionFilter() ) // 只针对这个方法生效哈/
    // @UseFilters( CustomExceptionFilter ) // 只针对这个方法生效哈
    timeoutRequest() {
        throw new RequestTimeoutException("error-timeout", "timeout")
    }

    // 如果想改变默认的异常过滤器的行为

}