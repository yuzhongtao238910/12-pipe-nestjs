import { Controller, Get } from "@nestjs/common"



import { AppService } from "./app.service"
import { Param } from "@nestjs/common"
import { ParseIntPipe } from "@nestjs/common"
import { ParseFloatPipe } from "@nestjs/common"
import { ParseBoolPipe } from "@nestjs/common"
@Controller('')
// 可以设置控制器级别的，只针对控制器级别的方法生效
// @UseFilters( new CustomExceptionFilter() ) // 这个是控制器级别的，针对所有的生效
// 如果有参数，就只能使用类了，或者是说需要依赖注入
// @UseFilters( CustomExceptionFilter ) // 这个是控制器级别的，针对所有的生效
export class AppController {

    constructor(
        // private readonly appService: AppService
    ) {
        
    }


    @Get("")
    indexe() {
        return "index"
    }

    @Get("number/:id")
    getNumber(@Param("id", ParseIntPipe) id: string) {
        return `The number: ${id}`
    }

    @Get("id/:id")
    getId(@Param("id", new ParseIntPipe()) id: string) {
        return `The id: ${id}`
    }


    @Get("float/:value")
    getFloat(@Param("value", ParseFloatPipe) value: number) {
        return `The Float ${value}`
    }


    @Get("bool/:flag")
    getBool(@Param('flag', ParseBoolPipe) flag: boolean) {
        return `The flag is ${flag}`
    }
}