import { Exclude, Expose } from 'class-transformer';

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
