import { Controller, Get } from "@nestjs/common";


@Controller("demo")
export class DemoController {
    @Get("")
    index() {
        return "demo"
    } 
}