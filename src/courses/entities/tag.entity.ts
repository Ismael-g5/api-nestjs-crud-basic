import { Course } from './course.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}
