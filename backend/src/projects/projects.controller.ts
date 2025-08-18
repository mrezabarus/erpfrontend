import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectStatus } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService){}

    @Get()
    findAll(@Query('status') status?: ProjectStatus): Promise<Project[]>{
        return this.projectService.findAll(status);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Project>{
        return this.projectService.findOneWithItems(id);
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto): Promise<Project>{
        return this.projectService.create(createProjectDto);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateProjectStatusDto,
    ): Promise<Project>{
        return this.projectService.updateStatus(id, dto);
    }
}
