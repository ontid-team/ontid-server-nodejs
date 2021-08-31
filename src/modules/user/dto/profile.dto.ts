import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ProfileDTO {
  @Expose()
  fullName!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  birthday!: string;

  @Expose()
  about!: string;
}
