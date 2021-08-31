import { UserDTO } from '../dto';
import { FullUser } from '../user.type';

export interface IUserService {
  getList(params: Context): Promise<ResponseData<UserDTO[]>>;
  getOne(query: Partial<FullUser>): Promise<ResponseData<UserDTO>>;
}
