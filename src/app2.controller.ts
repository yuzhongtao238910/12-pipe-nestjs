import { Controller, Get, HttpException, HttpStatus, BadRequestException, RequestTimeoutException, UseFilters } from "@nestjs/common"

import { ForbiddenException } from "./forbidden.exception"
import { CustomExceptionFilter } from "./exception/self-custom-exception.filter"
import { AppService } from "./app.service"
@Controller("app2")
// 可以设置控制器级别的，只针对控制器级别的方法生效
// @UseFilters( new CustomExceptionFilter() ) // 这个是控制器级别的，针对所有的生效
// 如果有参数，就只能使用类了，或者是说需要依赖注入
// @UseFilters( CustomExceptionFilter ) // 这个是控制器级别的，针对所有的生效
export class App2Controller {

    constructor(
        private readonly appService: AppService
    ) {
        
    }


    @Get("get") 
    get() {
        return this.appService.getMessage()
    }

}