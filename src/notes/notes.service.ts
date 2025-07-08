import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  async create(data: CreateNoteInput, userId: string) {
    const note = this.noteRepo.create({
      ...data,
      user: { id: userId },
    });
    return this.noteRepo.save(note);
  }

  findAllByUser(userId: string) {
    return this.noteRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.noteRepo.findOneBy({ id });
  }

  async update(id: string, data: UpdateNoteInput) {
    await this.noteRepo.update(id, data);
    return this.noteRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const result = await this.noteRepo.delete(id);
    return result.affected > 0;
  }
}
