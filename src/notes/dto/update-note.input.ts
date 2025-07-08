import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateNoteInput } from './create-note.input';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field()
  id: string;
}
