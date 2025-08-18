import { Project } from "src/projects/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Project, (project) => project.items, {onDelete: 'CASCADE'})
    project: Project;
}