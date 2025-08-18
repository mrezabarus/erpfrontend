import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectItemsService } from './project_items.service';
import { ProjectItems } from './project_items.entity';

@Controller('projects/:projectId/items')
export class ProjectItemsController {
    constructor (private readonly itemsService: ProjectItemsService){}

    @Get()
    findAllByProject(@Param('projectId') projectId: string): Promise<ProjectItems[]> {
        return this.itemsService.findByProject(projectId);
    }

    @Post()
    create(
        @Param('projectId') projectId: string,
        @Body() body: { name: string },
    ): Promise<ProjectItems>{
        return this.itemsService.create(projectId, body.name);
    }
}
