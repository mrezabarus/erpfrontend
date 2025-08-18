import { Module } from '@nestjs/common';
import { ProjectItemsController } from './project_items.controller';
import { ProjectItemsService } from './project_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectItems } from './project_items.entity';
import { Project } from 'src/projects/project.entity';
import { AllProjectItemController } from './all_item_project.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectItems, Project])
  ],
  controllers: [ProjectItemsController, AllProjectItemController],
  providers: [ProjectItemsService],
})
export class ProjectItemsModule {}
