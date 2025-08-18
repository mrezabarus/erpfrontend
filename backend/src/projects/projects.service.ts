import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from './project.entity';
import { Not, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ){}

    async findAll(status?: ProjectStatus): Promise<Project[]>{
        if (status){
            return this.projectRepository.find({
                where: { status }
            })
        }
        return this.projectRepository.find();
    }

    async findOneWithItems(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['items'], // ✅ tambahkan relasi item
        });

        if(!project){
            throw new NotFoundException(`Project dengan ${id} tidak ditemukan`);
        }

        return project
    }

    create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create(createProjectDto);
        return this.projectRepository.save(project);
    }

    async updateStatus(id: string, dto: UpdateProjectStatusDto): Promise<Project>{
        const project = await this.projectRepository.findOneBy({id});

        if(!project) {
            throw new NotFoundException(`Project dengan ${id} tidak ditemukan`);
        }

        project.status = dto.status;
        return this.projectRepository.save(project);
    }
}
