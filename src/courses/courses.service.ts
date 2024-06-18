import { Injectable } from '@nestjs/common';
import { CoursesEntity } from './courses.entity';

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
        return this.courses.find((course) => course.id === +id);
    }

    create(createCourseDto: any) {
        return this.courses.push(createCourseDto);
    }

    update(id: number, updateCourseDto: any) {
        const existingCourse = this.findOne(id);
        if (existingCourse) {
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
