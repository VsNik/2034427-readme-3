import {Document} from 'mongoose';
import {IToken} from '@project/shared/app-types';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true
})
export class TokenModel extends Document implements IToken {
  @Prop()
  public createdAt: Date;

  @Prop({ required: true })
  public tokenId: string;

  @Prop( { required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
