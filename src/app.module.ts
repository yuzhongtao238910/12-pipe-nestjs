import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { APP_FILTER } from "@nestjs/core"
import { CustomExceptionFilter } from "./exception/self-custom-exception.filter"



@Module({
    controllers: [AppController],
    providers:[
        
    ],
    exports: [
        // AppService
    ]
})
export class AppModule {}
