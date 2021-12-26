/* eslint-disable prettier/prettier */
import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses/entities/course.entity';
import { CreateCourseDto } from './courses/dto/create-course.dto';
import { UpdateCourseDto } from './courses/dto/update-course.dto';
import { Tag } from './courses/entities/tag.entity';

@Injectable()
export class CoursesService {
constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,


    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
){}

  
findAll(){
    return this.courseRepository.find({ 
        relations: ['tags'],
    });
}

findOne(id: string) {
    return this.courseRepository.findOne(id, {
        relations: ['tags'],
    });
   
    if(!Course) {
        throw new NotFoundException(
            `Course ID ${id} not found`, 
        );
    }
    return Course
}
async create(createCourseDto: CreateCourseDto){
    const tags = await Promise.all(
        createCourseDto.tags.map((name) => this.preloadTagByName(name))
    );
    
    const course = this.courseRepository.create({
        ...createCourseDto,
        
        
             
    });
    return this.courseRepository.save(course)
}
 async update(id: string, updateCourseDto: UpdateCourseDto) {

    const tags = updateCourseDto.tags && (
        await Promise.all(
            updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
    ));
    

    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      
    })
    if (!course){
        throw new  NotFoundException (`Course ID ${id} not found`)
    }
    return this.courseRepository.save(course);
} 
     

async remove(id: string){
   const course = await this.courseRepository.findOne(id);
   if (!course) {
       throw new  NotFoundException (`Course ID ${id} not found`);
   }
   return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ name });

        if (tag) {
            return tag;
        }
        return this.tagRepository.create({ name });
    }
}





