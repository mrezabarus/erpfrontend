import { Controller, Get } from "@nestjs/common";
import { ProjectItemsService } from "./project_items.service";
import { ProjectItems } from "./project_items.entity";

@Controller('project-items')
export class AllProjectItemController {
    constructor(private readonly itemService: ProjectItemsService){}

    @Get()
    findAll(): Promise<ProjectItems[]>{
        return this.itemService.findAll();
    }
}