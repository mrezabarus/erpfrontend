import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectItems } from './project_items.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/project.entity';

@Injectable()
export class ProjectItemsService {
    constructor(
        @InjectRepository(ProjectItems)
        private readonly itemsRepo: Repository<ProjectItems>,

        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ){}

    async findByProject(projectId: string): Promise<ProjectItems[]>{
        return this.itemsRepo.find({
            where: {project: {id: projectId}},
            relations:['project']
        })
    }

    async findAll(): Promise<ProjectItems[]>{
        return this.itemsRepo.find({relations: ['project']});
    }

    async create(projectId: string, name: string): Promise<ProjectItems>{
        const project = await this.projectRepo.findOneBy({ id: projectId });
        if(!project){
            throw new NotFoundException('Project tidak ditemukan');
        }

        const item = this.itemsRepo.create({name, project});
        return this.itemsRepo.save(item);
    }
}
