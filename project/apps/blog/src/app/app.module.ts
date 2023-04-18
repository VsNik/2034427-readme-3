import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigBlogModule } from '@project/config/config-blog';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    PostModule,
    ConfigBlogModule,
    PrismaModule,
    TagModule,
    CommentModule,
  ],
})
export class AppModule {}
