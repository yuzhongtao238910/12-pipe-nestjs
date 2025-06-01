import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { APP_FILTER } from "@nestjs/core"
import { CustomExceptionFilter } from "./exception/self-custom-exception.filter"
import { App2Controller } from "./app2.controller"
import { DemoModule } from "./demo.module"


function logger1(req, res, next) {
    console.log(`logger1`)
    next()
}


function logger2(req, res, next) {
    console.log(`logger2`)
    next()
}


@Module({
    controllers: [AppController, App2Controller],
    providers:[
        {
            provide: "PREFIX",
            useValue: "prefix"
        },
        AppService,
        
        // 这样在全局过滤器的时候是可以依赖注入的
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        }
    ],

    imports: [
        DemoModule
    ],
    exports: [
        // AppService
    ]
})
// export class AppModule {}
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            // 如果一次需要多个中间件，就只能是apply(middleware1, middleware2, .......) 
            // 这块一定要先apply，然后再forRoutes
            .apply(logger1)
            .forRoutes(AppController)
            .apply(logger2)
            .forRoutes(App2Controller)
    }
    
}

// export class AppModule implements NestModule {


//     // // 在这块写就可以依赖注入，在外面写的时候是无法依赖注入的
//     // MiddlewareConsumer就是当前得NestApplication的实例
//     configure(consumer: MiddlewareConsumer) {
//         consumer
            // .apply(LoggerMiddleware)
            // .apply(loggerFunction)
            // .forRoutes({
            //     path: '*',
            //     method: RequestMethod.ALL
            // }) 
    //         // .forRoutes("*");
    //         // 针对/config来应用中间件
    //         // 前面得第一个/可以省略
    //         // .forRoutes('config')
    //         // .forRoutes({ path: 'config', method: RequestMethod.GET })
    //         // * 代表匹配任意字符的
    //         // 这个是express已经处理好了，不需要我们在处理了
    //         // .forRoutes({ path: 'ab*de', method: RequestMethod.ALL })


            
    //         .exclude(
    //             // { path: "cats", method: RequestMethod.GET},
    //             // { path: "cats", method: RequestMethod.POST},
    //             { path: "/app/module", method: RequestMethod.GET}
    //         )

    //         .forRoutes(
    //             AppController
    //         )
            
//     }
// }
