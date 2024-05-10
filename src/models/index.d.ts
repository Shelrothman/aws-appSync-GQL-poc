import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerAuthor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Author, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly profilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAuthor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Author, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly profilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Author = LazyLoading extends LazyLoadingDisabled ? EagerAuthor : LazyAuthor

export declare const Author: (new (init: ModelInit<Author>) => Author) & {
  copyOf(source: Author, mutator: (draft: MutableModel<Author>) => MutableModel<Author> | void): Author;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description?: string | null;
  readonly image: string;
  readonly author?: Author | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postAuthorId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description?: string | null;
  readonly image: string;
  readonly author: AsyncItem<Author | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postAuthorId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}