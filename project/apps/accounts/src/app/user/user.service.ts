import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {IUser} from '@project/shared/app-types';
import {UserRepository} from './user.repository';
import {CAN_BE_EQUAL, USER_NOT_FOUND} from './user.constant';
import {UserEntity} from './user.entity';
import {UserProfileType} from './types/user-profile.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async follow(id: string, currentUserId: string): Promise<UserProfileType> {
    if (currentUserId === id) {
      throw new BadRequestException(CAN_BE_EQUAL);
    }

    const currentUserEntity = await this.getUser(currentUserId);
    const userEntity = await this.getUser(id);

    if (userEntity.following.includes(currentUserId)) {
      const followingIndex = userEntity.following.indexOf(currentUserEntity._id);
      const followerIndex = currentUserEntity.followers.indexOf(userEntity._id);

      userEntity.following.splice(followingIndex, 1);
      currentUserEntity.followers.splice(followerIndex, 1);
      userEntity.followingDecrement();
      currentUserEntity.followersDecrement();

      await this.userRepository.update(id, userEntity);
      await this.userRepository.update(currentUserId, currentUserEntity);

      return {...userEntity, isFollow: false};
    }

    userEntity.following.push(currentUserEntity._id);
    currentUserEntity.followers.push(userEntity._id);
    userEntity.followingIncrement();
    currentUserEntity.followersIncrement();

    await this.userRepository.update(id, userEntity);
    await this.userRepository.update(currentUserId, currentUserEntity);

    return {...userEntity, isFollow: true};
  }

  public async getUser(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND)
    }
    return new UserEntity(existUser);
  }

  public async getAll(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }
}