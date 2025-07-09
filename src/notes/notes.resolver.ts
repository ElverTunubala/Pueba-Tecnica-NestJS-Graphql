import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { UseGuards } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  @UseGuards(GqlAuthGuard)
  createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
    @CurrentUser() user: User
  ) {
    return this.notesService.create(createNoteInput, user.id)
  }

  @Query(() => [Note], { name: 'notes' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser() user: User) {
    console.log('Usuario actual:', user)
    return this.notesService.findAllByUser(user.id)
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('id') id: string) {
    return this.notesService.findOne(id)
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput.id, updateNoteInput)
  }

  @Mutation(() => Boolean)
  removeNote(@Args('id') id: string) {
    return this.notesService.remove(id)
  }
}