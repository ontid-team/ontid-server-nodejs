import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ProfileDTO {
  @Expose()
  about!: string;

  @Expose()
  birthday!: string;

  @Expose()
  firstName!: string;

  @Expose()
  fullName!: string;

  @Expose()
  lastName!: string;
}
