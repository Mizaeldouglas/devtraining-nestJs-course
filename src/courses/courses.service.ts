import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoursesEntity } from './courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    private courses: CoursesEntity[] = [{
        id: 1,
        name: 'NestJS',
        description: 'Curso de NestJS',
        tags: ['NodeJS', 'NestJS', 'TypeScript', 'JavaScript', 'API'],
    }];

    findAll() {
        return this.courses;
    }

    findOne(id: number) {
        const course = this.courses.find((course) => course.id === +id);
        if (!course) {
            throw new HttpException(`Course with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const newCourse: CoursesEntity = {
            id: this.courses.length + 1,
            name: createCourseDto.name,
            description: createCourseDto.description,
            tags: createCourseDto.tags,
        };
        return this.courses.push(newCourse);
    }

    update(id: number, updateCourseDto: CreateCourseDto) {
        const existingCourse = this.findOne(id);
        if (existingCourse as any) {
            const index = this.courses.findIndex(course => course.id === id);
            this.courses[index] = {
                id,
                ...updateCourseDto,
            };
        }
    }

    remove(id: number) {
        const index = this.courses.findIndex(course => course.id === +id);
        if (index >= 0) {
            this.courses.splice(index, 1);
        }
    }
}
